import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
    likedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
    watchLater: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
    history: [{
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        },
        watchedAt: {
            type: Date,
            default: Date.now
        }
    }],
    logo: {
        type: String,
        default: "Your default path"
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "video"
    }],
    subscribers: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;