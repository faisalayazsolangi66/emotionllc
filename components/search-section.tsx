"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Users, Calendar } from "lucide-react"

export function SearchSection() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    gender: "",
    lookingFor: "",
    ageMin: "",
    ageMax: "",
    country: "",
    onlineOnly: false,
    withPhoto: false,
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchData.gender) params.append("gender", searchData.gender)
    if (searchData.lookingFor) params.append("lookingFor", searchData.lookingFor)
    if (searchData.ageMin) params.append("ageMin", searchData.ageMin)
    if (searchData.ageMax) params.append("ageMax", searchData.ageMax)
    if (searchData.country) params.append("country", searchData.country)
    if (searchData.onlineOnly) params.append("onlineOnly", "true")
    if (searchData.withPhoto) params.append("withPhoto", "true")
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="py-16 bg-muted/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Find Your Perfect Match</h3>
            <p className="text-muted-foreground">Use our advanced search to discover compatible partners</p>
          </div>

          <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Gender
                </label>
                <Select
                  value={searchData.gender}
                  onValueChange={(value) => setSearchData({ ...searchData, gender: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Looking For */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Looking For</label>
                <Select
                  value={searchData.lookingFor}
                  onValueChange={(value) => setSearchData({ ...searchData, lookingFor: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Relationship type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendship">Friendship</SelectItem>
                    <SelectItem value="dating">Dating</SelectItem>
                    <SelectItem value="relationship">Relationship</SelectItem>
                    <SelectItem value="marriage">Marriage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Age Range
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={searchData.ageMin}
                    onChange={(e) => setSearchData({ ...searchData, ageMin: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={searchData.ageMax}
                    onChange={(e) => setSearchData({ ...searchData, ageMax: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Country
                </label>
                <Select
                  value={searchData.country}
                  onValueChange={(value) => setSearchData({ ...searchData, country: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="online-only"
                  checked={searchData.onlineOnly}
                  onCheckedChange={(checked) => setSearchData({ ...searchData, onlineOnly: checked as boolean })}
                />
                <label htmlFor="online-only" className="text-sm text-muted-foreground">
                  Online only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="with-photo"
                  checked={searchData.withPhoto}
                  onCheckedChange={(checked) => setSearchData({ ...searchData, withPhoto: checked as boolean })}
                />
                <label htmlFor="with-photo" className="text-sm text-muted-foreground">
                  With photo
                </label>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-3 text-lg font-semibold rounded-full"
                onClick={handleSearch}
              >
                <Search className="mr-2 w-5 h-5" />
                Search Matches
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
