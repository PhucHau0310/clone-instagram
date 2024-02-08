'use client';

import PostCard from '@/components/card/PostCard';
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

export default function Home() {
    const [posts, setPosts] = useState<PostItem[]>([]);

    const getPosts = async () => {
        try {
            const res = await fetch('/api/post');

            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {posts.map((post: PostItem, idx: number) => (
                <PostCard
                    key={idx}
                    creator={post.creator}
                    caption={post.caption}
                    postPhoto={post.postPhoto}
                    tag={post.tag}
                    _id={post._id}
                />
            ))}
        </>
    );
}
