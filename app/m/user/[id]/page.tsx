"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, X, MessageCircle, Share, Flag, MapPin, Star, Eye, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"

// Mock user data - in real app this would come from params
const userData = {
  id: 1,
  name: "Sarah Johnson",
  age: 28,
  location: "New York, NY",
  distance: "2 miles away",
  bio: "Adventure seeker, coffee enthusiast, and yoga lover. Always looking for new experiences and meaningful connections. Love exploring the city and trying new restaurants!",
  images: [
    "/placeholder.svg?height=500&width=400&text=Sarah1",
    "/placeholder.svg?height=500&width=400&text=Sarah2",
    "/placeholder.svg?height=500&width=400&text=Sarah3",
    "/placeholder.svg?height=500&width=400&text=Sarah4",
    "/placeholder.svg?height=500&width=400&text=Sarah5",
  ],
  interests: ["Travel", "Yoga", "Photography", "Coffee", "Hiking", "Art", "Music", "Cooking"],
  details: {
    occupation: "Marketing Manager",
    education: "Bachelor's in Communications",
    height: "5'6\"",
    relationshipType: "Long-term relationship",
    children: "Want someday",
    smoking: "Never",
    drinking: "Socially",
    religion: "Spiritual",
    politics: "Liberal",
  },
  isOnline: true,
  verified: true,
  lastSeen: "Active 2 hours ago",
  compatibility: 89,
  mutualConnections: 3,
}

export default function UserProfilePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

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
      if (currentImageIndex < userData.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1)
      }
    }
  }

  return (
    <div className="pb-20">
      {/* Image Gallery */}
      <div className="relative">
        <div className="relative cursor-pointer" onClick={handleImageTap}>
          <Image
            src={userData.images[currentImageIndex] || "/placeholder.svg"}
            alt={`${userData.name} photo ${currentImageIndex + 1}`}
            width={400}
            height={500}
            className="w-full h-96 object-cover"
          />

          {/* Image Indicators */}
          <div className="absolute top-4 left-4 right-4 flex space-x-1">
            {userData.images.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-1 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>

          {/* Status Badges */}
          <div className="absolute top-4 right-4 flex flex-col space-y-1">
            {userData.isOnline && <Badge className="bg-green-500">Online</Badge>}
            {userData.verified && (
              <Badge className="bg-blue-500">
                <Star className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Compatibility Score */}
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded-full">
            <span className="text-sm font-bold">{userData.compatibility}% Match</span>
          </div>
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-12 h-12 bg-white/90 hover:bg-white border-red-200"
          >
            <X className="h-5 w-5 text-red-500" />
          </Button>

          <Button
            size="lg"
            className={`rounded-full w-12 h-12 ${
              isLiked
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-4 space-y-4">
        {/* Basic Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {userData.name}, {userData.age}
              </h1>
              <p className="text-muted-foreground flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {userData.distance}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Share className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {userData.mutualConnections > 0 && (
            <p className="text-sm text-blue-600">{userData.mutualConnections} mutual connections</p>
          )}

          <p className="text-sm text-muted-foreground">{userData.lastSeen}</p>
        </div>

        {/* Bio */}
        <div>
          <p className="text-sm leading-relaxed">{userData.bio}</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.details.occupation}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.details.education}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.details.height}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Looking For</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Relationship:</span> {userData.details.relationshipType}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Children:</span> {userData.details.children}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Smoking:</span> {userData.details.smoking}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Drinking:</span> {userData.details.drinking}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interests" className="mt-4">
            <div className="flex flex-wrap gap-2">
              {userData.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="text-sm py-1 px-3">
                  {interest}
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {userData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square cursor-pointer"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Photo ${index + 1}`}
                    width={200}
                    height={200}
                    className={`w-full h-full object-cover rounded-lg ${
                      currentImageIndex === index ? "ring-2 ring-primary" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button variant="outline" className="flex-1 bg-transparent">
            <X className="mr-2 h-4 w-4" />
            Pass
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <MessageCircle className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button
            className={`flex-1 ${
              isLiked
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {isLiked ? "Liked" : "Like"}
          </Button>
        </div>
      </div>
    </div>
  )
}
