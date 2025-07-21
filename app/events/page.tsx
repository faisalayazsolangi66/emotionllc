"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Search, Filter } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Speed Dating Night - Downtown",
    description: "Meet 10+ singles in one fun evening! Professional speed dating event with structured conversations.",
    image: "/placeholder.svg?height=200&width=400&text=Speed+Dating",
    date: "2024-02-15",
    time: "7:00 PM - 10:00 PM",
    location: "The Rooftop Bar, Downtown",
    address: "123 Main St, New York, NY",
    price: "$35",
    category: "Speed Dating",
    attendees: 24,
    maxAttendees: 30,
    organizer: "Emotions Events Team",
    ageRange: "25-35",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Singles Hiking Adventure",
    description:
      "Join fellow outdoor enthusiasts for a scenic hike followed by a group lunch. Perfect for nature lovers!",
    image: "/placeholder.svg?height=200&width=400&text=Hiking+Adventure",
    date: "2024-02-18",
    time: "9:00 AM - 3:00 PM",
    location: "Central Park Trails",
    address: "Central Park, New York, NY",
    price: "Free",
    category: "Outdoor",
    attendees: 18,
    maxAttendees: 25,
    organizer: "Adventure Singles NYC",
    ageRange: "21-45",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Wine Tasting & Mixer",
    description: "Sophisticated evening of wine tasting with guided pairings and mingling opportunities.",
    image: "/placeholder.svg?height=200&width=400&text=Wine+Tasting",
    date: "2024-02-20",
    time: "6:30 PM - 9:30 PM",
    location: "Vintage Wine Bar",
    address: "456 Wine St, New York, NY",
    price: "$45",
    category: "Social",
    attendees: 32,
    maxAttendees: 40,
    organizer: "Wine & Dine Singles",
    ageRange: "28-40",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Cooking Class for Singles",
    description: "Learn to cook delicious Italian cuisine while meeting new people. All skill levels welcome!",
    image: "/placeholder.svg?height=200&width=400&text=Cooking+Class",
    date: "2024-02-22",
    time: "6:00 PM - 9:00 PM",
    location: "Culinary Institute",
    address: "789 Chef Ave, New York, NY",
    price: "$55",
    category: "Learning",
    attendees: 16,
    maxAttendees: 20,
    organizer: "Singles Chef Academy",
    ageRange: "25-50",
    status: "upcoming",
  },
]

const categories = ["All", "Speed Dating", "Outdoor", "Social", "Learning", "Sports", "Arts"]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [dateFilter, setDateFilter] = useState("upcoming")
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const matchesDate = dateFilter === "all" || event.status === dateFilter
    return matchesSearch && matchesCategory && matchesDate
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Singles Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet new people and create meaningful connections at our carefully curated events.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
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
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Past Events</SelectItem>
                    <SelectItem value="all">All Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-red-500 hover:bg-red-600">Apply Filters</Button>
              </div>
            </div>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">{event.category}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant={event.price === "Free" ? "default" : "secondary"}>{event.price}</Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    <Link href={`/events/${event.id}`} className="hover:text-red-500 transition-colors">
                      {event.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees}/{event.maxAttendees} attending • Ages {event.ageRange}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-xs text-muted-foreground">by {event.organizer}</div>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600">
                      Join Event
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your search or browse different categories.</p>
          </div>
        )}

        {/* Create Event CTA */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
            <h3 className="text-2xl font-bold mb-4">Want to Host an Event?</h3>
            <p className="text-muted-foreground mb-6">
              Create your own singles event and bring people together in your community.
            </p>
            <Button size="lg" className="bg-red-500 hover:bg-red-600">
              Create Event
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
