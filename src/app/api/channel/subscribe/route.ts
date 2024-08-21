import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import Video from "@/models/Video";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const userData = getDataFromToken(request);

        const reqBody = await request.json();

        const { videoId } = reqBody;

        const video = await Video.findById(videoId);

        if (!video) {
            return NextResponse.json({ error: "Video Not found" }, { status: 404 });
        }

        const uploader = video.uploader;

        const channel: any = await User.findOne({ _id: uploader });

        if (!channel) {
            return NextResponse.json({ error: "Channel Not found" }, { status: 404 });
        }

        channel.subscribers = (channel.subscribers || 0) + 1;
        await channel.save();

        const user: any = await User.findById(userData.id);

        if (!user) {
            return NextResponse.json({ error: "User Not found" }, { status: 404 });
        }

        user.subscriptions = user.subscriptions || [];
        user.subscriptions.push(new mongoose.Types.ObjectId(channel._id));
        await user.save();

        return NextResponse.json({ message: "Subscription Added" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
