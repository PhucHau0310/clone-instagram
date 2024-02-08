'use client';

import Image from 'next/image';
import avaDefault from '../../public/assets/images/default.jpg';
import heart from '../../public/assets/icons/heart.svg';
import heartRed from '../../public/assets/icons/heart-red.svg';
import save from '../../public/assets/icons/save-svgrepo-com.svg';
import edit from '../../public/assets/icons/edit.svg';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
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

const PostCard = (props: PostItem, idx: number) => {
    const arrUserName = props.creator.username.split(' ');
    const resultName = arrUserName.reduce((acc, curr) => acc + curr);
    const { data: session } = useSession();
    const userId = session?.id;

    const [userData, setUserData] = useState({
        _id: '',
        likedPosts: [],
        savedPosts: [],
    });

    const getUser = async () => {
        try {
            const res = await fetch(`/api/user/${userId}`);
            const data = await res.json();

            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const isLiked = userData?.likedPosts.find(
        (item: any) => item._id === props._id
    );

    const isSaved = userData?.savedPosts.find(
        (item: any) => item._id === props._id
    );

    const handleLike = async () => {
        const res = await fetch(`/api/user/${userId}/like/${props._id}`, {
            method: 'POST',
            headers: { 'Content-Types': 'application/json' },
        });
        const data = await res.json();

        console.log(data);
    };

    return (
        <div
            key={idx}
            className="bg-[#8378783d] px-4 py-4 w-[85%] rounded-lg mb-16"
        >
            <div className="flex flex-row items-center gap-5">
                <Image
                    src={props.creator?.profilePhoto || avaDefault}
                    alt="ava-default"
                    width={60}
                    height={60}
                    className="rounded-full border-4"
                />
                <div className="flex flex-col justify-center">
                    <p className="text-lg font-medium">
                        {props.creator.username}
                    </p>
                    <p className="text-base font-light">{`@${resultName}`}</p>
                </div>
                {userId === props.creator._id && (
                    <Link href={`/edit-posts/${props._id}`} className="ml-auto">
                        <Image
                            src={edit}
                            alt="edit-icon"
                            width={30}
                            height={30}
                            className="ml-auto cursor-pointer"
                        />
                    </Link>
                )}
            </div>

            <h1 className="text-xl font-bold my-6">{props.caption}</h1>

            <Image
                src={`/${props.postPhoto}` || avaDefault}
                alt="ava-default"
                width={510}
                height={100}
                className="object-cover rounded-lg"
            />
            <p className="text-cyan-600 my-4">{props.tag}</p>

            <div className="flex flex-row justify-between">
                {isLiked ? (
                    <Image
                        src={heartRed}
                        alt="heart-icon"
                        width={40}
                        height={40}
                        className="cursor-pointer"
                        onClick={handleLike}
                    />
                ) : (
                    <Image
                        src={heart}
                        alt="heart-icon"
                        width={40}
                        height={40}
                        className="cursor-pointer"
                        onClick={handleLike}
                    />
                )}
                <Image
                    src={save}
                    alt="heart-icon"
                    width={50}
                    height={50}
                    className="cursor-pointer"
                />
            </div>
        </div>
    );
};

export default PostCard;
