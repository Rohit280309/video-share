import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        
        const userData = getDataFromToken(request);

        const user = await User.findById(userData.id);

        if (!user) {
            return NextResponse.json({ message: "User not found" },{ status: 404 });
        }

        let history = user.history;

        return NextResponse.json({ message: history }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}