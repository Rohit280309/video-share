import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import mongoose from "mongoose";
import Video from "@/models/Video";
import { writeFile } from "fs/promises";
import { connect } from "@/db/db";
import { getVideoDuration } from "@/helpers/getVideoDuration";
import User from "@/models/User";

connect();

export async function POST(request: NextRequest) {
    try {
        const user = getDataFromToken(request);
        const formData = await request.formData();

        const file: any = formData.get("file");
        if (!file) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");

        await writeFile(
            path.join(process.cwd(), "/public/upload/" + user.id + "_" + filename),
            buffer
        );

        const filePath = path.join(process.cwd(), "/public/upload/" + user.id + "_" + filename);

        const videoDuration = await getVideoDuration(filePath);

        const thumbnailFile: any = formData.get("thumbnail"); 
        if (!thumbnailFile) {
            return NextResponse.json({ error: "No tumbnail received." }, { status: 400 });
        }

        const thumbBuffer = Buffer.from(await thumbnailFile.arrayBuffer());
        const thumbName = thumbnailFile.name.replaceAll(" ", "_");

        await writeFile(
            path.join(process.cwd(), "/public/thumbnails/" + user.id + "_" + thumbName),
            thumbBuffer
        );

        const thumbPath = path.join(process.cwd(), "/public/thumbnails/" + user.id + "_" + thumbName);
        console.log(user.username);
        const video = new Video({
            title: formData.get("title"),
            description: formData.get("description"),
            duration: videoDuration,
            category: formData.get("category"),
            uploader: new mongoose.Types.ObjectId(user.id),
            channelName: user.username,
            filePath: filePath,
            thumbnail: thumbPath
        })

        const savedVideo = await video.save();

        const userDb = await User.findById(user.id);
        if (!userDb) {
            return NextResponse.json({error: "User Not found"}, {status: 404});
        }

        userDb.videos.push(new mongoose.Types.ObjectId(savedVideo._id));
        await userDb.save();
        
        return NextResponse.json({ success: true, message: "Video uploaded successfully" });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}