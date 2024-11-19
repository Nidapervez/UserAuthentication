"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";  // Import AxiosError for type safety
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";  // Import Link from next/link

// Define a type for the user state
interface User {
  email: string;
  password: string;
  username: string;
}

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Successful:", response.data);

      toast.success("Registration successful! Click the button below to log in.");
      setSignupComplete(true); // Mark signup as complete
    } catch (error: unknown) {
      // Type the error as AxiosError to handle it correctly
      if (error instanceof AxiosError) {
        console.error("Signup failed:", error);
        toast.error(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    user.email.includes("@") &&
    user.email.length > 0 &&
    user.password.length > 0 &&
    user.username.length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <h1 className="text-2xl font-bold text-center mb-6">
          {loading ? "Processing..." : signupComplete ? "Sign Up Complete" : "Sign Up"}
        </h1>

        {/* Username Field */}
        <label htmlFor="username" className="block text-black">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mt-1 mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter your username"
        />

        {/* Email Field */}
        <label htmlFor="email" className="block text-black">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mt-1 mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter your email"
        />

        {/* Password Field */}
        <label htmlFor="password" className="block text-black">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mt-1 mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
        />

        {/* Signup Button */}
        {!signupComplete && (
          <button
            onClick={onSignup}
            disabled={!isFormValid || loading}
            className={`w-full py-2 rounded-lg mt-4 ${
              isFormValid
                ? "bg-blue-500 text-black hover:bg-blue-600"
                : "bg-gray-300 text-black cursor-not-allowed"
            }`}
          >
            {loading ? "Registering your account... Please wait" : "Sign Up"}
          </button>
        )}

        {/* Success Message and Login Button */}
        {signupComplete && (
          <>
            <p className="mt-4 text-center text-green-600">
              Congratulations! You have registered successfully. Click the button below to log in.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full py-2 rounded-lg mt-4 bg-green-500 text-white hover:bg-green-600"
            >
              Go to Login Page
            </button>
          </>
        )}

        {/* Link to Login Page */}
        {!signupComplete && (
          <div className="mt-4 text-center text-sm text-black">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
