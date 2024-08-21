import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String
    },
    category: { 
        type:String 
    },
    uploader: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    channelName: {
        type: String
    },
    filePath: { 
        type: String, 
        required: true 
    },
    thumbnail: {
        type: String,
    },
    duration: {
        type: String,
    },
    views: { 
        type: Number, 
        default: 0 
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Video = mongoose.models.videos || mongoose.model("videos", VideoSchema);

export default Video;

