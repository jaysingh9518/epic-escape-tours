"use client";

import { 
  UserButton,
  // UserProfile,
  useUser,
  SignInButton,
  SignOutButton,
  } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { URLPORT } from "@/app/services/URL";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useUser();
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      
      const username = user?.emailAddresses[0].emailAddress.split("@")[0];

      fetch(`${URLPORT}/api/auth/store-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          firstname: user.firstName?.trim() || user.emailAddresses[0].emailAddress.split("@")[0],
          lastname: user.lastName,
          username, // username is the first part of the email
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setIsActive(data.user.active);
        })
        .catch((error) => console.error("Error storing user:", error));
    }
  }, [user]);

  // Check if user is logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-black">Travel CRM</h1>
        <p className="mt-4 text-black">You are not logged in.</p>
        <SignInButton mode="modal">
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Sign In / Login
          </button>
        </SignInButton>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-black">Travel CRM</h1>
        <p className="mt-4 text-black">You are logged in as {user?.firstName}!</p>
        <p className="mt-4 text-black">Your username is {user?.username}!</p>

        {isActive ? (
          <p className="mt-4 text-black">Your account is active!</p>
        ) : (
          <p className="mt-4 text-black">Your account is not active!</p>
        )}

        <UserButton />
        {/* <UserProfile /> */}
        <SignOutButton>
          <button className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
            Sign Out
          </button>
        </SignOutButton>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Return to Homepage
        </button>
      </div>
    );
  }
}
