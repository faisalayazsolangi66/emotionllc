"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, X, RotateCcw, MapPin, Star, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const matchProfiles = [
  {
    id: 1,
    name: "Sarah",
    age: 28,
    location: "New York",
    distance: "2 miles away",
    images: [
      "/placeholder.svg?height=500&width=400&text=Sarah1",
      "/placeholder.svg?height=500&width=400&text=Sarah2",
      "/placeholder.svg?height=500&width=400&text=Sarah3",
    ],
    bio: "Adventure seeker, coffee lover, and yoga enthusiast. Looking for someone to explore the city with!",
    interests: ["Travel", "Yoga", "Photography", "Coffee"],
    isOnline: true,
    verified: true,
    compatibility: 89,
  },
  {
    id: 2,
    name: "Emma",
    age: 26,
    location: "Brooklyn",
    distance: "5 miles away",
    images: ["/placeholder.svg?height=500&width=400&text=Emma1", "/placeholder.svg?height=500&width=400&text=Emma2"],
    bio: "Artist by day, dancer by night. Love creating beautiful things and meaningful connections.",
    interests: ["Art", "Dancing", "Music", "Books"],
    isOnline: false,
    verified: true,
    compatibility: 92,
  },
  {
    id: 3,
    name: "Jessica",
    age: 25,
    location: "Manhattan",
    distance: "3 miles away",
    images: [
      "/placeholder.svg?height=500&width=400&text=Jessica1",
      "/placeholder.svg?height=500&width=400&text=Jessica2",
      "/placeholder.svg?height=500&width=400&text=Jessica3",
      "/placeholder.svg?height=500&width=400&text=Jessica4",
    ],
    bio: "Fitness enthusiast and foodie. Always up for trying new restaurants or hitting the gym!",
    interests: ["Fitness", "Food", "Travel", "Movies"],
    isOnline: true,
    verified: false,
    compatibility: 85,
  },
]

export default function MatchesPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [profiles, setProfiles] = useState(matchProfiles)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const currentProfile = profiles[currentIndex]

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setDragStart({ x: touch.clientX, y: touch.clientY })
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - dragStart.x
    const deltaY = touch.clientY - dragStart.y
    setDragOffset({ x: deltaX, y: deltaY })
  }

  const handleTouchEnd = () => {
    if (!isDragging) return

    const threshold = 100
    const { x, y } = dragOffset

    if (Math.abs(x) > threshold) {
      if (x > 0) {
        handleLike()
      } else {
        handlePass()
      }
    } else if (y > threshold) {
      handleNope()
    }

    setDragOffset({ x: 0, y: 0 })
    setIsDragging(false)
  }

  const handleLike = () => {
    nextProfile()
  }

  const handlePass = () => {
    nextProfile()
  }

  const handleNope = () => {
    nextProfile()
  }

  const nextProfile = () => {
    setCurrentImageIndex(0)
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handleImageTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width

    if (x < width / 2) {
      // Tap left side - previous image
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1)
      }
    } else {
      // Tap right side - next image
      if (currentImageIndex < currentProfile.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1)
      }
    }
  }

  const cardStyle = {
    transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
    opacity: isDragging ? 0.8 : 1,
    transition: isDragging ? "none" : "transform 0.3s ease, opacity 0.3s ease",
  }

  return (
    <div className="p-4 space-y-4 pb-20 relative">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Discover</h2>
        <p className="text-sm text-muted-foreground">{profiles.length - currentIndex} profiles remaining</p>
      </div>

      {/* Profile Card */}
      <div className="relative h-[600px] flex items-center justify-center">
        <div
          ref={cardRef}
          className="relative w-full max-w-sm"
          style={cardStyle}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Card className="overflow-hidden shadow-lg">
            <div className="relative">
              <div className="relative cursor-pointer" onClick={handleImageTap}>
                <Image
                  src={currentProfile.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${currentProfile.name} photo ${currentImageIndex + 1}`}
                  width={400}
                  height={500}
                  className="w-full h-96 object-cover"
                />

                {/* Image Indicators */}
                {currentProfile.images.length > 1 && (
                  <div className="absolute top-4 left-4 right-4 flex space-x-1">
                    {currentProfile.images.map((_, index) => (
                      <div
                        key={index}
                        className={`flex-1 h-1 rounded-full ${
                          index === currentImageIndex ? "bg-white" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex flex-col space-y-1">
                  {currentProfile.isOnline && <Badge className="bg-green-500">Online</Badge>}
                  {currentProfile.verified && (
                    <Badge className="bg-blue-500">
                      <Star className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Compatibility Score */}
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded-full">
                  <span className="text-sm font-bold">{currentProfile.compatibility}% Match</span>
                </div>
              </div>

              {/* Profile Info */}
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Link href={`/user/${currentProfile.id}`}>
                      <h3 className="text-xl font-bold">{currentProfile.name}</h3>
                    </Link>

                    <span className="text-lg text-muted-foreground">{currentProfile.age}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>

                <p className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3 mr-1" />
                  {currentProfile.distance}
                </p>

                <p className="text-sm mb-3">{currentProfile.bio}</p>

                <div className="flex flex-wrap gap-1">
                  {currentProfile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Swipe Indicators */}
        {isDragging && (
          <>
            {dragOffset.x > 50 && (
              <div className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg rotate-12">
                LIKE
              </div>
            )}
            {dragOffset.x < -50 && (
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-gray-500 text-white px-4 py-2 rounded-full font-bold text-lg -rotate-12">
                PASS
              </div>
            )}
            {dragOffset.y > 50 && (
              <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                NOPE
              </div>
            )}
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 border-red-200 hover:bg-red-50 bg-transparent"
          onClick={handleNope}
        >
          <X className="h-6 w-6 text-red-500" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 border-gray-200 hover:bg-gray-50 bg-transparent"
          onClick={handlePass}
        >
          <RotateCcw className="h-6 w-6 text-gray-500" />
        </Button>

        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
          onClick={handleLike}
        >
          <Heart className="h-6 w-6" />
        </Button>
      </div>

      {/* Swipe Instructions */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Swipe right to like • Swipe left to pass • Swipe down to nope</p>
        <p>Tap photo sides to browse images</p>
      </div>
    </div>
  )
}
