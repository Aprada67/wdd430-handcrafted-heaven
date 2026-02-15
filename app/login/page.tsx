"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 p-8 bg-white shadow-lg">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue to Handcrafted Heaven
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="btn-primary cursor-pointer flex items-center justify-center w-full gap-3 rounded-md bg-primary text-white py-3 font-medium text-lg hover:bg-gray-800 transition-colors shadow-md"
        >
          <FaGithub size={20} />
          Continue with GitHub
        </button>
        <div className="mt-6 text-center text-gray-400 text-sm">
          By signing in, you agree to our{" "}
          <a href="#" className="text-amber-800 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-amber-800 hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}