import Comment from "@/models/Comment";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();

        const { videoId } = reqBody;

        const comments = await Comment.find({ video: videoId });

        if(!comments) {
            return NextResponse.json({ error: "Comments not found"}, { status: 404 });
        }

        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            const user = await User.findById(comment.user);
            if (user) {
                comment.username = user.username;
                comment.logo = user.logo;
            }
        }

        const responseData = comments.map((comment: any) => ({
            ...comment.toObject(),
            logo: comment.logo,
            username: comment.username
        }));

        return NextResponse.json({ message: responseData }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}