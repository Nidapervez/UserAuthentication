// Database connection
import { connect } from '@/dbConfig/dbConfig';

// User model
import User from '@/models/userModel';

// Required modules
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Connect to the database
connect();

// POST request handler
export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Validate the password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Check your credentials" }, { status: 400 });
        }

        // Generate JWT token
        const tokenData = { id: user._id, username: user.username, email: user.email };
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET environment variable is not set");
        }
        const token = jwt.sign(tokenData, secret, { expiresIn: '1d' });

        // Set token in a cookie and return response
        const response = NextResponse.json({
            message: "Logged In Successfully",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
