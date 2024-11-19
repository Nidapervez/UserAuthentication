import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect();

// GET request handler for logout
export async function GET(request: NextRequest) {
    try {
        // Create a response with a success message
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true,
        });

        // Clear the token cookie by setting it with an expired date
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
            sameSite: "strict",
            expires: new Date(0), // Expire the cookie immediately
        });

        return response;
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
