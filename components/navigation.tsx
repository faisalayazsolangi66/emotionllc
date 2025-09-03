"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Heart,
  Menu,
  Home,
  Search,
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  User,
  Settings,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/components/auth-context";
import { useIsMobile } from "@/components/ui/use-mobile";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Meet", href: "/meet", icon: Sparkles, protected: true },
  { name: "Matches", href: "/matches", icon: Heart, protected: true },
  { name: "Search", href: "/search", icon: Search, protected: true },
  { name: "Chat", href: "/chatrooms", icon: MessageSquare, protected: true },
  { name: "Groups", href: "/groups", icon: Users, protected: true },
  { name: "Events", href: "/events", icon: Calendar, protected: true },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Forum", href: "/forum", icon: MessageSquare, protected: true },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

  // ✅ keep token in state instead of calling document.cookie in render
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // runs only in browser
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    if (parts.length === 2) {
      setToken(parts.pop()?.split(";").shift() || null);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; SameSite=Lax; Secure";
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Emotions Logo"
            style={{ width: token ? "35%" : "8%" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation
            .filter((item) => !item.protected || isAuthenticated)
            .map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-red-500 ${
                    pathname === item.href
                      ? "text-red-500"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {token && (
            <>
              <Link href={isMobile ? "/m/profile" : "/dashboard"}>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={isMobile ? "/m/settings" : "/profile/settings"}>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </>
          )}

          {token ? (
            <Button onClick={handleLogout} variant="ghost">
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          )}

          {/* Mobile Menu */}
          {!isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 text-lg font-medium transition-colors hover:text-red-500 ${
                          pathname === item.href
                            ? "text-red-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
