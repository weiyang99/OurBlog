"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CommentCard = ({ comment, handleDelete }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const updatedDate = new Date(comment.updatedAt).toLocaleDateString()
    const updatedTime = new Date(comment.updatedAt).toLocaleTimeString()

    const handleProfileClick = () => {
        router.push(`/profile/${comment.creator._id}?name=${comment.creator.username}`);
    };

    return (
        <div className='comment_card overflow-y-auto'>
            <div className='flex justify-between items-start gap-5'>
                <div
                    className='flex-1 flex justify-start items-center gap-3'
                >
                    <Image
                        src={comment.creator.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-contain cursor-pointer'
                        onClick={handleProfileClick}
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold sm:text-base text-sm text-gray-900 cursor-pointer' onClick={handleProfileClick}>
                            {comment.creator.username}
                        </h3>
                        <p className='font-inter text-xs text-gray-500'>
                            {comment.creator.email}
                        </p>
                    </div>
                </div>
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700'>{comment.comment}</p>

            <div className="flex_between" >
                <p className='font-satoshi text-xs text-gray-400'>Updated: {updatedDate}{' / '}{updatedTime}</p>

                {session?.user.id === comment.creator._id && (
                    <Image
                        src='/assets/icons/rubbish.svg'
                        width={25}
                        height={25}
                        alt='rubbish bin'
                        className='object-contain cursor-pointer'
                        onClick={handleDelete}
                    />
                )}
            </div>
        </div>
    );
};

export default CommentCard;