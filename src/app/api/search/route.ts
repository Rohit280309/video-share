import { connect } from "@/db/db";
import Video from "@/models/Video";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        
        const query = request.nextUrl.searchParams.get('query');
        console.log(query);
        if (!query) {
            return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
        }

        const searchResults = await Video.find({
            $or: [
                { title: { $regex: query, $options: "i" } }, 
                { description: { $regex: query, $options: "i" } } 
            ]
        });

        return NextResponse.json({ message: searchResults },{ status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message },{ status: 500 });
    }
}