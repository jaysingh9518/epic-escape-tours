"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { useUser, UserButton, SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme = "light", setTheme } = useTheme();
  const { user } = useUser(); // Fixed destructuring
  const [open, setOpen] = useState(false);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 20);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && navbarOpen) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen]);

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "";
  }, [navbarOpen]);

  return (
    <header className={`fixed top-0 z-40 w-full transition-all duration-300 ${sticky ? "shadow-lg bg-white dark:bg-gray-800 py-4" : "shadow-none py-8"}`}>
      <div className="lg:py-0 py-2">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
          <Logo />
          <nav className="hidden lg:flex flex-grow items-center gap-8 justify-center">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Phone Contact */}
            <Link href="#" className="hidden md:block text-lg font-medium hover:text-primary">
              <Icon icon="solar:phone-bold" className="text-primary text-3xl inline-block me-2" />
              +1(909) 235-9814
            </Link>

            {/* Clerk Authentication for Desktop */}
            <div className="hidden lg:flex items-center gap-x-4">
              <SignedIn>
                <div className="relative flex items-center gap-x-4">
                  {/* Avatar */}
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user?.imageUrl || ""}
                    alt="User Avatar"
                  />

                  {/* Profile Button */}
                  <button
                    onClick={() => setOpen(!open)}
                    className="text-white bg-primary/75 hover:bg-primary font-medium text-md py-2 px-2 rounded-full"
                  >
                    Profile
                  </button>

                  {/* Dropdown Menu */}
                  {open && (
                    <div className="absolute top-8 right-4 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
                      <p className="px-4 py-2 text-md font-semibold text-gray-800 dark:text-white">
                        {user?.fullName || "My Account"}
                      </p>
                      <SignOutButton>
                        <button className="w-full text-left px-4 py-2 text-md text-red-600 hover:bg-gray-100 rounded-lg">
                          Sign Out
                        </button>
                      </SignOutButton>
                    </div>
                  )}
                </div>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-white bg-primary/75 hover:bg-primary font-medium text-md py-2 px-2 rounded-full">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 rounded-lg transition-all duration-300"
              >
                <Icon icon={theme === "light" ? "solar:moon-bold" : "solar:sun-bold"} className="text-3xl" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setNavbarOpen(!navbarOpen)} className="block lg:hidden p-2 rounded-lg" aria-label="Toggle mobile menu">
              <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
              <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
              <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {navbarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => { setNavbarOpen(false); setOpen(!open); }} />
        )}

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-gray-100 dark:bg-gray-900 shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? "translate-x-0" : "translate-x-full"} z-50`}
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              <Logo />
            </h2>

            <button onClick={() => setNavbarOpen(false)} className="p-2 rounded-lg text-gray-700 dark:text-white" aria-label="Close mobile menu">
              <Icon icon="iconamoon:close-bold" className="text-3xl" />
            </button>
          </div>

          <nav className="flex flex-col items-start p-4">
            {headerData.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className="mt-4 flex flex-col space-y-4 w-full">
              {/* Clerk Auth in Mobile Menu */}
              <div className="flex flex-col items-start gap-y-4">
                <SignedIn>
                  <div className="flex items-center gap-x-4">
                    {/* Avatar */}
                    <div className="pointer-events-auto p-2">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10 border-2 border-primary rounded-full"
                          }
                        }}
                      />
                    </div>

                    {/* Profile Button & Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-white bg-primary/75 hover:text-white hover:bg-primary font-medium text-md py-2 px-3 rounded-full">
                          Profile
                        </span>
                      </button>

                      {/* Dropdown Menu */}
                      {open && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
                          <button className="w-full text-left px-4 py-2 text-md text-grey-800 hover:bg-gray-100 rounded-lg">
                            {user?.fullName || "My Account"}
                          </button>
                          <SignOutButton>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg">
                              Sign Out
                            </button>
                          </SignOutButton>
                        </div>
                      )}
                    </div>
                  </div>
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="text-white bg-primary/75 hover:text-white hover:bg-primary font-medium text-lg py-4 px-8 rounded-full">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="block p-2 rounded-lg transition-all duration-300"
                >
                  <Icon icon={theme === "light" ? "solar:moon-bold" : "solar:sun-bold"} className="text-3xl" />
                </button>
              </div>

              {/* Contact Number in Mobile Menu */}
              <div>
                <Link href="#" className="text-lg font-medium hover:text-primary">
                  <Icon icon="solar:phone-bold" className="text-primary text-3xl inline-block me-2" />
                  +1(909) 235-9814
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
