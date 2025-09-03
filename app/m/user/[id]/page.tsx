"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, X, MessageCircle, Share, Flag, MapPin, Star, Eye, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const username = params?.id;

  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}user/${username}`
        );
        const data = await res.json();
        if (data.status && data.data) {
          const u = data.data;
          setUserProfile({
            id: u.id,
            name: u.realname || u.username,
            username:u.username,
            age: u.birthdate ? new Date().getFullYear() - new Date(u.birthdate).getFullYear() : "N/A",
            location: "New York, NY", // dummy or from API
            distance: "2 miles away", // dummy or from API
            bio: u.bio || "No bio provided.",
            images: u.albums?.[0]?.photos?.map((p: any) => p.photo_url) || [],
            interests: u.interests || ["Travel", "Yoga", "Photography", "Coffee", "Hiking", "Art", "Music", "Cooking"],
            details: {
              occupation: u.profession || "N/A",
              education: u.education || "N/A",
              height: u.height || "N/A",
              relationshipType: u.looking_for || "N/A",
              children: u.children || "N/A",
              smoking: u.smoking || "N/A",
              drinking: u.drinking || "N/A",
              religion: u.religion || "N/A",
              politics: u.politics || "N/A",
            },
            isOnline: true, // dummy or from API
            verified: true, // dummy or from API
            lastSeen: "Active 2 hours ago", // dummy or from API
            compatibility: 89, // dummy or from API
            mutualConnections: 3, // dummy or from API
          });
        }
      } catch (err) {
        setUserProfile(null);
      }
      setLoading(false);
    }
    if (username) fetchUser();
  }, [username]);

  const handleImageTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    if (x < width / 2) {
      if (currentImageIndex > 0) setCurrentImageIndex(currentImageIndex - 1);
    } else {
      if (userProfile?.images && currentImageIndex < userProfile.images.length - 1) setCurrentImageIndex(currentImageIndex + 1);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not found.</p>
      </div>
    )
  }

  return (
    <div className="pb-20">
      {/* Image Gallery */}
      <div className="relative">
        <div className="relative cursor-pointer" onClick={handleImageTap}>
          <Image
            src={userProfile.images[currentImageIndex] || "/placeholder.svg"}
            alt={`${userProfile.name} photo ${currentImageIndex + 1}`}
            width={400}
            height={500}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-4 left-4 right-4 flex space-x-1">
            {userProfile.images.map((_: string, index: number) => (
              <div
                key={index}
                className={`flex-1 h-1 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>
          <div className="absolute top-4 right-4 flex flex-col space-y-1">
            {userProfile.isOnline && <Badge className="bg-green-500">Online</Badge>}
            {userProfile.verified && (
              <Badge className="bg-blue-500">
                <Star className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded-full">
            <span className="text-sm font-bold">{userProfile.compatibility}% Match</span>
          </div>
        </div>
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {userProfile.name}, {userProfile.age}
              </h1>
              <p className="text-muted-foreground flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {userProfile.distance}
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
          {userProfile.mutualConnections > 0 && (
            <p className="text-sm text-blue-600">{userProfile.mutualConnections} mutual connections</p>
          )}
          <p className="text-sm text-muted-foreground">{userProfile.lastSeen}</p>
        </div>
        <div>
          <p className="text-sm leading-relaxed">{userProfile.bio}</p>
        </div>
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
                  <span className="text-sm">{userProfile.details.occupation}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userProfile.details.education}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userProfile.details.height}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Looking For</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Relationship:</span> {userProfile.details.relationshipType}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Children:</span> {userProfile.details.children}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Smoking:</span> {userProfile.details.smoking}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Drinking:</span> {userProfile.details.drinking}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="interests" className="mt-4">
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest: string) => (
                <Badge key={interest} variant="secondary" className="text-sm py-1 px-3">
                  {interest}
                </Badge>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="photos" className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {userProfile.images.map((image: string, index: number) => (
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
        <div className="flex space-x-3 pt-4">
          <Button variant="outline" className="flex-1 bg-transparent">
            <X className="mr-2 h-4 w-4" />
            Pass
          </Button>
          <Link href={`/m/chat/${userProfile.username}`}>
            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
          </Link>
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
