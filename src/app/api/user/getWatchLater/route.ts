import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        
        const userData = getDataFromToken(request);
        const user = await User.findById(userData.id);
        const watchLater = user.watchLater;

        const videosPromises = watchLater.map(async (videoId: any) => {
            const videos = await Video.findById(videoId);
            return videos;
        });

        const videosArrays = await Promise.all(videosPromises);

        const videos = videosArrays.flat();

        for (let i = 0; i < videos.length; i++) {
            const video = videos[i];
            const uploader = await User.findById(video.uploader);
            if (uploader) {
                video.logo = uploader.logo;
            }
        }

        const responseData = videos.map((video: any) => ({
            ...video.toObject(), 
            logo: video.logo
        }));

        return NextResponse.json({ message: responseData }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}