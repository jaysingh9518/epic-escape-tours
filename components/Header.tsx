"use client";

import React from 'react';
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header: React.FC = () => {
  const { isSignedIn } = useUser();
  const { theme = "light", setTheme } = useTheme();

  return (
    <header className="bg-gray-600 dark:bg-transparent border shadow-md border-t-0 border-b-blue-200 border-x-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold dark:text-primary-600 text-primary-400">
            Epic Escape Tours
          </span>
        </Link>

        <div className="flex space-x-4 justify-center items-center">
          {isSignedIn ? (
            <div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-15 h-15 border-2 border-primary rounded-full"
                  }
              }} />
            </div>
          ) : (
        
            <SignInButton mode="modal">
              <button className="bg-primary-600 px-6 py-3 rounded-md shadow-md border border-primary-600 transition-all duration-300 hover:bg-primary-700">
                Sign In
              </button>
            </SignInButton>
          )}
          {/* Dark Mode Toggle */}
          <div>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg transition-all duration-300"
            >
              <Icon icon={theme === "light" ? "solar:moon-bold" : "solar:sun-bold"} className="text-3xl" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
