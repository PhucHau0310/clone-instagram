import Image from 'next/image';
import avatarDefault from '../../public/assets/images/default.jpg';
import { tabs } from '@/constants';
import Link from 'next/link';

interface Profile {
    _id: string;
    username: string;
    profilePhoto: string;
    posts: [];
    followers: [];
    followings: [];
    activeTabs: string;
}

const ProfileCard = (props: Profile) => {
    const usernameFashion = props.username
        .split(' ')
        .reduce((arr, curr) => arr + curr);
    return (
        <div>
            <div className="flex flex-row items-center gap-6">
                <Image
                    src={props.profilePhoto || avatarDefault}
                    alt={props.username}
                    width={100}
                    height={100}
                    className="rounded-full"
                />

                <div className="flex flex-col justify-center">
                    <div className="flex flex-col justify-center">
                        <p className="text-xl font-bold">{props.username}</p>
                        <p className="text-base font-light">{`@${usernameFashion}`}</p>
                    </div>

                    <div className="flex flex-row mt-4">
                        <div className="flex flex-row gap-2 mr-6">
                            <span className="text-cyan-600">
                                {props.posts.length}
                            </span>
                            <p className="font-semibold">Posts</p>
                        </div>
                        <div className="flex flex-row gap-2 mr-6">
                            <span className="text-cyan-600">
                                {props.followers.length}
                            </span>
                            <p className="font-semibold">Followers</p>
                        </div>
                        <div className="flex flex-row gap-2 mr-6">
                            <span className="text-cyan-600">
                                {props.followings.length}
                            </span>
                            <p className="font-semibold">Followings</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8">
                {tabs.map((tab) => (
                    <Link
                        className={`rounded-lg mr-6 px-4 py-2 ${
                            props.activeTabs === tab.name
                                ? 'bg-cyan-600'
                                : 'bg-[#323334]'
                        }`}
                        href={`/profile/${props._id}/${tab.link}`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProfileCard;
