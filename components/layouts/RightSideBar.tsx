'use client';

import Lottie from 'react-lottie-player';
import phone from '../../public/assets/animations/phonne.json';

const RightSideBar = () => {
    return (
        <div className="w-[23%] px-4 py-5 ">
            <h1 className="text-xl font-bold mb-4">Nice App</h1>
            <Lottie
                play
                loop
                animationData={phone}
                className="w-72 h-72 bg-white rounded-xl"
            />

            <h2 className="text-lg font-semibold my-3">Technologies</h2>

            <p className="text-sm font-normal">
                NextJs 14, NextAuth, MongoDB, TailwindCss, TypeScript...
            </p>
        </div>
    );
};

export default RightSideBar;
