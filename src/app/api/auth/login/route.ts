import { connect } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User"

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        const user = await User.findOne({ email: email, username: username });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        else {

            const validatePassword = await bcryptjs.compare(password, user.password);
            if (!validatePassword) {
                return NextResponse.json({ error: "Invalid Password" }, { status: 400 })
            }

            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

            const response = NextResponse.json({
                message: "Login Successfull",
                success: true,
            });

            response.cookies.set("token", token, { httpOnly: true });

            return response;

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}