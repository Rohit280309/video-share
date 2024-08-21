import { connect } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/User";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({username: username, email: email});
        if (user) {
            return NextResponse.json({error: "User already exist"}, {status: 400});
        }
        else{
            const salt = await bcryptjs.genSalt(10);
            const hashPass = await bcryptjs.hash(password, salt);

            const newUser = new User({
                username: username,
                email: email,
                password: hashPass,
                subscriptions: []
            });

            const savedUser = await newUser.save();

            return NextResponse.json({message: "User Created", success: true}, {status: 200});

        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}