"use client";

import { useState, useEffect } from "react";

import PostCard from "./PostCard";
import Loading from "@app/loading";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='post_layout'>
            {data.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);

    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/blogpost", {
                method: "GET",
            });
            const data = await response.json();

            setAllPosts(data);
        };

        fetchPosts();
    }, []);

    if (!allPosts.length) {
        return <Loading />
    }

    return (
        <section className='feed'>
            <form className='relative w-full flex_center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {searchText ? (
                <PromptCardList
                    data={searchedResults.reverse()}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <PromptCardList data={allPosts.reverse()} handleTagClick={handleTagClick} />
            )}
        </section>
    )
}

export default Feed