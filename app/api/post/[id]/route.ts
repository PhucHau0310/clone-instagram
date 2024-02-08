import Post from '@/lib/models/Post';
import { connectDB } from '@/lib/mongodb/mongoose';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    try {
        await connectDB();
        const post = await Post.findById({ _id: params.id })
            .populate('creator likes')
            .exec();
        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (error) {
        return new NextResponse('Failed to get post by ID', { status: 500 });
    }
};

export const POST = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    const path = require('path');
    const currentWorkingDirectory = process.cwd();
    try {
        await connectDB();
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

        const post = await Post.findByIdAndUpdate(
            { _id: params.id },
            {
                $set: {
                    caption: data.get('caption'),
                    tag: data.get('tag'),
                    postPhoto: `uploads/${postPhoto.name}`,
                },
            },
            {
                new: true,
                useFindAndModify: true,
            }
        );

        await post.save();
        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (error) {
        return new NextResponse('Failed to update post', { status: 500 });
    }
};
