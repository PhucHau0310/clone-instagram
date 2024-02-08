'use client';

import PostCard from '@/components/card/PostCard';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PostItem {
    _id: string;
    creator: {
        _id: string;
        username: string;
        profilePhoto: string | undefined;
    };
    caption: string;
    postPhoto: string;
    tag: string;
}

const SearchPosts = () => {
    const { query } = useParams();
    const router = useRouter();
    const [searchPosts, setSearchPosts] = useState<PostItem[]>([]);

    const getSearchPosts = async () => {
        try {
            const res = await fetch(`/api/post/search/${query}`);
            const data = await res.json();

            setSearchPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSearchPosts();
    }, [query]);

    return (
        <div>
            <div className="flex flex-row items-center gap-4 mb-4">
                <button
                    onClick={() => router.push(`/search/posts/${query}`)}
                    className="rounded-lg px-2 py-2 bg-cyan-800"
                >
                    Posts
                </button>
                <button
                    onClick={() => router.push(`/search/user/${query}`)}
                    className="rounded-lg px-2 py-2 bg-[#323334]"
                >
                    People
                </button>
            </div>
            <h1 className="text-2xl font-bold my-4">Search posts</h1>

            {searchPosts.map((post, idx: number) => (
                <PostCard
                    key={idx}
                    creator={post.creator}
                    caption={post.caption}
                    postPhoto={post.postPhoto}
                    tag={post.tag}
                    _id={post._id}
                />
            ))}
        </div>
    );
};

export default SearchPosts;
