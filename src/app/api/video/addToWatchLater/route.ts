import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import mongoose from "mongoose";
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

        user.watchLater = user.watchLater || [];
        user.watchLater.push(new mongoose.Types.ObjectId(videoId));
        await user.save();

        return NextResponse.json({ message: "Video added to watch later" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}