'use client';

import ProfileCard from '@/components/card/ProfileCard';
import UserCard from '@/components/card/UserCard';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfileFollowings = () => {
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

    // console.log(profile);
    return (
        <div>
            <ProfileCard
                _id={profile._id}
                username={profile.username}
                profilePhoto={profile.profilePhoto}
                posts={profile.posts as []}
                followers={profile.followers as []}
                followings={profile.followings as []}
                activeTabs="Followings"
            />

            <div>
                {profile?.followings?.map((follower: any) => (
                    <UserCard
                        username={follower.username}
                        profilePhoto={follower.profilePhoto}
                        _id={follower._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfileFollowings;
