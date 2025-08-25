"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, MapPin, Calendar, Search, Plus, Star } from "lucide-react"

const groups = [
  {
    id: 1,
    name: "NYC Hiking Adventures",
    description: "Join us for weekend hikes around New York and nearby areas. All skill levels welcome!",
    image: "/placeholder.svg?height=200&width=400&text=Hiking+Group",
    members: 234,
    location: "New York, NY",
    category: "Outdoor",
    isPrivate: false,
    nextEvent: "Weekend Hike - Central Park",
    nextEventDate: "2024-02-17",
    rating: 4.8,
    tags: ["hiking", "outdoor", "fitness", "nature"],
    admin: "HikingLeader",
  },
  {
    id: 2,
    name: "Foodies & Wine Lovers",
    description: "Explore the best restaurants, wine bars, and culinary experiences in the city.",
    image: "/placeholder.svg?height=200&width=400&text=Food+Group",
    members: 567,
    location: "New York, NY",
    category: "Food & Drink",
    isPrivate: false,
    nextEvent: "Wine Tasting at Vintage Bar",
    nextEventDate: "2024-02-20",
    rating: 4.9,
    tags: ["food", "wine", "restaurants", "culinary"],
    admin: "FoodieExpert",
  },
  {
    id: 3,
    name: "Book Club & Literary Discussions",
    description: "Monthly book discussions, author meetups, and literary events for book enthusiasts.",
    image: "/placeholder.svg?height=200&width=400&text=Book+Club",
    members: 189,
    location: "Manhattan, NY",
    category: "Arts & Culture",
    isPrivate: false,
    nextEvent: "February Book Discussion",
    nextEventDate: "2024-02-25",
    rating: 4.7,
    tags: ["books", "reading", "literature", "discussion"],
    admin: "BookwormBella",
  },
  {
    id: 4,
    name: "Tech Professionals Network",
    description: "Connect with fellow tech professionals, share insights, and attend industry events.",
    image: "/placeholder.svg?height=200&width=400&text=Tech+Group",
    members: 445,
    location: "San Francisco, CA",
    category: "Professional",
    isPrivate: false,
    nextEvent: "Tech Networking Mixer",
    nextEventDate: "2024-02-22",
    rating: 4.6,
    tags: ["tech", "networking", "professional", "career"],
    admin: "TechLeader",
  },
  {
    id: 5,
    name: "Fitness & Wellness Warriors",
    description: "Group workouts, wellness challenges, and healthy lifestyle discussions.",
    image: "/placeholder.svg?height=200&width=400&text=Fitness+Group",
    members: 334,
    location: "Los Angeles, CA",
    category: "Health & Fitness",
    isPrivate: false,
    nextEvent: "Group Yoga Session",
    nextEventDate: "2024-02-18",
    rating: 4.8,
    tags: ["fitness", "wellness", "yoga", "health"],
    admin: "FitnessFanatic",
  },
  {
    id: 6,
    name: "Photography Enthusiasts",
    description: "Share your photos, learn new techniques, and join photo walks around the city.",
    image: "/placeholder.svg?height=200&width=400&text=Photo+Group",
    members: 278,
    location: "Chicago, IL",
    category: "Arts & Culture",
    isPrivate: false,
    nextEvent: "Downtown Photo Walk",
    nextEventDate: "2024-02-19",
    rating: 4.7,
    tags: ["photography", "art", "creative", "photo-walk"],
    admin: "PhotoPro",
  },
]

const categories = ["All", "Outdoor", "Food & Drink", "Arts & Culture", "Professional", "Health & Fitness", "Social"]

export default function GroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popular")

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || group.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Interest Groups</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join groups based on your interests and connect with like-minded people in your area.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="members">Most Members</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/groups/create">
              <Button className="bg-red-500 hover:bg-red-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </Link>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={group.image || "/placeholder.svg"} alt={group.name} className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">{group.category}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="flex items-center bg-black/50 text-white px-2 py-1 rounded">
                    <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                    <span className="text-sm">{group.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">
                      <Link href={`/groups/${group.id}`} className="hover:text-red-500 transition-colors">
                        {group.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {group.members} members
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {group.location}
                    </div>
                    {group.nextEvent && (
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {group.nextEvent}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {group.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-xs text-muted-foreground">Admin: {group.admin}</div>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600">
                      Join Group
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No groups found</h3>
            <p className="text-muted-foreground">Try adjusting your search or browse different categories.</p>
          </div>
        )}

        {/* Create Group CTA */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
            <h3 className="text-2xl font-bold mb-4">Start Your Own Group</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have a unique interest or hobby? Create your own group and bring together people who share your passion.
            </p>
            <Link href="/groups/create">
              <Button size="lg" className="bg-red-500 hover:bg-red-600">
                <Plus className="h-4 w-4 mr-2" />
                Create New Group
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
