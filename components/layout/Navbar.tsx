import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, useClerk, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const location = usePathname();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut } = useClerk();
  const { theme, setTheme } = useTheme();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="text-2xl text-black font-bold cursor-pointer">
                <span className="text-primary-600">Travel</span>
                <span className="text-secondary-500">Ease</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <div 
                  className={`font-medium cursor-pointer ${
                    location === item.path
                      ? "text-gray-900 border-b-2 border-primary-600" 
                      : "text-gray-500 hover:text-primary-600"
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </nav>
          
          {/* User Menu / Sign In */}
          <div className="flex items-center space-x-4">
            <Link href="/packages">
              <div className="hidden md:inline-block text-gray-500 hover:text-primary-600 cursor-pointer">
                <Search className="h-5 w-5" />
              </div>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:flex items-center gap-2">
                    <Avatar className="h-8 w-8 border">
                      {user?.imageUrl && (
                        <Image src={user?.imageUrl} alt="Avatar" width={32} height={32} />
                      )}
                      <AvatarFallback className="bg-primary-100 text-primary-600">
                      {user?.firstName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-black">{user.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white text-black">
                  <DropdownMenuItem asChild>
                    <Link href="/user/profile">
                      <div className="w-full cursor-pointer">Profile</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/booking-history">
                      <div className="w-full cursor-pointer">Booking History</div>
                    </Link>
                  </DropdownMenuItem>
                  
                  { user.publicMetadata.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">
                          <div className="w-full cursor-pointer">Admin Dashboard</div>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut({ redirectUrl: '/' })}
                    className="cursor-pointer text-red-600 focus:text-red-700"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-gray-500 hover:text-primary-600 cursor-pointer">
                  <SignInButton mode="modal" />
                </div>
              </div>
            )}

            {/* Theme Switcher */}
            <button 
              className="flex items-center gap-2" 
              onClick={() => setTheme(theme === "light"? "dark" : "light")}
            >
              <Icon icon={theme === "light"? "solar:moon-bold" : "solar:sun-bold"} className="text-2xl text-black" />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-500 focus:outline-none" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-4 space-y-1 bg-white">
              {navItems.map((item) => (
                <Link key={item.name} href={item.path}>
                  <div 
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location === item.path
                        ? "text-gray-900 bg-gray-100" 
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link href="/user/profile">
                    <div 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </div>
                  </Link>
                  <Link href="/user/booking-history">
                    <div 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Booking History
                    </div>
                  </Link>
                  
                  {user?.publicMetadata?.role === "admin" && (
                    <Link href="/admin/dashboard">
                      <div 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </div>
                    </Link>
                  )}
                  
                  <button
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <SignInButton mode="modal" />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
