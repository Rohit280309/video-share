import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";

export async function GET(request: NextRequest) {
    try {
        const userData = getDataFromToken(request);
        const searchParams = request.nextUrl.searchParams;
        const videoId: any = searchParams.get('videoId');

        const video = await Video.findById(videoId);

        const videoUser = await User.findOne({ _id: video.uploader });
        if (videoUser) {
            video.logo = videoUser.logo;
            video.subscribers = videoUser.subscribers;
        }

        const user = await User.findById(userData.id);
        const isSubscribed = user.subscriptions.includes(video.uploader);
        const isSaved = user.watchLater.includes(video._id);

        const responseData = {
            ...video.toObject(),
            logo: video.logo,
            subscribers: video.subscribers,
            isSubscribed: isSubscribed,
            isSaved: isSaved,
        };

        return NextResponse.json({ video: responseData }, { status: 200 } );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}