import User from '@/lib/models/User';
import { connectDB } from '@/lib/mongodb/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
    req: NextRequest,
    { params }: { params: { id: string; followId: string } }
) => {
    try {
        await connectDB();
        const userId = params.id;
        const followId = params.followId;

        const user = await User.findById(userId).populate(
            'posts savedPosts likedPosts followers followings'
        );

        const personToFollow = await User.findById(followId).populate(
            'posts savedPosts likedPosts followers followings'
        );

        const isFollowing = user?.followings.find(
            (item: any) => item._id === followId
        );

        if (isFollowing) {
            user.followings = user.followings.filter(
                (item: any) => item._id !== followId
            );
        } else {
            user?.followings.push(personToFollow);
            personToFollow?.followers?.push(user);
        }

        await user.save();
        await personToFollow.save();

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to post follow user', { status: 500 });
    }
};
