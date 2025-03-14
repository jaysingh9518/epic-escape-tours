"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ThemeToggle from '@/ThemeToggle';

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <header className="bg-gray-100 shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold text-primary-600 dark:text-secondary">
            Auth App
          </span>
        </Link>
        
        <div className="flex space-x-4 items-center">
          {!isLoading && !session ? (
            <Link href="/auth/login">
              <span className="text-black-600 hover:text-gray-600">
                Sign In
              </span>
            </Link>
          ) : null}

          {!isLoading && session && (
            <>
              <Link href="/profile">
                <span className="text-black-600 hover:text-gray-600">
                  Profile
                </span>
              </Link>
              <Link href="/auth/signout">
                <span className="text-black-600 hover:text-gray-600">
                  Sign Out
                </span>
              </Link>
            </>
          )}

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
