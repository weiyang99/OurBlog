"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Form } from '@components'

const CreatePost = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ post: "", tag: "", image: "" });

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

    const createPost = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const imageUrl = await uploadImage(post.image);

            const response = await fetch("/api/blogpost/new", {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.id,
                    post: post.post,
                    tag: post.tag,
                    image: imageUrl.url
                }),
            });

            if (response.ok) {
                router.push("/");
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
                    <h1 className='create_post_h1 mt-36' >
                        Create Your Post
                    </h1>

                    <Form
                        post={post}
                        setPost={setPost}
                        submitting={submitting}
                        handleSubmit={createPost}
                        handleChangeImage={handleChangeImage}
                    />
                </> :
                <h1 className='create_post_h1 py-2' >
                    Sign In & Join Us !
                </h1>
            }
        </section>
    )
}

export default CreatePost