import User from '@/lib/models/User';
import { connectDB } from '@/lib/mongodb/mongoose';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectDB();

        const users = await User.find()
            .populate('posts savedPosts likedPosts followers followings')
            .exec();

        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new NextResponse('Failed to get all user', { status: 500 });
    }
};
