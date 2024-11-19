"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false); // Track login failure

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile");
      setLoginFailed(false); // Reset login failure state on success
    } catch (error: any) {
      console.log("Login failed");
      toast.error(error.message);
      setLoginFailed(true); // Set login failure state on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-80">
        <h1 className="text-2xl font-bold text-center mb-6">
          {loading ? "Processing..." : "Welcome to Login page"}
        </h1>

        {/* Email Field */}
        <label htmlFor="email" className="block text-gray-700">
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
        <label htmlFor="password" className="block text-gray-700">
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

        {/* Login Button */}
        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className={`w-full py-2 rounded-lg mt-4 ${
            buttonDisabled || loading
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        {/* Login Failed Message */}
        {loginFailed && (
          <button
            onClick={() => router.push("/signup")}
            className="w-full py-2 rounded-lg mt-4 bg-red-500 text-white hover:bg-red-600"
          >
            Wrong information!! Go to Signup Page to Signup
          </button>
        )}

        {/* Link to Signup Page */}
        {!loading && (
          <Link href="/signup" className="mt-4 text-center underline text-blue-500">
            Visit Signup Page
          </Link>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
