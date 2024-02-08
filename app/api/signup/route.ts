import User from '@/lib/models/User';
import { connectDB } from '@/lib/mongodb/mongoose';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const POST = async (req: any) => {
    try {
        const { email, username, password } = await req.json();

        await connectDB();
        const existedUser = await User.findOne({ email: email });

        if (existedUser) {
            return new NextResponse('Email is already in use', { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword,
            provider: 'credentials',
        });

        await newUser.save();

        return new NextResponse('User is registered successfully !', {
            status: 200,
        });
    } catch (error: any) {
        return new NextResponse(error, { status: 500 });
    }
};
