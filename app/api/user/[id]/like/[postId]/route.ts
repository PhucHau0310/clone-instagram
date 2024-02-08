import Post from '@/lib/models/Post';
import User from '@/lib/models/User';
import { connectDB } from '@/lib/mongodb/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
    req: NextRequest,
    { params }: { params: { id: string; postId: string } }
) => {
    try {
        await connectDB();
        const userId = params.id;
        const postId = params.postId;

        const user = await User.findById(userId)
            .populate('posts savedPosts followings followers')
            .populate({
                path: 'likedPosts',
                model: 'Post',
                populate: {
                    path: 'creator',
                    model: 'User',
                },
            });

        const post = await Post.findById(postId).populate('creator likes');

        const isLiked = user?.likedPosts.find(
            (item: any) => item?._id === postId
        );

        if (isLiked) {
            user.likedPosts = user?.likedPosts.filter(
                (item: any) => item?._id !== postId
            );
            post.likes = post?.likes.filter(
                (item: any) => item?._id !== user._id
            );
        } else {
            user?.likedPosts.push(post?._id);
            post?.likes.push(user?._id);
        }

        await user.save();
        await post.save();

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('failed to post like', { status: 500 });
    }
};
