import User from '../models/User';
import { connectDB } from '../mongodb/mongoose';

interface profileUser {
    email: String;
    name: String;
    picture: String;
    provider: String;
}

export const createOrUpdateUser = async (props: profileUser) => {
    try {
        await connectDB();

        const user = await User.findOneAndUpdate(
            {
                email: props?.email,
            },
            {
                $set: {
                    email: props.email,
                    username: props.name,
                    profilePhoto: props.picture,
                    provider: props.provider,
                },
            },
            { upsert: true, new: true }
        );

        await user.save();

        return user;
    } catch (error) {
        console.log(error);
    }
};

export const findUserByEmail = async (sessionEmail: String) => {
    try {
        await connectDB();
        const user = await User.findOne({ email: sessionEmail });

        return user._id;
    } catch (error) {
        console.log(error);
    }
};
