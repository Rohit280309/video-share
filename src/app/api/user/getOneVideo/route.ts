import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const userData = getDataFromToken(request);

        const reqBody = await request.json();
        const { videoId } = reqBody;

        const user = await User.findById(userData.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const video = await Video.findById(videoId);
        const uploader = await User.findById(video.uploader);
        if (uploader) {
            video.logo = uploader.logo;
        }

        const responseData = {
            ...video.toObject(),
            logo: video.logo
        };

        return NextResponse.json({ message: responseData }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}