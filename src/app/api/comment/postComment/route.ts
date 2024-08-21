import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Comment from "@/models/Comment"
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
    try {
        
        const userData = getDataFromToken(request);

        const reqBody = await request.json();
        const { comment, videoId } = reqBody;

        const commentDb = new Comment({
            content: comment,
            video: new mongoose.Types.ObjectId(videoId),
            user: new mongoose.Types.ObjectId(userData.id)
        })

        const savedComment = await commentDb.save();

        return NextResponse.json({ message: "Comment Saved"},{ status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}