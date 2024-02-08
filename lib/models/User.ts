import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: false,
    },
    profilePhoto: {
        type: String,
        require: false,
    },
    provider: {
        type: String,
        require: false,
    },
    posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        default: [],
    },
    savedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        default: [],
    },
    likedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        default: [],
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    followings: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
