import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { connectDB } from '@/lib/mongodb/mongoose';
import Post from '@/lib/models/Post';
import User from '@/lib/models/User';
import { getServerSession } from 'next-auth';

export const POST = async (req: NextRequest) => {
    const path = require('path');
    const currentWorkingDirectory = process.cwd();

    const sessionUser = await getServerSession();
    try {
        await connectDB();
        const userId = await User.findOne({ email: sessionUser?.user?.email });

        const data = await req.formData();

        let postPhoto: File | null = data.get('postPhoto') as unknown as File;

        const bytes = await postPhoto.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const postPhotoPath = path.join(
            currentWorkingDirectory,
            'public',
            'uploads',
            postPhoto.name
        );

        await writeFile(postPhotoPath, buffer);

        const newPost = await Post.create({
            creator: userId._id,
            caption: data.get('caption'),
            tag: data.get('tag'),
            postPhoto: `uploads/${postPhoto.name}`,
        });

        await newPost.save();

        // update the user's posts array

        await User.findByIdAndUpdate(
            { _id: userId._id },
            {
                $push: { posts: newPost._id },
            },
            {
                new: true,
                useFindAndModify: false,
            }
        );

        return new NextResponse(JSON.stringify(newPost), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse('Failed to create a new post', { status: 500 });
    }
};
