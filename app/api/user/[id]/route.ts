import Post from '@/lib/models/Post';
import User from '@/lib/models/User';
import { connectDB } from '@/lib/mongodb/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        await connectDB();

        const user = await User.findById({ _id: params.id })
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

        if (user.password) {
            const { password, ...userNoPassword } = user._doc;
            return new NextResponse(JSON.stringify(userNoPassword), {
                status: 200,
            });
        }

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to get user', { status: 500 });
    }
};
