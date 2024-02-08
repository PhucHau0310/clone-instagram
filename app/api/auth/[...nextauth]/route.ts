import { createOrUpdateUser } from '@/lib/actions/user';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/mongodb/mongoose';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',

            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials: any) {
                await connectDB();

                try {
                    const user = await User.findOne({
                        email: credentials.email,
                    });

                    if (user) {
                        const isCorrectPassword = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isCorrectPassword) {
                            return user;
                        }
                    }
                } catch (err) {
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async session({ session }) {
            await connectDB();
            const sessionUser = await User.findOne({
                email: session.user?.email,
            });

            return {
                ...session,
                id: sessionUser._id,
            };
        },

        async signIn({ profile, user, account }) {
            switch (account?.provider) {
                case 'credentials':
                    return true;

                case 'google' || 'github':
                    const res = await createOrUpdateUser({
                        email: profile?.email as string,
                        name: profile?.name as string,
                        picture: user.image as string,
                        provider: account?.provider as string,
                    });
                    return true;
                default:
                    return false;
            }
        },

        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
