"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, MapPin, Calendar, Share2, Flag, Camera, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

const userProfile = {
  id: 1,
  name: "Sarah Johnson",
  age: 28,
  location: "New York, NY",
  distance: "2 miles away",
  bio: "Adventure seeker, coffee enthusiast, and book lover. Looking for someone to explore the city with and share meaningful conversations. I believe in living life to the fullest and making every moment count. Love hiking on weekends, trying new restaurants, and getting lost in a good book.",
  images: [
    "/placeholder.svg?height=600&width=400&text=Sarah+1",
    "/placeholder.svg?height=600&width=400&text=Sarah+2",
    "/placeholder.svg?height=600&width=400&text=Sarah+3",
    "/placeholder.svg?height=600&width=400&text=Sarah+4",
    "/placeholder.svg?height=600&width=400&text=Sarah+5",
    "/placeholder.svg?height=600&width=400&text=Sarah+6",
  ],
  interests: ["Travel", "Photography", "Hiking", "Cooking", "Music", "Art", "Fitness", "Reading", "Coffee", "Nature"],
  details: {
    height: "5'6\"",
    education: "Master's Degree",
    profession: "Marketing Manager",
    company: "Creative Agency NYC",
    smoking: "Never",
    drinking: "Socially",
    relationshipType: "Long-term relationship",
    children: "Want someday",
    pets: "Love dogs",
    languages: ["English", "French", "Spanish"],
    religion: "Spiritual",
    politics: "Liberal",
    personalityType: "Extrovert",
  },
  compatibility: 95,
  mutualFriends: 3,
  mutualInterests: 7,
  lastActive: "Active 2 hours ago",
  isOnline: false,
  isVerified: true,
  joinDate: "Member since January 2023",
  photos: {
    total: 6,
    recent: [
      { url: "/placeholder.svg?height=150&width=150&text=Recent+1", caption: "Hiking in Central Park" },
      { url: "/placeholder.svg?height=150&width=150&text=Recent+2", caption: "Coffee art attempt" },
      { url: "/placeholder.svg?height=150&width=150&text=Recent+3", caption: "Book club meeting" },
    ],
  },
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/meet">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Discovery
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Photos */}
            <div className="space-y-6">
              {/* Main Photo */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={userProfile.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${userProfile.name} ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover"
                  />
                  {userProfile.isOnline && (
                    <div className="absolute top-3 right-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  )}
                  {userProfile.isVerified && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-blue-500 text-white">
                        ✓ Verified
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      {currentImageIndex + 1} / {userProfile.images.length}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Photo Thumbnails */}
              <div className="grid grid-cols-3 gap-2">
                {userProfile.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? "border-red-500" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Compatibility Score */}
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">{userProfile.compatibility}%</div>
                  <p className="text-sm text-muted-foreground mb-4">Compatibility Match</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mutual Interests</span>
                      <span className="font-semibold">{userProfile.mutualInterests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mutual Friends</span>
                      <span className="font-semib">{userProfile.mutualFriends}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        {userProfile.name}, {userProfile.age}
                      </h1>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {userProfile.location} • {userProfile.distance}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {userProfile.lastActive}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex-1 ${isLiked ? "bg-red-500 hover:bg-red-600" : "bg-red-500 hover:bg-red-600"}`}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                      {isLiked ? "Liked!" : "Like"}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs Content */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="interests">Interests</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">About Me</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{userProfile.bio}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Looking For</h4>
                          <p className="text-sm text-muted-foreground">{userProfile.details.relationshipType}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Languages</h4>
                          <div className="flex flex-wrap gap-1">
                            {userProfile.details.languages.map((lang) => (
                              <Badge key={lang} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Quick Facts</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold text-red-500">{userProfile.details.height}</div>
                          <div className="text-xs text-muted-foreground">Height</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold text-blue-500">{userProfile.details.education}</div>
                          <div className="text-xs text-muted-foreground">Education</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold text-green-500">{userProfile.details.profession}</div>
                          <div className="text-xs text-muted-foreground">Career</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="interests" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Interests & Hobbies</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {userProfile.interests.map((interest) => (
                          <div
                            key={interest}
                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
                          >
                            <span className="text-sm font-medium text-red-600">{interest}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Shared Interests</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You both love: Travel, Photography, Hiking, Cooking, Music, Art, Reading
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="photos" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Recent Photos</h3>
                        <Badge variant="outline">{userProfile.photos.total} photos</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userProfile.photos.recent.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={photo.url || "/placeholder.svg"}
                              alt={photo.caption}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-white text-sm font-medium drop-shadow-lg">{photo.caption}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-6">
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          View All Photos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Personal Details</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Profession</h4>
                            <p className="font-medium">{userProfile.details.profession}</p>
                            <p className="text-sm text-muted-foreground">{userProfile.details.company}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Education</h4>
                            <p className="font-medium">{userProfile.details.education}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Smoking</h4>
                            <p className="font-medium">{userProfile.details.smoking}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Drinking</h4>
                            <p className="font-medium">{userProfile.details.drinking}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Children</h4>
                            <p className="font-medium">{userProfile.details.children}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Religion</h4>
                            <p className="font-medium">{userProfile.details.religion}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Politics</h4>
                            <p className="font-medium">{userProfile.details.politics}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">Personality</h4>
                            <p className="font-medium">{userProfile.details.personalityType}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Member Info</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Member Since</span>
                          <span className="font-medium">January 2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Profile Views</span>
                          <span className="font-medium">1,234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Response Rate</span>
                          <span className="font-medium text-green-600">95%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
