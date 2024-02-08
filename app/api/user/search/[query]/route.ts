import User from '@/lib/models/User';
import { connectDB } from '@/lib/mongodb/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { query: string } }
) => {
    try {
        const query = params.query;

        await connectDB();
        const searchedUsers = await User.find({
            $or: [{ username: { $regex: query, $options: 'i' } }],
        })
            .populate('posts savedPosts likedPosts followers followings')
            .exec();

        return new NextResponse(JSON.stringify(searchedUsers), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to search posts', { status: 500 });
    }
};
