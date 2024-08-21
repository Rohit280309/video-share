import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Video from "@/models/Video";

export async function DELETE(request: NextRequest) {
    try {
        
        const userData = getDataFromToken(request);
        const searchParams = request.nextUrl.searchParams;
        const videoId: any = searchParams.get('videoId');

        const user = await User.findById(userData.id);
        if (!user) {
            return NextResponse.json({ message: "User not found"},{ status: 404 })
        }
        
        user.videos = user.videos.filter((video: any) => videoId.toString() !== new ObjectId(video).toString());
        
        const video = await Video.findByIdAndDelete(videoId);
        
        await user.save()

        return NextResponse.json({ message: "Video deleted"},{ status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message },{ status: 500 });
    }
}