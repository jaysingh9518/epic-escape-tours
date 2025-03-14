import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold text-primary-600">Auth App</span>
        </Link>
        <div className="flex space-x-4">
          {!isLoading && !session ? (
            <Link href="/auth/login">
              <span className="text-gray-600 hover:text-primary-600">Sign In</span>
            </Link>
          ) : null}

          {!isLoading && session && (
            <>
              <Link href="/profile">
                <span className="text-gray-600 hover:text-primary-600">Profile</span>
              </Link>
              <Link href="/auth/signout">
                <span className="text-gray-600 hover:text-primary-600">Sign Out</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
