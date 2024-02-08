import mongoose from 'mongoose';

let isConnected = false;
export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        console.log('Missing MongoDB URL !');
        return;
    }

    if (isConnected) {
        console.log('MongoDB is already is connect !');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;

        console.log('MongoDB is connected successfully !');
    } catch (error) {
        console.log(error);
    }
};
