"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@components/Form";

const UpdatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const postId = searchParams.get("id");

    const [post, setPost] = useState({ post: "", tag: "", image: "" });
    const [submitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/blogpost/${postId}`);
            const data = await response.json();

            setPost({
                post: data.post,
                tag: data.tag,
                image: data.image
            });
        };

        if (postId) getPostDetails();
    }, [postId]);

    const uploadImage = async (imagePath) => {
        try {
            const response = await fetch(`/api/upload`, {
                method: "POST",
                body: JSON.stringify({
                    path: imagePath,
                }),
            });
            return response.json();
        } catch (err) {
            throw err;
        }
    };

    const updatePost = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!postId) return alert("Missing postId!");

        try {
            const imageUrl = await uploadImage(post.image);

            const response = await fetch(`/api/blogpost/${postId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    post: post.post,
                    tag: post.tag,
                    image: imageUrl.url
                }),
            });

            if (response.ok) {
                router.push(`/profile/${session.user.id}?name=${session.user.name}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeImage = (e) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image!');

            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result.toString();

            setPost((prevPost) => ({ ...prevPost, ["image"]: result }))
        };
    };

    return (
        <section className='create_post'>
            {session?.user ?
                <>
                    <h1 className='edit_post_h1 mt-36' >
                        Edit Your Post
                    </h1>

                    <Form
                        post={post}
                        setPost={setPost}
                        submitting={submitting}
                        handleSubmit={updatePost}
                        handleChangeImage={handleChangeImage}
                    />
                </> :
                <h1 className='create_post_h1 py-2' >
                    Sign In & Join Us !
                </h1>
            }
        </section>
    );
};

export default UpdatePost;