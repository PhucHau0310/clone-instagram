'use client';

import React, { ReactNode } from 'react';
import TopBar from './TopBar';
import { usePathname } from 'next/navigation';
import { pageTitles } from '@/constants';

const MainContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
    const pathname = usePathname();

    // const regex = /^\/([^\/]+)/;
    // const firstPath = pathname.match(regex) ? pathname.split('/')[1] : pathname;
    // console.log(firstPath);

    const title =
        pageTitles.find((page) => page.url === pathname)?.title || '  ';

    return (
        <div className="w-[50%] px-10 py-5 mx-auto">
            <TopBar />

            <h1 className="text-2xl font-bold my-8">{title}</h1>
            {children}
        </div>
    );
};

export default MainContainer;
