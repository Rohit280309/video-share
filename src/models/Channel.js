import mongoose from 'mongoose'

const ChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
    },
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
    }
})

const Channel = mongoose.models.channels || mongoose.model("channels", ChannelSchema);

export default Channel;