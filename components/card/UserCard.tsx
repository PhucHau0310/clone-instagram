import Image from 'next/image';
import avatarDefault from '../../public/assets/images/default.jpg';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface UserData {
    _id: string;
    username: string;
    profilePhoto: string;
    update?: () => void;
}

interface UserInfo {
    _id: string;
    followings: [
        {
            _id: string;
        }
    ];
}

const UserCard = (props: UserData) => {
    const usernameFashion = props.username
        .split(' ')
        .reduce((acc, curr) => acc + curr);

    const { data: session } = useSession();

    const [userInfo, setUserInfo] = useState<UserInfo>();

    const getUser = async () => {
        try {
            const res = await fetch(`/api/user/${session?.id}`);
            const data = await res.json();

            setUserInfo(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (session) {
            getUser();
        }
    }, [session]);

    const isFollowing = userInfo?.followings?.find(
        (user) => user._id === props._id
    );

    const userId = session?.id;

    const handleFollow = async () => {
        try {
            const res = await fetch(`/api/user/${userId}/follow/${props._id}`, {
                method: 'POST',
                headers: {
                    'Content-Types': 'application/json',
                },
            });
            const data = await res.json();

            console.log(data);
            // props.update();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-row items-center gap-4 mb-7">
            <Image
                src={props.profilePhoto || avatarDefault}
                alt={props.username}
                width={60}
                height={60}
                className="rounded-full"
            />

            <div className="flex flex-col justify-center">
                <p className="text-xl font-semibold">{props.username}</p>
                <p className="text-normal font-light">{`@${usernameFashion}`}</p>
            </div>

            {/* {!isFollowing ||
                (userId === props._id && (
                    
                ))}
             */}
            {userId !== props._id &&
                (!isFollowing ? (
                    <button
                        onClick={handleFollow}
                        className="ml-auto mr-[130px] text-base font-medium rounded-xl px-4 py-2 bg-cyan-600"
                    >
                        Follow
                    </button>
                ) : (
                    <></>
                ))}
        </div>
    );
};

export default UserCard;
