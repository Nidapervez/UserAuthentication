import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer'; // Assuming this is the correct path to your sendEmail function

// Connect to the database
connect();

// POST request handler for user registration
export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Validate input
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Username, email, and password are required" },
                { status: 400 }
            );
        }

        console.log(reqBody);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash the user's password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send a verification email
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });

        // Respond with success
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            user: { id: savedUser._id, username: savedUser.username, email: savedUser.email },
        });
    } catch (error: unknown) {
        // Handle errors safely
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
