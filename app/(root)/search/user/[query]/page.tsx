'use client';

import UserCard from '@/components/card/UserCard';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserData {
    _id: string;
    username: string;
    profilePhoto: string;
    update: () => void;
}

const SearchUser = () => {
    const router = useRouter();
    const query = useParams();
    const [userValue, setUserValue] = useState<UserData[]>([]);

    const getSearchUsers = async () => {
        try {
            const res = await fetch(`/api/user/search/${query}`);
            const data = await res.json();

            setUserValue(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSearchUsers();
    }, [query]);

    // console.log(userValue);
    return (
        <div>
            <div className="flex flex-row items-center gap-4 mb-4">
                <button
                    onClick={() => router.push(`/search/posts/${query}`)}
                    className="rounded-lg px-2 py-2 bg-[#323334]"
                >
                    Posts
                </button>
                <button
                    onClick={() => router.push(`/search/user/${query}`)}
                    className="rounded-lg px-2 py-2 bg-cyan-800"
                >
                    People
                </button>
            </div>
            <h1 className="text-2xl font-bold my-4">Search User</h1>

            {userValue.map((user: UserData, idx: number) => (
                <UserCard
                    key={idx}
                    username={user.username}
                    profilePhoto={user.profilePhoto}
                    _id={user._id}
                    update={getSearchUsers}
                />
            ))}
        </div>
    );
};

export default SearchUser;
