import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string => {
    try {
        // Retrieve the token from cookies
        const token = request.cookies.get("token")?.value || "";

        // Ensure the token exists
        if (!token) {
            throw new Error("Token not found");
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

        // Ensure the token contains an ID
        if (!decodedToken || !decodedToken.id) {
            throw new Error("Invalid token payload");
        }

        // Return the user ID from the decoded token
        return decodedToken.id;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while verifying the token");
    }
};
