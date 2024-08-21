import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(request: NextRequest) {
    try {
        const userData = getDataFromToken(request);

        const searchParams = request.nextUrl.searchParams;
        const videoId: any = searchParams.get('videoId');

        const user = await User.findById(userData.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.history = user.history.filter((item: any) => item.video.toString() !== new ObjectId(videoId).toString());

        await user.save();

        return NextResponse.json({ message: "Video deleted" }, { status: 200 });

    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
