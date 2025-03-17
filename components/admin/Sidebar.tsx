import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Map,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  Settings,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const [location] = useLocation();

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <a
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-primary-100 hover:text-primary-900",
              location === item.href
                ? "bg-primary-100 text-primary-900"
                : "text-gray-500 hover:text-primary-900"
            )}
          >
            {item.icon}
            {item.title}
          </a>
        </Link>
      ))}
    </nav>
  );
}

const Sidebar = () => {
  const { logout } = useAuth();
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Packages",
      href: "/admin/packages",
      icon: <Map className="h-5 w-5" />,
    },
    {
      title: "Blogs",
      href: "/admin/blogs",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Messages",
      href: "/admin/contacts",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Menu Button - only visible on small screens */}
      <button
        className="fixed z-40 top-4 left-4 md:hidden bg-white rounded-md p-2 shadow-md focus:outline-none"
        onClick={toggleMobileMenu}
      >
        {isMobileOpen ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>
      
      {/* Sidebar - visible on large screens or when toggled on mobile */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <Link href="/admin">
            <a className="text-2xl font-bold">
              <span className="text-primary-600">Travel</span>
              <span className="text-secondary-500">Ease</span>
              <span className="text-sm font-medium ml-1 text-gray-500">Admin</span>
            </a>
          </Link>
        </div>
        
        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-9rem)] py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <SidebarNav items={sidebarNavItems} />
          </div>
        </ScrollArea>
        
        {/* Footer with logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <Separator className="my-4" />
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500 hover:text-red-600 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
        </div>
      </aside>
      
      {/* Overlay for mobile - closes sidebar when clicked */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
