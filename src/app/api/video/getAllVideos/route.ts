import { NextRequest, NextResponse } from "next/server";
import Video from "@/models/Video";
import { connect } from "@/db/db";
import User from "@/models/User";

connect();

export async function GET(request: NextRequest) {
    try {
        const videos: any = await Video.find();

        for (let i = 0; i < videos.length; i++) {
            const video = videos[i];
            const user = await User.findOne({ _id: video.uploader });
            if (user) {
                video.logo = user.logo;
            }
        }

        const responseData = videos.map((video: any) => ({
            ...video.toObject(),
            logo: video.logo
        }));

        return NextResponse.json({ videos: responseData }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


