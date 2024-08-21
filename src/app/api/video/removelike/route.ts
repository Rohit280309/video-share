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
            return NextResponse.json({ error: "Video Not found" }, { status: 404 });
        }

        video.likes = (video.likes || 0) - 1;
        await video.save();

        const user = await User.findById(userData.id);

        if (!user) {
            return NextResponse.json({ error: "User Not found" }, { status: 404 });
        }

        await user.updateOne({ $pull: { likedVideos: videoId } });

        return NextResponse.json({ message: "Removed Liked Video"}, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}