"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            setUserPosts(data.reverse());
        };

        if (params?.id) fetchPosts();
    }, [params.id, userPosts]);

    const handleEdit = (post) => {
        router.push(`/update-post?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this post?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/blogpost/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = userPosts.filter((item) => item._id !== post._id);

                setUserPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s journey and get to know them.`}
            data={userPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default UserProfile;