"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, Heart, X, MapPin } from "lucide-react"
import Image from "next/image"

const hotProfiles = [
  {
    id: 1,
    name: "Alexandra",
    age: 28,
    location: "New York",
    images: ["/placeholder.svg?height=400&width=300&text=Alexandra"],
    bio: "Adventure seeker, coffee lover, and yoga enthusiast",
    interests: ["Travel", "Yoga", "Photography"],
    isOnline: true,
    hotScore: 98,
  },
  {
    id: 2,
    name: "Sophia",
    age: 26,
    location: "Los Angeles",
    images: ["/placeholder.svg?height=400&width=300&text=Sophia"],
    bio: "Artist by day, dancer by night",
    interests: ["Art", "Dancing", "Music"],
    isOnline: false,
    hotScore: 96,
  },
  {
    id: 3,
    name: "Isabella",
    age: 29,
    location: "Miami",
    images: ["/placeholder.svg?height=400&width=300&text=Isabella"],
    bio: "Beach lover and fitness enthusiast",
    interests: ["Fitness", "Beach", "Cooking"],
    isOnline: true,
    hotScore: 94,
  },
]

export default function HotListPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [profiles, setProfiles] = useState(hotProfiles)

  const handleLike = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handlePass = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const currentProfile = profiles[currentIndex]

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Flame className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-bold">Hot List</h2>
        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
          Trending Now
        </Badge>
      </div>

      {/* Profile Card */}
      <div className="relative">
        <Card className="overflow-hidden">
          <div className="relative">
            <Image
              src={currentProfile.images[0] || "/placeholder.svg"}
              alt={currentProfile.name}
              width={400}
              height={500}
              className="w-full h-96 object-cover"
            />

            {/* Online Status */}
            {currentProfile.isOnline && <Badge className="absolute top-4 right-4 bg-green-500">Online</Badge>}

            {/* Hot Score */}
            <div className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">
              <Flame className="h-3 w-3" />
              <span className="text-xs font-bold">{currentProfile.hotScore}</span>
            </div>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold">{currentProfile.name}</h3>
                <span className="text-lg">{currentProfile.age}</span>
              </div>
              <p className="flex items-center text-sm mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                {currentProfile.location}
              </p>
              <p className="text-sm mb-3">{currentProfile.bio}</p>
              <div className="flex flex-wrap gap-1">
                {currentProfile.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-6">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16 border-red-200 hover:bg-red-50 bg-transparent"
            onClick={handlePass}
          >
            <X className="h-6 w-6 text-red-500" />
          </Button>

          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            onClick={handleLike}
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Profile Counter */}
      <div className="text-center text-sm text-muted-foreground">
        {currentIndex + 1} of {profiles.length} hot profiles
      </div>

      {/* Hot List Stats */}
      <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">2.5K</p>
              <p className="text-xs text-muted-foreground">Daily Likes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">89%</p>
              <p className="text-xs text-muted-foreground">Match Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">156</p>
              <p className="text-xs text-muted-foreground">Active Now</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
