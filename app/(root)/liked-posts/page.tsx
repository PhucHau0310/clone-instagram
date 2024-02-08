'use client';

import PostCard from '@/components/card/PostCard';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const LikedPosts = () => {
    const { data: session } = useSession();
    const userId = session?.id;
    const [userData, setUserData] = useState({
        likedPosts: [
            {
                _id: '',
                creator: {
                    _id: '',
                    username: '',
                    profilePhoto: '',
                },
                caption: '',
                postPhoto: '',
                tag: '',
            },
        ],
    });

    const getUser = async () => {
        try {
            const res = await fetch(`/api/user/${userId}`);
            const data = await res.json();

            // console.log(data);
            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, [session]);

    return (
        <div>
            {userData.likedPosts.map((post, idx: number) => (
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

export default LikedPosts;
