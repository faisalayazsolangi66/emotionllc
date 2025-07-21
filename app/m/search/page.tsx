"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Heart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const searchResults = [
  {
    id: 1,
    name: "Emma",
    age: 25,
    location: "New York",
    distance: "2 miles away",
    image: "/placeholder.svg?height=200&width=200&text=Emma",
    bio: "Love hiking and good coffee",
    interests: ["Hiking", "Coffee", "Books"],
    isOnline: true,
    verified: true,
  },
  {
    id: 2,
    name: "Olivia",
    age: 27,
    location: "Brooklyn",
    distance: "5 miles away",
    image: "/placeholder.svg?height=200&width=200&text=Olivia",
    bio: "Artist and yoga instructor",
    interests: ["Art", "Yoga", "Travel"],
    isOnline: false,
    verified: true,
  },
  {
    id: 3,
    name: "Ava",
    age: 24,
    location: "Manhattan",
    distance: "3 miles away",
    image: "/placeholder.svg?height=200&width=200&text=Ava",
    bio: "Foodie and adventure seeker",
    interests: ["Food", "Adventure", "Photography"],
    isOnline: true,
    verified: false,
  },
  {
    id: 4,
    name: "Mia",
    age: 26,
    location: "Queens",
    distance: "8 miles away",
    image: "/placeholder.svg?height=200&width=200&text=Mia",
    bio: "Dancer and music lover",
    interests: ["Dancing", "Music", "Fitness"],
    isOnline: true,
    verified: true,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [ageRange, setAgeRange] = useState([18, 35])
  const [distance, setDistance] = useState([10])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredResults = searchResults.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Search Header */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Search Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Age Range</label>
                <Slider value={ageRange} onValueChange={setAgeRange} max={50} min={18} step={1} className="mb-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{ageRange[0]} years</span>
                  <span>{ageRange[1]} years</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Distance</label>
                <Slider value={distance} onValueChange={setDistance} max={50} min={1} step={1} className="mb-2" />
                <div className="text-sm text-muted-foreground">Within {distance[0]} miles</div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Preferences</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Online now</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Verified profiles only</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Has photos</span>
                  </label>
                </div>
              </div>

              <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">{filteredResults.length} profiles found</div>

      {/* Search Results */}
      <div className="grid grid-cols-2 gap-3">
        {filteredResults.map((user) => (
          <Link key={user.id} href={`/m/user/${user.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <Image
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />

                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {user.isOnline && <Badge className="bg-green-500 text-xs px-1 py-0">Online</Badge>}
                  {user.verified && (
                    <Badge className="bg-blue-500 text-xs px-1 py-0">
                      <Star className="h-2 w-2 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Like Button */}
                <Button
                  size="sm"
                  className="absolute top-2 right-2 rounded-full w-8 h-8 p-0 bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                  variant="ghost"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-3">
                <div className="flex items-center space-x-1 mb-1">
                  <h3 className="font-semibold text-sm">{user.name}</h3>
                  <span className="text-sm text-muted-foreground">{user.age}</span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  {user.distance}
                </p>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{user.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {user.interests.slice(0, 2).map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs px-1 py-0">
                      {interest}
                    </Badge>
                  ))}
                  {user.interests.length > 2 && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      +{user.interests.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
