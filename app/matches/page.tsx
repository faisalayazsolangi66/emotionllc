"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MessageCircle, Heart, Search, MapPin } from "lucide-react"

const matches = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    image: "/placeholder.svg?height=200&width=200&text=Sarah",
    location: "New York, NY",
    matchedDate: "2 days ago",
    lastMessage: "Hey! How's your day going?",
    lastMessageTime: "2 hours ago",
    isOnline: true,
    mutualFriends: 3,
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 32,
    image: "/placeholder.svg?height=200&width=200&text=Michael",
    location: "San Francisco, CA",
    matchedDate: "1 week ago",
    lastMessage: "Would love to grab coffee sometime!",
    lastMessageTime: "1 day ago",
    isOnline: false,
    mutualFriends: 1,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    age: 26,
    image: "/placeholder.svg?height=200&width=200&text=Emma",
    location: "Los Angeles, CA",
    matchedDate: "3 days ago",
    lastMessage: "Thanks for the match! 😊",
    lastMessageTime: "5 hours ago",
    isOnline: true,
    mutualFriends: 2,
  },
]

export default function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all") // all, recent, unread

  const filteredMatches = matches.filter((match) => match.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Matches</h1>
          <p className="text-muted-foreground">{matches.length} people liked you back</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
              All Matches
            </Button>
            <Button variant={filter === "recent" ? "default" : "outline"} onClick={() => setFilter("recent")} size="sm">
              Recent
            </Button>
            <Button variant={filter === "unread" ? "default" : "outline"} onClick={() => setFilter("unread")} size="sm">
              Unread
            </Button>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={match.image || "/placeholder.svg"} alt={match.name} className="w-full h-48 object-cover" />
                {match.isOnline && (
                  <div className="absolute top-3 right-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    <Heart className="h-3 w-3 mr-1 fill-current text-red-500" />
                    Matched {match.matchedDate}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {match.name}, {match.age}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {match.location}
                    </div>
                  </div>

                  {match.lastMessage && (
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Last message:</p>
                      <p className="text-sm">{match.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{match.lastMessageTime}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{match.mutualFriends} mutual connections</span>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search" : "Keep swiping to find your perfect match!"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
