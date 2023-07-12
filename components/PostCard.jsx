"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Comment from "./Comment";

const PostCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
    const { data: session } = useSession();
    const path = usePathname();
    const router = useRouter();

    const updatedDate = new Date(post.updatedAt).toLocaleDateString()
    const updatedTime = new Date(post.updatedAt).toLocaleTimeString()

    const handleProfileClick = () => {
        router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    };

    return (
        <div className='post_card'>
            <div className='flex justify-between items-start gap-5'>
                <div
                    className='flex-1 flex justify-start items-center gap-3'
                >
                    <Image
                        src={post.creator.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-contain cursor-pointer'
                        onClick={handleProfileClick}
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold sm:text-base text-sm text-gray-900 cursor-pointer' onClick={handleProfileClick}>
                            {post.creator.username}
                        </h3>
                        <p className='font-inter text-xs text-gray-500'>
                            {post.creator.email}
                        </p>
                    </div>
                </div>
            </div>

            <div className="form_image_container my-4">
                <Image
                    src={post.image}
                    alt='post_image'
                    fill
                    sizes="(max-width: 600px) 300px"
                    className='object-contain'
                />
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700'>{post.post}</p>
            <p className='my-4 font-satoshi text-xs text-gray-400'>Updated: {updatedDate}{' / '}{updatedTime}</p>

            <div className="flex_between">
                <p
                    className='font-inter sm:text-sm text-xs blue_gradient cursor-pointer'
                    onClick={() => handleTagClick && handleTagClick(post.tag)}
                >
                    #{post.tag}
                </p>

                <Comment post_id={post._id} />

            </div>

            {session?.user.id === post.creator._id && path !== "/" && (
                <div className='mt-5 flex_center gap-4 border-t border-gray-100 pt-3'>
                    <p
                        className='font-inter md:text-base sm:text-sm text-xs font-semibold green_gradient cursor-pointer active:text-green-800'
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className='font-inter md:text-base sm:text-sm text-xs font-semibold orange_gradient cursor-pointer active:text-orange-800'
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    );
};

export default PostCard;