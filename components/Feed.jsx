"use client";

import { useState, useEffect } from "react";

import PostCard from "./PostCard";

const PromptCardList = ({ data }) => {
    return (
        <div className='post_layout'>
            {data.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch("/api/blogpost");
        const data = await response.json();

        setAllPosts(data);
    };

    useEffect(() => {
        fetchPosts();
        console.log(allPosts)
    }, []);

    return (
        <section className='feed'>
            <PromptCardList
                data={allPosts}
            />
        </section>
    )
}

export default Feed