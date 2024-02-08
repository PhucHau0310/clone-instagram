import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Provider from '@/components/Provider';
import LeftSideBar from '@/components/layouts/LeftSideBar';
import MainContainer from '@/components/layouts/MainContainer';
import RightSideBar from '@/components/layouts/RightSideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Instagram',
    description: 'Instagram Clone',
    icons: {
        icon: ['/favicon.ico?v=1'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider>
                    <main className="flex flex-row">
                        <LeftSideBar />
                        <MainContainer>{children}</MainContainer>
                        <RightSideBar />
                    </main>
                </Provider>
            </body>
        </html>
    );
}
