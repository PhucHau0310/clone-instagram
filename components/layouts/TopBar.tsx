'use client';

import Image from 'next/image';
import search from '../../public/assets/icons/search.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const TopBar = () => {
    const router = useRouter();
    const [searchValue, setSearch] = useState('');
    const { data: session } = useSession();
    return (
        <div className="flex flex-row items-center gap-32">
            <div className="relative w-[40%]">
                {session?.user ? (
                    <input
                        value={searchValue}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search, posts, people,..."
                        className="w-full px-2 py-3 bg-[#323334] outline-none rounded-lg placeholder:text-base, font-medium "
                    />
                ) : (
                    <input
                        disabled
                        value={searchValue}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search, posts, people,..."
                        className="w-full px-2 py-3 bg-[#323334] outline-none rounded-lg placeholder:text-base, font-medium "
                    />
                )}

                <Image
                    src={search}
                    alt="search-icon"
                    width={35}
                    height={35}
                    className="absolute content-none right-0 top-1.5 cursor-pointer"
                    onClick={() => router.push(`/search/posts/${searchValue}`)}
                />
            </div>

            {session?.user && (
                <Link href="/create-post">
                    <button className="flex items-center justify-center rounded-lg px-2 py-1.5 text-lg font-medium bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-200">
                        <span className="text-2xl font-medium mr-2 mb-1">
                            +
                        </span>
                        Create A Post
                    </button>
                </Link>
            )}
        </div>
    );
};

export default TopBar;
