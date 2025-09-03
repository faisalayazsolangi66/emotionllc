"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
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
} from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { useIsMobile } from "@/components/ui/use-mobile"

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
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const isMobile = useIsMobile() // returns true if mobile

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <Heart className="h-8 w-8 text-red-500 fill-current" />
          <span className="text-2xl font-bold">EMOTIONS</span> */}
          <img src={'/logo.png'} alt="Emotions Logo" style={{width:'8%'}} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation
            .filter((item) => !item.protected || isAuthenticated)
            .map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-red-500 ${
                    pathname === item.href ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
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
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 text-lg font-medium transition-colors hover:text-red-500 ${
                          pathname === item.href ? "text-red-500" : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
