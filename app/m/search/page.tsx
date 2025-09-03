"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Heart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost/api/"
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_FILES_URL || "https://www.emotionsllc.com/ow_userfiles/plugins/base/"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [ageRange, setAgeRange] = useState([22, 35])
  const [distance, setDistance] = useState([50])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    gender: "",
    lookingFor: "",
    onlineOnly: false,
    withPhotos: true,
    country: "",
  })
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append("page", "1")
      params.append("limit", "20")
      if (searchQuery) params.append("search", searchQuery)
      if (filters.gender) {
        params.append("gender", filters.gender === "male" ? "1" : filters.gender === "female" ? "2" : filters.gender)
      }
      if (filters.lookingFor) params.append("looking_for", filters.lookingFor)
      if (filters.withPhotos) params.append("with_photo", "yes")
      if (filters.onlineOnly) params.append("online_only", "yes")
      if (filters.country) params.append("country", filters.country)
      if (ageRange) {
        params.append("age_range[min]", ageRange[0].toString())
        params.append("age_range[max]", ageRange[1].toString())
      }
      // You can add distance param if API supports it

      const res = await fetch(`${BASE_URL}users?${params.toString()}`)
      const json = await res.json()
      if (json.status) {
        setSearchResults(json.data.data)
      } else {
        setSearchResults([])
      }
    } catch (err) {
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch users when filters/search change
  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, ageRange, searchQuery])

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
                <label className="text-sm font-medium mb-2 block">Gender</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={filters.gender}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Looking For</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={filters.lookingFor}
                  onChange={(e) => setFilters({ ...filters, lookingFor: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Country</label>
                <Input
                  value={filters.country}
                  onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                  placeholder="Country"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Age Range</label>
                <Slider value={ageRange} onValueChange={setAgeRange} max={95} min={22} step={1} className="mb-2" />
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
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={filters.onlineOnly}
                      onChange={(e) => setFilters({ ...filters, onlineOnly: e.target.checked })}
                    />
                    <span className="text-sm">Online now</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={filters.withPhotos}
                      onChange={(e) => setFilters({ ...filters, withPhotos: e.target.checked })}
                    />
                    <span className="text-sm">Has photos</span>
                  </label>
                </div>
              </div>
              <Button className="w-full" onClick={() => { setIsFilterOpen(false); fetchUsers(); }}>
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {loading ? "Loading..." : `${searchResults.length} profiles found`}
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-2 gap-3">
        {searchResults.map((user: any) => (
          <Link key={user.id} href={`/m/user/${user.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <Image
                  src={
                    user.photo_url ||
                    IMAGE_BASE_URL + "avatars/avatar_big_" + user.id + "_" + (user.avatar_hash || "") + ".jpg"
                  }
                  alt={user.realname || user.username}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />

                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {user.is_online && <Badge className="bg-green-500 text-xs px-1 py-0">Online</Badge>}
                  {user.is_verified && (
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
                  <h3 className="font-semibold text-sm">{user.realname || user.username}</h3>
                  <span className="text-sm text-muted-foreground">{user.match_age || user.age}</span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  {user.city || user.location || "Unknown Location"}
                </p>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{user.bio || "No bio available"}</p>
                <div className="flex flex-wrap gap-1">
                  {(user.interests || []).slice(0, 2).map((interest: string) => (
                    <Badge key={interest} variant="secondary" className="text-xs px-1 py-0">
                      {interest}
                    </Badge>
                  ))}
                  {user.interests && user.interests.length > 2 && (
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
