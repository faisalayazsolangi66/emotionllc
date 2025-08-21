"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, X, MapPin, Sparkles, Filter, RotateCcw } from "lucide-react"
import Link from "next/link"

type Profile = {
  id: number
  username: string
  name: string
  age: number
  location: string
  image: string
  bio: string
  interests: string[]
  distance: string
  lastActive: string
  images: string[]
}

export default function MeetPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // ✅ Fetch profiles from API
  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 700) + 1
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}users?page=${randomPage}&limit=1000&with_photo=yes`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.data) {
          const mapped: Profile[] = data.data.data.map((user: any) => {
            const firstAlbum = user.albums?.[0]
            const firstPhoto = firstAlbum?.photos?.[0]

            return {
              id: user.id,
              name: user.realname || user.username,
              age: user.birthdate ? new Date().getFullYear() - new Date(user.birthdate).getFullYear() : 25,
              location: "Unknown", // dummy since API has no location
              image:
                firstPhoto?.photo_url ||
                firstAlbum?.cover?.cover_url ||
                "/placeholder.svg?height=600&width=400&text=No+Photo",
              bio: "This user has not added a bio yet.", // dummy
              interests: ["Music", "Travel", "Sports"], // dummy
              distance: "5 miles away", // dummy
              lastActive: "Active recently", // dummy
              images: firstAlbum?.photos?.map((p: any) => p.photo_url) || [],
            }
          })
          setProfiles(mapped)
        }
      })
      .catch((err) => {
        console.error("API error:", err)
      })
  }, [])

  const handleLike = () => {
    console.log("Liked:", profiles[currentIndex]?.name)
    nextProfile()
  }

  const handlePass = () => {
    console.log("Passed:", profiles[currentIndex]?.name)
    nextProfile()
  }

  const handleNope = () => {
    console.log("Noped:", profiles[currentIndex]?.name)
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
      if (x > 0) handleLike()
      else handlePass()
    } else if (y > threshold) {
      handleNope()
    } else {
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

  if (profiles.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading profiles...</div>
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
                        className={`flex-1 h-1 rounded-full ${
                          index === currentImageIndex ? "bg-white" : "bg-white/30"
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
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Link href={`/user/${currentProfile.username}`}>
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

          {/* Profile Counter */}
          <div className="text-center mt-4 text-muted-foreground">
            {currentIndex + 1} of {profiles.length} profiles
          </div>
        </div>
      </div>
    </div>
  )
}
