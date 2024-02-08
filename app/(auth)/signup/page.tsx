'use client';

import Image from 'next/image';
import Link from 'next/link';
import insIcon from '../../../public/assets/icons/instagram-text.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface PostInter {
    email: string;
    username: string;
    password: string;
}

const SignUp = () => {
    const router = useRouter();
    const post: PostInter = {
        email: '',
        username: '',
        password: '',
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: post });

    const isValidEmail = (emailParams: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(emailParams);
    };

    const handleSignUp = async (data: PostInter) => {
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    username: data.username,
                    password: data.password,
                }),
            });

            if (res.ok) {
                toast.success('Sign Up successfully !');
                router.push('/signin');
            } else {
                toast.error('Sign Up not success !');
            }
        } catch (error) {
            console.log(error);
            toast.error('Sign Up not success !');
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-2/5 h-full ">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="px-8 py-3 w-3/5 bg-[#272323a3] rounded-xl shadow-lg shadow-gray-900">
                        <Image
                            src={insIcon}
                            alt="Instagram icon"
                            width={130}
                            height={130}
                            className="mx-auto"
                        />

                        <h1 className="text-xl font-bold text-center mb-2">
                            Sign Up to see photos and videos from your friends
                        </h1>

                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <input
                                {...register('email', {
                                    required: 'Email is required',
                                    validate: (value) => {
                                        if (!isValidEmail(value)) {
                                            return 'Email invalid, enter again!';
                                        }
                                    },
                                })}
                                type="text"
                                placeholder="Email address"
                                className="bg-black block w-full px-3 py-3  rounded-md outline-cyan-600"
                            />
                            {errors.email && (
                                <p className="text-red-500">
                                    {errors.email?.message}
                                </p>
                            )}

                            <input
                                {...register('username', {
                                    required: 'Username is required',
                                    validate: (value) => {
                                        if (value.length < 3) {
                                            return 'Username is length more than 3 characters!';
                                        }
                                    },
                                })}
                                type="text"
                                placeholder="Username"
                                className="mt-6 bg-black block w-full px-3 py-3 rounded-md outline-cyan-600"
                            />
                            {errors.username && (
                                <p className="text-red-500">
                                    {errors.username?.message}
                                </p>
                            )}

                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                    validate: (value) => {
                                        if (value.length < 8) {
                                            return 'Password is length more than 8 characters!';
                                        }
                                    },
                                })}
                                type="password"
                                placeholder="Password"
                                className="mt-6 bg-black block w-full px-3 py-3 rounded-md outline-cyan-600"
                            />
                            {errors.password && (
                                <p className="text-red-500">
                                    {errors.password?.message}
                                </p>
                            )}

                            <p className="text-sm font-light text-center my-3">
                                People who use our service may have uploaded
                                your contact information to Instagram.{' '}
                                <button className="text-cyan-600">
                                    Learn more
                                </button>
                            </p>

                            <p className="text-sm font-light text-center">
                                By signing up, you agree to our{' '}
                                <span className="text-cyan-600">
                                    Terms, Privacy Policy and Cookies Policy.
                                </span>
                            </p>

                            <button
                                type="submit"
                                className="mt-8 px-2 py-3 w-4/5 mx-auto block rounded-3xl bg-cyan-600 hover:bg-cyan-700"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>

                    <div className="mt-4 px-8 py-3 w-3/5 bg-[#272323a3] rounded-xl shadow-lg shadow-gray-900 flex flex-row items-center justify-center">
                        <p>Have an account ?</p>
                        <Link href="/signin">
                            <button className="text-[#5d7eb8] ml-2">
                                Log in
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
