"use client";

import React, { useEffect, useState } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        const existingUser = await fetch(`/api/user?clerkId=${user.id}`)
          .then((res) => res.json())
          .then((data) => data.length > 0);
  
        await fetch('/api/syncUser', {
          method: existingUser ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clerkId: user.id,
            firstname: user.firstName,
            lastname: user.lastName,
            username: user.username,
            email: user.primaryEmailAddress?.emailAddress,
            imageUrl: user.imageUrl
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log('User synced:', data))
          .catch((err) => console.error('Error syncing user:', err));
      }
    };
  
    syncUser();
  }, [isSignedIn, user]);

  useEffect(() => {
    setIsClient(true); // Ensures this code only runs on the client side
  }, []);

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mt-20">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-primary-600 dark:text-primary-400">Epic Escape Tours</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover amazing travel experiences with secure authentication powered by Clerk and MongoDB.
          </p>
          {isClient && (
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              {!isSignedIn ? (
                <div className="rounded-md shadow">
                  <SignInButton mode="modal">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-blue-100 text-base font-medium rounded-md shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 md:py-4 md:text-lg md:px-10">
                      Get Started
                    </button>
                  </SignInButton>
                </div>
              ) : (
                <div className="rounded-md shadow">
                  <Link
                    href="/profile"
                    className="w-full flex items-center justify-center px-8 py-3 border border-blue-100 text-base font-medium rounded-md shadow-md bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 md:py-4 md:text-lg md:px-10"
                  >
                    View Profile
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
