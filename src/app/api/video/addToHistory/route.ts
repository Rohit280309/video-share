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

        let video = {
            video: videoId
        }

        user.history = user.history || [];
        user.history.push(video);
        user.save();

        return NextResponse.json({ message: "History saved" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}