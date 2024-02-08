'use client';

import PostCard from '@/components/card/PostCard';
import ProfileCard from '@/components/card/ProfileCard';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePosts = () => {
    const [profile, setProfile] = useState({
        _id: '',
        username: '',
        profilePhoto: '',
        posts: [],
        followers: [],
        followings: [],
    });
    const profileId = usePathname().split('/')[2];

    const getProfile = async () => {
        try {
            const res = await fetch(`/api/user/profile/${profileId}`);
            const data = await res.json();

            setProfile(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfile();
    }, [profileId]);

    return (
        <div>
            <ProfileCard
                _id={profile._id}
                username={profile.username}
                profilePhoto={profile.profilePhoto}
                posts={profile.posts as []}
                followers={profile.followers as []}
                followings={profile.followings as []}
                activeTabs="Posts"
            />

            <div>
                {profile?.posts?.map((post: any, idx: number) => (
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
        </div>
    );
};

export default ProfilePosts;
