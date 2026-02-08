"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function UserButton() {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const loggedIn = status === "authenticated";

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((v) => !v)} aria-label="User menu">
        <UserIcon className="h-6 w-6 cursor-pointer text-text" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 z-50 overflow-hidden rounded-md border border-primary bg-primary/100 shadow-lg">
          {!loggedIn ? (
            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="w-full cursor-pointer px-4 py-2 text-left text-sm text-white transition hover:bg-interactive"
            >
              Login
            </button>
          ) : (
            <>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="block cursor-pointer px-4 py-2 text-sm text-white transition hover:bg-interactive"
              >
                Profile
              </Link>

              <div className="h-px bg-white/20" />

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full cursor-pointer px-4 py-2 text-left text-sm text-white transition hover:bg-interactive"
              >
                Log out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}