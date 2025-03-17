"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

import Hero from "@/components/home/Hero";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import Destinations from "@/components/home/Destinations";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import Newsletter from "@/components/home/Newsletter";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const Home = () => {
  const { isSignedIn, user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isSignedIn && user) {
      const syncUser = async () => {
        const existingUser = await fetch(`/api/user?clerkId=${user.id}`).then(res => res.json()).then(data => data.length > 0);
        await fetch('/api/syncUser', {
          method: existingUser ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.primaryEmailAddress?.emailAddress,
            imageUrl: user.imageUrl
          })
        })
          .then(res => res.json())
          .then(data => console.log('User synced:', data))
          .catch(err => console.error('Error syncing user:', err));
      };

      syncUser();
    }
  }, [isSignedIn, user]);

  return (
    <>
      {/* Add your home page content here */}
      {isClient && (
        <div className="mt-5 flex justify-center">
          {!isSignedIn ? (
            <Link href="/sign-in">
              <button className="px-8 py-3 bg-primary-600 rounded-md shadow-md hover:bg-primary-700 border">
                Get Started
              </button>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                Welcome, {user.firstName}!
              </h1>
              <Link href="/user/profile">
                <button className="px-8 py-3 bg-primary-600 rounded-md shadow-md hover:bg-primary-700 border">
                  View Profile
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
      {/* <Hero /> */}
      {/* <FeaturedPackages /> */}
      {/* <Destinations /> */}
      {/* <Testimonials /> */}
      {/* <BlogPreview /> */}
      {/* <Newsletter /> */}
      {/* <WhyChooseUs /> */}
    </>
  );
};

export default Home;
