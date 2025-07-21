"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"

const searchResults = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    image: "/placeholder.svg?height=300&width=300&text=Sarah",
    location: "New York, NY",
    distance: "2 miles",
    bio: "Love hiking, cooking, and exploring new places.",
    interests: ["Travel", "Cooking", "Hiking"],
    isOnline: true,
    compatibility: 95,
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 32,
    image: "/placeholder.svg?height=300&width=300&text=Michael",
    location: "San Francisco, CA",
    distance: "5 miles",
    bio: "Software engineer who loves music and art.",
    interests: ["Music", "Art", "Technology"],
    isOnline: false,
    compatibility: 87,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    age: 26,
    image: "/placeholder.svg?height=300&width=300&text=Emma",
    location: "Los Angeles, CA",
    distance: "3 miles",
    bio: "Yoga instructor and wellness enthusiast.",
    interests: ["Yoga", "Wellness", "Nature"],
    isOnline: true,
    compatibility: 92,
  },
]

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [ageRange, setAgeRange] = useState([18, 65])
  const [distance, setDistance] = useState([50])
  const [filters, setFilters] = useState({
    gender: "",
    lookingFor: "",
    location: "",
    education: "",
    profession: "",
    interests: [] as string[],
    onlineOnly: false,
    withPhotos: true,
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Advanced Search</h1>
            <p className="text-muted-foreground">Find exactly who you're looking for</p>
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide" : "Show"} Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Search Filters</h3>

                <div className="space-y-6">
                  {/* Basic Filters */}
                  <div className="space-y-4">
                    <div>
                      <Label>Gender</Label>
                      <Select
                        value={filters.gender}
                        onValueChange={(value) => setFilters({ ...filters, gender: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Looking For</Label>
                      <Select
                        value={filters.lookingFor}
                        onValueChange={(value) => setFilters({ ...filters, lookingFor: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="friendship">Friendship</SelectItem>
                          <SelectItem value="dating">Dating</SelectItem>
                          <SelectItem value="relationship">Relationship</SelectItem>
                          <SelectItem value="marriage">Marriage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Location</Label>
                      <Input
                        placeholder="City, State"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Age Range */}
                  <div>
                    <Label>
                      Age Range: {ageRange[0]} - {ageRange[1]}
                    </Label>
                    <Slider value={ageRange} onValueChange={setAgeRange} max={65} min={18} step={1} className="mt-2" />
                  </div>

                  {/* Distance */}
                  <div>
                    <Label>Distance: {distance[0]} miles</Label>
                    <Slider value={distance} onValueChange={setDistance} max={100} min={1} step={1} className="mt-2" />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="online-only"
                        checked={filters.onlineOnly}
                        onCheckedChange={(checked) => setFilters({ ...filters, onlineOnly: checked as boolean })}
                      />
                      <Label htmlFor="online-only">Online only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="with-photos"
                        checked={filters.withPhotos}
                        onCheckedChange={(checked) => setFilters({ ...filters, withPhotos: checked as boolean })}
                      />
                      <Label htmlFor="with-photos">With photos</Label>
                    </div>
                  </div>

                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    <Search className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Search Results */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">{searchResults.length} results found</p>
              <Select defaultValue="compatibility">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compatibility">Best Match</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="recent">Recently Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {searchResults.map((person) => (
                <Card key={person.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      className="w-full h-64 object-cover"
                    />
                    {person.isOnline && (
                      <div className="absolute top-3 right-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {person.compatibility}% Match
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <Link href={`/user/${person.id}`}>
                          <h3 className="font-semibold text-lg">
                            {person.name}, {person.age}
                          </h3>
                        </Link>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {person.location} • {person.distance}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{person.bio}</p>

                      <div className="flex flex-wrap gap-1">
                        {person.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Heart className="h-4 w-4 mr-1" />
                          Like
                        </Button>
                        <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
