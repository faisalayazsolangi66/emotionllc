"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Settings, Crown, Heart, Eye, MessageSquare, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function getTokenFromCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || ""
  return ""
}

export default function MobileProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    profileViews: 0,
    likes: 0,
    matches: 0,
    messages: 0,
  })
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const token = getTokenFromCookie("token")
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        const data = await res.json()
        if (res.ok && data.status && data.data) {
          setUser(data.data)
          // Get images from albums/photos
          let imgs: string[] = []
          if (Array.isArray(data.data.albums)) {
            data.data.albums.forEach((album: any) => {
              if (Array.isArray(album.photos)) {
                album.photos.forEach((photo: any) => {
                  if (photo.hash) imgs.push(photo.hash)
                  else if (photo.photo_url) imgs.push(photo.photo_url)
                })
              }
            })
          }
          // Fallback to avatar/photo_url
          if (imgs.length === 0 && data.data.photo_url) imgs.push(data.data.photo_url)
          setImages(imgs)
        }
      } catch {
        setUser(null)
        setImages([])
      }
      setLoading(false)
    }

    const fetchStats = async () => {
      const token = getTokenFromCookie("token")
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/dashboard/stats`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        const data = await res.json()
        if (res.ok && data.status && data.data) {
          setStats((prev) => ({
            ...prev,
            profileViews: data.data.profile_views,
            matches: data.data.total_matches,
            messages: 0, // will update below
          }))
        }
      } catch {}
      // Get messages count
      try {
        const token = getTokenFromCookie("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}my-chats`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        const data = await res.json()
        if (res.ok && Array.isArray(data.chats)) {
          setStats((prev) => ({
            ...prev,
            messages: data.chats.length,
          }))
        }
      } catch {}
    }

    fetchUser()
    fetchStats()
  }, [])

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="relative">
          <Image
            src={images[0] || user.photo_url || "/placeholder.svg"}
            alt="Profile"
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />

          {/* Status Badges */}
          <div className="absolute top-4 right-4 flex flex-col space-y-1">
            {user.isPremium && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
                <Crown className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
            {user.is_verified && (
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
              <h2 className="text-2xl font-bold">{user.realname || user.first_name + " " + user.last_name}</h2>
              <p className="text-muted-foreground">
                {user.birthdate ? new Date().getFullYear() - new Date(user.birthdate).getFullYear() : ""} • {user.city}, {user.state}
              </p>
            </div>
          </div>

          <p className="text-sm mb-4">{user.bio || "No bio available."}</p>

          <div className="flex flex-wrap gap-1">
            {(user.interests || []).map((interest: string) => (
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
          {images.map((image, index) => (
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
                <span className="text-2xl font-bold">{stats.profileViews}</span>
              </div>
              <p className="text-xs text-muted-foreground">Profile Views</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Heart className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-2xl font-bold">{stats.likes}</span>
              </div>
              <p className="text-xs text-muted-foreground">Likes Received</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-2xl font-bold">{stats.matches}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total Matches</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <MessageSquare className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-2xl font-bold">{stats.messages}</span>
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
      {!user.isPremium && (
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
