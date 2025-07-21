"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Flame, Search, MessageCircle, Heart, User, Settings, CreditCard, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const bottomNavItems = [
  { href: "/m", icon: Home, label: "Home" },
  { href: "/m/hot", icon: Flame, label: "Hot" },
  { href: "/m/search", icon: Search, label: "Search" },
  { href: "/m/chat", icon: MessageCircle, label: "Chat" },
  { href: "/m/matches", icon: Heart, label: "Matches" },
]

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48&text=You" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Your Name</h3>
                  <p className="text-sm text-muted-foreground">Premium Member</p>
                </div>
              </div>

              <div className="space-y-2">
                <Link href="/m/profile" onClick={() => setIsProfileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-3 h-4 w-4" />
                    My Profile
                  </Button>
                </Link>
                <Link href="/m/profile/edit" onClick={() => setIsProfileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Edit className="mr-3 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/m/subscription" onClick={() => setIsProfileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="mr-3 h-4 w-4" />
                    Subscription
                  </Button>
                </Link>
                <Link href="/m/settings" onClick={() => setIsProfileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="font-bold text-lg">Emotions</h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Main Content - Add padding bottom to account for fixed nav */}
      <div className="flex-1 overflow-y-auto pb-16">{children}</div>

      {/* Bottom Navigation - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur z-40 max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
