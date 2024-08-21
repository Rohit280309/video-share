import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        
        const userData = getDataFromToken(request);

        const reqBody = await request.json();
        const { videoId } = reqBody;

        const user = await User.findById(userData.id);

        if (!user) {
            return NextResponse.json({ message: "User not found"}, { status: 404 });
        }

        await user.updateOne({ $pull: { watchLater: videoId } });

        return NextResponse.json({ message: "Video Removed from watch later"}, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}