'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'react-lottie-player';
import AuthAnimations from '../../../public/assets/animations/instagram.json';
import insIcon from '../../../public/assets/icons/instagram-text.svg';
import google from '../../../public/assets/icons/google.svg';
import github from '../../../public/assets/icons/github.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: any) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            email: email,
            password: password,
        });

        if (res?.error) {
            console.log('Invalid email or password');
            toast.error('Invalid email or password !');
        } else {
            toast.success('Login successfully !');
        }
    };
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex gap-5 h-4/5 w-4/5">
                <div className="w-full h-full flex items-center justify-center">
                    <Lottie
                        play
                        loop
                        animationData={AuthAnimations}
                        className="w-4/5 h-4/5"
                    />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <div className="px-8 py-3 w-3/5 bg-[#272323a3] rounded-xl shadow-lg shadow-gray-900">
                        <Image
                            src={insIcon}
                            alt="Instagram icon"
                            width={150}
                            height={150}
                            className="mx-auto"
                        />

                        <form onSubmit={handleLogin}>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                placeholder="Email address"
                                className="bg-black block w-full px-3 py-3  rounded-md outline-cyan-600"
                            />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="mt-6 bg-black block w-full px-3 py-3 rounded-md outline-cyan-600"
                            />

                            {/* <p className="text-red-700">{err}</p> */}

                            <button
                                type="submit"
                                className="mt-8 px-2 py-3 w-4/5 mx-auto block rounded-3xl bg-cyan-600 hover:bg-cyan-700"
                            >
                                Log in
                            </button>
                        </form>

                        <div className="my-4 flex flex-row items-center justify-between">
                            <div className="w-[40%] h-[1px] bg-slate-50"></div>
                            <span className="text-center block">Or</span>
                            <div className="w-[40%] h-[1px] bg-slate-50"></div>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-4">
                            <Image
                                src={google}
                                alt="google icon"
                                width={30}
                                height={30}
                            />
                            <button
                                onClick={() => signIn('google')}
                                className="text-[#5d7eb8]"
                            >
                                Log in with Google
                            </button>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-4 mt-4">
                            <Image
                                src={github}
                                alt="github icon"
                                width={30}
                                height={30}
                            />
                            <button
                                onClick={() => signIn('github')}
                                className="ml-1 text-[#5d7eb8]"
                            >
                                Log in with GitHub
                            </button>
                        </div>

                        <p className="text-center my-5 text-sm font-normal">
                            Forgotten your password?
                        </p>
                    </div>

                    <div className="mt-4 px-8 py-3 w-3/5 bg-[#272323a3] rounded-xl shadow-lg shadow-gray-900 flex flex-row items-center justify-center">
                        <p>Don t have an account ?</p>
                        <Link href="/signup">
                            <button className="text-[#5d7eb8] ml-2">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
