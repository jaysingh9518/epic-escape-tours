import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ErrorPageProps {
  error?: string;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  const router = useRouter();
  const errorMessage = error || (router.query.error as string);

  const titleMap: Record<string, string> = {
    AccessDenied: 'Access Denied',
    Verification: 'Verification Error',
    Configuration: 'Configuration Error',
    EmailSignin: 'Email Sign-in Error',
  };

  const messageMap: Record<string, string> = {
    AccessDenied: 'You do not have permission to access this resource.',
    Verification: 'The verification link is invalid or has expired.',
    Configuration: 'There is a problem with the server configuration.',
    EmailSignin: 'The e-mail sign in link is invalid or has expired.',
  };

  const title = titleMap[errorMessage] || 'Authentication Error';
  const message = messageMap[errorMessage] || errorMessage || 'An error occurred during authentication.';

  return (
    <>
      <div className="flex items-center justify-center mt-40 bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {message}
            </p>
          </div>
          <div>
            <Link href="/auth/signin" passHref>
              <p className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Back to Sign In
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
