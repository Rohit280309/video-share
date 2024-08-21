import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import User from "@/models/User";

export async function POST(request: NextRequest) {
    try {
        
        const userData = getDataFromToken(request);

        const formData = await request.formData();

        const file: any = formData.get("logo");
        if (!file) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");

        await writeFile(
            path.join(process.cwd(), "/public/logo/" + userData.id + "_" + filename),
            buffer
        );

        const logoPath = path.join(process.cwd() + "/public/logo/" + userData.id + "_" + filename);

        const user = await User.findById(userData.id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        user.logo = logoPath;

        await user.save();

        return NextResponse.json({ message: "Profile Updated"}, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}