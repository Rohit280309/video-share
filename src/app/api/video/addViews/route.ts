import { getDataFromToken } from "@/helpers/getDataFromToken";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        
        const userData = getDataFromToken(request);

        const searchParams = request.nextUrl.searchParams;
        const videoId: any = searchParams.get('videoId');

        const video = await Video.findById(videoId);

        video.views = video.views + 1;
        await video.save();

        return NextResponse.json({ message: "View added"},{ status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message },{ status: 500 });
    }
}