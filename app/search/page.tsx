"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost/api/"
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_FILES_URL || "https://www.emotionsllc.com/ow_userfiles/plugins/base/"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [ageRange, setAgeRange] = useState([21, 30])
  const [distance, setDistance] = useState([50])
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [filters, setFilters] = useState({
    gender: "",
    lookingFor: "",
    location: "",
    onlineOnly: false,
    withPhotos: true,
    ageMin: "",
    ageMax: "",
    country: "",
  })

  // Read filters from query string on mount
  useEffect(() => {
    const gender = searchParams.get("gender") || ""
    const lookingFor = searchParams.get("lookingFor") || ""
    const onlineOnly = searchParams.get("onlineOnly") === "true"
    const withPhotos = searchParams.get("withPhoto") === "true"
    const ageMin = searchParams.get("ageMin") || ""
    const ageMax = searchParams.get("ageMax") || ""
    const country = searchParams.get("country") || ""
    setFilters({
      gender,
      lookingFor,
      location: "",
      onlineOnly,
      withPhotos,
      ageMin,
      ageMax,
      country,
    })
    // Set age range if provided
    if (ageMin && ageMax) {
      setAgeRange([parseInt(ageMin), parseInt(ageMax)])
    }
  }, [searchParams])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append("page", "1")
      params.append("limit", "20")

      if (filters.gender) {
        params.append("gender", filters.gender === "male" ? "1" : filters.gender === "female" ? "2" : filters.gender)
      }
      if (filters.lookingFor) {
        params.append("looking_for", filters.lookingFor)
      }
      if (filters.withPhotos) {
        params.append("with_photo", "yes")
      }
      if (filters.onlineOnly) {
        params.append("online_only", "yes")
      }
      if (filters.country) {
        params.append("country", filters.country)
      }
      if (ageRange) {
        params.append("age_range[min]", ageRange[0].toString())
        params.append("age_range[max]", ageRange[1].toString())
      }

      const res = await fetch(`${BASE_URL}users?${params.toString()}`)
      const json = await res.json()

      if (json.status) {
        setSearchResults(json.data.data)
      } else {
        setSearchResults([])
      }
    } catch (err) {
      console.error("Error fetching users:", err)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch users when filters change
  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, ageRange])

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
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Age Range */}
                  <div>
                    <Label>
                      Age Range: {ageRange[0]} - {ageRange[1]}
                    </Label>
                    <Slider value={ageRange} onValueChange={setAgeRange} max={95} min={22} step={1} className="mt-2" />
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

                  <Button onClick={fetchUsers} className="w-full bg-red-500 hover:bg-red-600">
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
              <p className="text-muted-foreground">
                {loading ? "Loading..." : `${searchResults.length} results found`}
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {searchResults.map((person: any) => (
                <Card key={person.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={IMAGE_BASE_URL+"avatars/avatar_big_"+person.id+"_"+person.avatar_hash+".jpg" || "/placeholder.svg"}
                      alt={person.realname}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="bg-black/50 text-white">
                        {person.match_age} yrs
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <Link href={`/user/${person.username}`}>
                          <h3 className="font-semibold text-lg">
                            {person.realname}, {person.match_age}
                          </h3>
                        </Link>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {/* If API has location fields, use them here */}
                          Unknown Location
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{person.bio || "No bio available"}</p>

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
