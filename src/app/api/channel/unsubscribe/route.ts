import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const userData = getDataFromToken(request);

        const reqBody = await request.json();

        const { videoId } = reqBody;

        

        const video = await Video.findById(videoId);

        if (!video) {
            return NextResponse.json({ message: "Video not found" }, { status: 404 });
        }

        const uploader = video.uploader;

        const channel: any = await User.findOne({ _id: uploader });

        if (!channel) {
            return NextResponse.json({ error: "Channel Not found" }, { status: 404 });
        }

        channel.subscribers = (channel.subscribers || 0) - 1;
        await channel.save();

        const user = await User.findById(userData.id);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        await user.updateOne({ $pull: { subscriptions: uploader } });


        return NextResponse.json({ message: "Unsubscribed"}, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}