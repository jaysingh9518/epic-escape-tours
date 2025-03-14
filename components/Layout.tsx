import React, { ReactNode } from 'react';
import "@/styles/globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary-600">
            Auth App
          </Link>
          <div className="flex space-x-4">
            {!loading && !session && (
              <Link href="/auth/signin" className="text-gray-600 hover:text-primary-600">
                Sign In
              </Link>
            )}
            {!loading && session && (
              <>
                <Link href="/profile" className="text-gray-600 hover:text-primary-600">
                  Profile
                </Link>
                <Link href="/auth/signout" className="text-gray-600 hover:text-primary-600">
                  Sign Out
                </Link>
              </>
            )}
          </div>
        </nav>
      </header> */}

      <main className="flex-grow">
        {children}
      </main>

      <ScrollToTop />
      <Footer />
      {/* <footer className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Auth App. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}