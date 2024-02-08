import Post from '@/lib/models/Post';
import { connectDB } from '@/lib/mongodb/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { query: string } }
) => {
    try {
        const query = params.query;

        await connectDB();
        const searchedPosts = await Post.find({
            $or: [
                { caption: { $regex: query, $options: 'i' } },
                { tag: { $regex: query, $options: 'i' } },
            ],
        })
            .populate('creator likes')
            .exec();

        return new NextResponse(JSON.stringify(searchedPosts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to search posts', { status: 500 });
    }
};
