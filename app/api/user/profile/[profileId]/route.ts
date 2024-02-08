import Post from '@/lib/models/Post';
import User from '@/lib/models/User';
import { connectDB } from '@/lib/mongodb/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { profileId: string } }
) => {
    try {
        await connectDB();
        const user = await User.findById(params.profileId)
            .populate({
                path: 'posts savedPosts likedPosts',
                model: Post,
                populate: {
                    path: 'creator',
                    model: User,
                },
            })
            .populate({
                path: 'followers followings',
                model: User,
                populate: {
                    path: 'posts savedPosts likedPosts',
                    model: Post,
                },
            })
            .exec();

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new NextResponse('Failed to get profile', { status: 500 });
    }
};
