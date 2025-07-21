"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, X, MapPin, Sparkles, Filter, RotateCcw } from "lucide-react"
import Link from "next/link"

const profiles = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    location: "New York, NY",
    image: "/placeholder.svg?height=600&width=400&text=Sarah",
    bio: "Love hiking, cooking, and exploring new places. Looking for someone to share adventures with!",
    interests: ["Travel", "Cooking", "Hiking", "Photography"],
    distance: "2 miles away",
    lastActive: "Active now",
    images: [
      "/placeholder.svg?height=600&width=400&text=Sarah+1",
      "/placeholder.svg?height=600&width=400&text=Sarah+2",
      "/placeholder.svg?height=600&width=400&text=Sarah+3",
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 32,
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=600&width=400&text=Michael",
    bio: "Software engineer who loves music, art, and good coffee. Let's explore the city together!",
    interests: ["Music", "Art", "Coffee", "Technology"],
    distance: "5 miles away",
    lastActive: "Active 2 hours ago",
    images: [
      "/placeholder.svg?height=600&width=400&text=Michael+1",
      "/placeholder.svg?height=600&width=400&text=Michael+2",
    ],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    age: 26,
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=600&width=400&text=Emma",
    bio: "Yoga instructor and wellness enthusiast. Seeking meaningful connections and positive vibes.",
    interests: ["Yoga", "Wellness", "Meditation", "Nature"],
    distance: "3 miles away",
    lastActive: "Active 1 hour ago",
    images: [
      "/placeholder.svg?height=600&width=400&text=Emma+1",
      "/placeholder.svg?height=600&width=400&text=Emma+2",
      "/placeholder.svg?height=600&width=400&text=Emma+3",
      "/placeholder.svg?height=600&width=400&text=Emma+4",
    ],
  },
]

export default function MeetPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleLike = () => {
    console.log("Liked:", profiles[currentIndex].name)
    nextProfile()
  }

  const handlePass = () => {
    console.log("Passed:", profiles[currentIndex].name)
    nextProfile()
  }

  const handleNope = () => {
    console.log("Noped:", profiles[currentIndex].name)
    nextProfile()
  }

  const nextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length)
    setCurrentImageIndex(0)
    setDragOffset({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y
    setDragOffset({ x: deltaX, y: deltaY })
  }

  const handleMouseUp = () => {
    if (!isDragging) return

    const threshold = 100
    const { x, y } = dragOffset

    if (Math.abs(x) > threshold) {
      if (x > 0) {
        handleLike() // Swipe right = like
      } else {
        handlePass() // Swipe left = pass
      }
    } else if (y > threshold) {
      handleNope() // Swipe down = nope
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 })
    }

    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - dragStart.x
    const deltaY = touch.clientY - dragStart.y
    setDragOffset({ x: deltaX, y: deltaY })
  }

  const handleTouchEnd = () => {
    handleMouseUp()
  }

  const currentProfile = profiles[currentIndex]
  const rotation = dragOffset.x * 0.1
  const opacity = 1 - Math.abs(dragOffset.x) / 300

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Discover People</h1>
            <p className="text-muted-foreground">Find your perfect match</p>
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-md mx-auto relative">
          <div
            ref={cardRef}
            className="relative cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
              opacity: opacity,
              transition: isDragging ? "none" : "transform 0.3s ease-out, opacity 0.3s ease-out",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Card className="overflow-hidden shadow-2xl">
              <div className="relative">
                <img
                  src={currentProfile.images?.[currentImageIndex] || currentProfile.image}
                  alt={currentProfile.name}
                  className="w-full h-96 object-cover"
                />

                {/* Image indicators */}
                {currentProfile.images && currentProfile.images.length > 1 && (
                  <div className="absolute top-4 left-4 right-4 flex gap-1">
                    {currentProfile.images.map((_, index) => (
                      <div
                        key={index}
                        className={`flex-1 h-1 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/30"
                          }`}
                      />
                    ))}
                  </div>
                )}

                {/* Tap areas for image navigation */}
                <div className="absolute inset-0 flex">
                  <div
                    className="flex-1"
                    onClick={() => {
                      if (currentProfile.images && currentImageIndex > 0) {
                        setCurrentImageIndex(currentImageIndex - 1)
                      }
                    }}
                  />
                  <div
                    className="flex-1"
                    onClick={() => {
                      if (currentProfile.images && currentImageIndex < currentProfile.images.length - 1) {
                        setCurrentImageIndex(currentImageIndex + 1)
                      }
                    }}
                  />
                </div>

                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    {currentProfile.lastActive}
                  </Badge>
                </div>

                {/* Swipe indicators */}
                {isDragging && (
                  <>
                    {dragOffset.x > 50 && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xl">LIKE</div>
                      </div>
                    )}
                    {dragOffset.x < -50 && (
                      <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center">
                        <div className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold text-xl">PASS</div>
                      </div>
                    )}
                    {dragOffset.y > 50 && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-xl">NOPE</div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>

                    <Link href={`/user/${currentProfile.id}`}>
                      <h2 className="font-semibold text-lg">
                        {currentProfile.name}, {currentProfile.age}
                      </h2>
                    </Link>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {currentProfile.location} • {currentProfile.distance}
                    </div>
                  </div>

                  <p className="text-muted-foreground">{currentProfile.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {currentProfile.interests.map((interest) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              size="lg"
              variant="outline"
              onClick={handleNope}
              className="rounded-full w-16 h-16 p-0 border-2 hover:border-red-500 hover:text-red-500 bg-transparent"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handlePass}
              className="rounded-full w-16 h-16 p-0 border-2 hover:border-yellow-500 hover:text-yellow-500 bg-transparent"
            >
              <X className="h-6 w-6" />
            </Button>
            <Button size="lg" onClick={handleLike} className="rounded-full w-16 h-16 p-0 bg-red-500 hover:bg-red-600">
              <Heart className="h-6 w-6 fill-current" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-16 h-16 p-0 border-2 hover:border-blue-500 hover:text-blue-500 bg-transparent"
            >
              <Sparkles className="h-6 w-6" />
            </Button>
          </div>

          {/* Swipe Instructions */}
          <div className="text-center mt-4 text-muted-foreground text-sm">
            <p>Swipe right to like • Swipe left to pass • Swipe down to nope</p>
            <p>Tap sides of photo to browse images</p>
          </div>

          {/* Profile Counter */}
          <div className="text-center mt-4 text-muted-foreground">
            {currentIndex + 1} of {profiles.length} profiles
          </div>
        </div>
      </div>
    </div>
  )
}
