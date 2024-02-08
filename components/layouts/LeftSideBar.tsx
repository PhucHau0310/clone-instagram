'use client';

import Image from 'next/image';
import Lottie from 'react-lottie-player';
import instagram from '../../public/assets/icons/instagram-text.svg';
import insAnimation from '../../public/assets/animations/Animation.json';
import avaDefault from '../../public/assets/images/default.jpg';
import logOut from '../../public/assets/icons/log-out.svg';
import Menu from './Menu';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LeftSideBar = () => {
    const { data: session } = useSession();
    const userId = session?.id;
    const router = useRouter();

    const [userData, setUserData] = useState({
        email: '',
        followers: [],
        followings: [],
        posts: [],
        provider: '',
        savedPosts: [],
        likedPosts: [],
        username: '',
        _id: '',
        profilePhoto: '',
    });

    const getUser = async () => {
        try {
            const res = await fetch(`/api/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userId) {
            getUser();
        }
    }, [
        userId,
        userData.posts.length,
        userData.followers.length,
        userData.followings.length,
    ]);

    return (
        <div className="h-screen w-[23%] px-6 py-2 sticky top-0 left-0 mr-10">
            <div className="mx-auto w-4/5 flex flex-col items-center">
                <div className="flex flex-row items-center gap-3">
                    <Lottie
                        play
                        loop
                        animationData={insAnimation}
                        className="w-10 h-10"
                    />
                    <Image
                        src={instagram}
                        alt="ins-logo"
                        width={100}
                        height={100}
                        className="mt-1"
                    />
                </div>

                {session?.user && (
                    <div className="w-full">
                        <div className="flex flex-col items-center">
                            <Image
                                src={userData.profilePhoto || avaDefault}
                                alt="image-default"
                                width={70}
                                height={70}
                                className="rounded-full"
                            />

                            <p className="mt-1.5 text-xl font-bold">
                                {userData.username}
                            </p>
                        </div>
                        <div className="mt-1 w-full flex flex-row items-center justify-between">
                            <div className="flex flex-col items-center">
                                <p className="text-base font-bold">
                                    {userData.posts.length}
                                </p>
                                <p className="text-sm font-normal">Posts</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-base font-bold">
                                    {userData.followers.length}
                                </p>
                                <p className="text-sm font-normal">Followers</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-base font-bold">
                                    {userData.followings.length}
                                </p>
                                <p className="text-sm font-normal">
                                    Followings
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="w-full h-[1px] bg-white my-2"></div>

                <Menu />

                <div className="w-full h-[1px] bg-white my-2"></div>

                <div className="w-[90%] flex flex-col justify-center gap-3">
                    {session?.user ? (
                        <div className="flex flex-col justify-center gap-3">
                            <div
                                onClick={() =>
                                    router.push(`/profile/${userId}/posts`)
                                }
                                className="flex flex-row items-center gap-4 cursor-pointer"
                            >
                                <Image
                                    src={userData.profilePhoto || avaDefault}
                                    alt="ava-defult"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                                <p className="text-lg font-bold">
                                    Manage Account
                                </p>
                            </div>

                            <div className="flex flex-row items-center gap-4">
                                <Image
                                    src={logOut}
                                    alt="log-out-icon"
                                    width={42}
                                    height={42}
                                />
                                <button
                                    onClick={() => signOut()}
                                    className="text-lg font-bold"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <p className="mt-5 text-xl font-bold text-[#ebb7b7]">
                                Sign In to get started with my application !
                            </p>
                            <Link
                                href="/signin"
                                className="hover:bg-[#323334] text-lg font-semibold  text-center w-[70%] border border-[#ebb7b7] px-2 py-2 rounded-full"
                            >
                                Sign in
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeftSideBar;
