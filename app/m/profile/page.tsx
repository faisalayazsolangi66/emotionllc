"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Settings, Crown, Heart, Eye, MessageSquare, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const userProfile = {
  name: "Alex Johnson",
  age: 28,
  location: "New York, NY",
  bio: "Adventure seeker, coffee enthusiast, and yoga lover. Always looking for new experiences and meaningful connections.",
  images: [
    "/placeholder.svg?height=300&width=300&text=Profile1",
    "/placeholder.svg?height=300&width=300&text=Profile2",
    "/placeholder.svg?height=300&width=300&text=Profile3",
    "/placeholder.svg?height=300&width=300&text=Profile4",
  ],
  interests: ["Travel", "Yoga", "Photography", "Coffee", "Hiking", "Art"],
  stats: {
    profileViews: 1247,
    likes: 89,
    matches: 23,
    messages: 156,
  },
  isPremium: true,
  isVerified: true,
}

export default function MobileProfilePage() {
  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="relative">
          <Image
            src={userProfile.images[0] || "/placeholder.svg"}
            alt="Profile"
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />

          {/* Status Badges */}
          <div className="absolute top-4 right-4 flex flex-col space-y-1">
            {userProfile.isPremium && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
            {userProfile.isVerified && (
              <Badge className="bg-blue-500">
                <Star className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          {/* Edit Button */}
          <Link href="/m/profile/edit">
            <Button size="sm" className="absolute bottom-4 right-4 rounded-full">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </Link>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-muted-foreground">
                {userProfile.age} • {userProfile.location}
              </p>
            </div>
          </div>

          <p className="text-sm mb-4">{userProfile.bio}</p>

          <div className="flex flex-wrap gap-1">
            {userProfile.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Photos</h3>
        <div className="grid grid-cols-3 gap-2">
          {userProfile.images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Photo ${index + 1}`}
                width={120}
                height={120}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Profile Stats */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Profile Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Eye className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-2xl font-bold">{userProfile.stats.profileViews}</span>
              </div>
              <p className="text-xs text-muted-foreground">Profile Views</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Heart className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-2xl font-bold">{userProfile.stats.likes}</span>
              </div>
              <p className="text-xs text-muted-foreground">Likes Received</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-2xl font-bold">{userProfile.stats.matches}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total Matches</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <MessageSquare className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-2xl font-bold">{userProfile.stats.messages}</span>
              </div>
              <p className="text-xs text-muted-foreground">Messages Sent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/m/profile/edit">
          <Button variant="outline" className="w-full h-12 bg-transparent">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
        <Link href="/m/settings">
          <Button variant="outline" className="w-full h-12 bg-transparent">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>

      {/* Premium Features */}
      {!userProfile.isPremium && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Upgrade to Premium</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get unlimited likes, see who liked you, and boost your profile!
            </p>
            <Link href="/m/subscription">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                Upgrade Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
