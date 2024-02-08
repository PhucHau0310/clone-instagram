import Post from '@/lib/models/Post';
import { connectDB } from '@/lib/mongodb/mongoose';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectDB();

        const posts = await Post.find().populate('creator likes').exec();

        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new NextResponse('Failed to get all posts', { status: 500 });
    }
};
