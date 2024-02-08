'use client';

import { sideBarLinks } from '@/constants';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import home from '../../public/assets/icons/home.svg';

const Menu = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    return (
        <div className="w-full">
            {session?.user ? (
                sideBarLinks.map((item) => {
                    const isActive = pathname === item.route;

                    return (
                        <Link key={item.label} href={item.route}>
                            <div
                                className={`w-[85%] mx-auto flex flex-row items-center  gap-3 px-4 py-2 mb-1.5 rounded-xl ${
                                    isActive && ' bg-[#323334]'
                                }`}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.label}
                                    width={35}
                                    height={35}
                                />
                                <p className="text-lg font-medium">
                                    {item.label}
                                </p>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <Link href="/">
                    <div className="w-[85%]  mx-auto flex flex-row items-center  gap-3 px-4 py-2 mb-1.5 rounded-xl bg-[#323334]">
                        <Image src={home} alt="home" width={35} height={35} />
                        <p className="text-lg font-medium">Home</p>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Menu;
