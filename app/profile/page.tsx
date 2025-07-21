"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Heart, MessageCircle, Camera, Edit, Settings } from "lucide-react"
import Link from "next/link"

const userProfile = {
  name: "Alex Johnson",
  age: 29,
  location: "New York, NY",
  bio: "Adventure seeker, coffee enthusiast, and book lover. Looking for someone to explore the city with and share meaningful conversations. I believe in living life to the fullest and making every moment count.",
  images: [
    "/placeholder.svg?height=400&width=300&text=Profile+1",
    "/placeholder.svg?height=400&width=300&text=Profile+2",
    "/placeholder.svg?height=400&width=300&text=Profile+3",
    "/placeholder.svg?height=400&width=300&text=Profile+4",
  ],
  interests: ["Travel", "Photography", "Hiking", "Cooking", "Music", "Art", "Fitness", "Reading"],
  details: {
    height: "5'10\"",
    education: "Master's Degree",
    profession: "Software Engineer",
    smoking: "Never",
    drinking: "Socially",
    relationshipType: "Long-term relationship",
    children: "Want someday",
    pets: "Love dogs",
    languages: ["English", "Spanish"],
  },
  stats: {
    profileViews: 1234,
    likes: 89,
    matches: 47,
    joinDate: "January 2023",
  },
}

export default function ProfilePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <div className="flex gap-2">
              <Link href="/profile/edit">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link href="/profile/settings">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Photos */}
            <div className="space-y-6">
              {/* Main Photo */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={userProfile.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`Profile ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover"
                  />
                  <Button variant="secondary" size="icon" className="absolute top-3 right-3">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              {/* Photo Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
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

              {/* Profile Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile Views</span>
                    <span className="font-semibold">{userProfile.stats.profileViews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likes Received</span>
                    <span className="font-semibold">{userProfile.stats.likes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Matches</span>
                    <span className="font-semibold">{userProfile.stats.matches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-semibold">{userProfile.stats.joinDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Profile Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="about" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="interests">Interests</TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="space-y-6 mt-6">
                      {/* Basic Info */}
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          {userProfile.name}, {userProfile.age}
                        </h2>
                        <div className="flex items-center text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          {userProfile.location}
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <h3 className="font-semibold mb-2">About Me</h3>
                        <p className="text-muted-foreground leading-relaxed">{userProfile.bio}</p>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-red-500 hover:bg-red-600">
                          <Heart className="h-4 w-4 mr-2" />
                          Like Profile
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="space-y-6 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Height</h4>
                            <p>{userProfile.details.height}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Education</h4>
                            <p>{userProfile.details.education}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Profession</h4>
                            <p>{userProfile.details.profession}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Smoking</h4>
                            <p>{userProfile.details.smoking}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Drinking</h4>
                            <p>{userProfile.details.drinking}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Looking For</h4>
                            <p>{userProfile.details.relationshipType}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Children</h4>
                            <p>{userProfile.details.children}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Pets</h4>
                            <p>{userProfile.details.pets}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-muted-foreground">Languages</h4>
                            <div className="flex gap-2">
                              {userProfile.details.languages.map((language) => (
                                <Badge key={language} variant="outline">
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="interests" className="space-y-6 mt-6">
                      <div>
                        <h3 className="font-semibold mb-4">My Interests</h3>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.interests.map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-sm py-2 px-3">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Compatibility Insights */}
                      <div>
                        <h3 className="font-semibold mb-4">What I'm Looking For</h3>
                        <div className="space-y-3 text-muted-foreground">
                          <p>• Someone who shares my love for adventure and trying new things</p>
                          <p>• A partner who values deep conversations and genuine connections</p>
                          <p>• Someone who enjoys both quiet nights in and exciting nights out</p>
                          <p>• A person who is kind, ambitious, and has a good sense of humor</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
