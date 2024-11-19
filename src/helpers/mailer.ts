import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

interface SendEmailOptions {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailOptions): Promise<void> => {
    try {
        // Generate a hashed token based on the user ID
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Update user data depending on the email type
        if (emailType === "VERIFY") {
            console.log("Updating user for email verification...");
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 3600000), // Token valid for 1 hour
            });
        } else if (emailType === "RESET") {
            console.log("Updating user for password reset...");
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // Token valid for 1 hour
            });
        }

        // Create a reusable transporter object using nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io", // Use environment variable for host
            port: Number(process.env.SMTP_PORT) || 2525, // Use environment variable for port
            auth: {
                user: process.env.SMTP_USER || "a698066d5acf45", // Use environment variable for user
                pass: process.env.SMTP_PASS || "your_smtp_password", // Use environment variable for password
            },
        });

        // Define email content
        const emailSubject = emailType === "VERIFY" ? "Verify your email" : "Reset your password";
        const emailBody = `
            <p>
                Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
                ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
                or copy and paste the link below in your browser:
                <br>
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>
        `;

        // Mail options
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'nnpervez333@gmail.com', // Sender address
            to: email, // Recipient
            subject: emailSubject, // Subject line
            html: emailBody, // HTML body
        };

        // Send email
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", mailResponse);
    } catch (error: unknown) {
        // Handle errors safely
        if (error instanceof Error) {
            console.error("Error sending email:", error.message);
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while sending email.");
    }
};
