"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border p-6 bg-background">
        <h1 className="text-xl font-bold text-text">Login</h1>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="btn btn-primary mt-4"
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}