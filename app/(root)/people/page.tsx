'use client';

import UserCard from '@/components/card/UserCard';
import { useEffect, useState } from 'react';

interface UserData {
    _id: string;
    username: string;
    profilePhoto: string;
}

const People = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const getAllUsers = async () => {
        try {
            const res = await fetch('/api/user');
            const data = await res.json();

            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            {users.map((user, idx: number) => (
                <UserCard
                    key={idx}
                    username={user.username}
                    profilePhoto={user.profilePhoto}
                    _id={user._id}
                />
            ))}
        </div>
    );
};

export default People;
