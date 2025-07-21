"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Users, Search, Plus, Lock, Globe } from "lucide-react"

const chatrooms = [
  {
    id: 1,
    name: "General Chat",
    description: "Welcome! Introduce yourself and chat with everyone",
    image: "/placeholder.svg?height=80&width=80&text=General",
    members: 1234,
    onlineMembers: 89,
    category: "General",
    isPrivate: false,
    lastMessage: {
      user: "Sarah_NYC",
      message: "Anyone up for coffee this weekend?",
      time: "2 minutes ago",
    },
    tags: ["welcome", "introductions", "general"],
  },
  {
    id: 2,
    name: "Dating Advice Corner",
    description: "Get real-time advice on dating and relationships",
    image: "/placeholder.svg?height=80&width=80&text=Dating",
    members: 567,
    onlineMembers: 34,
    category: "Dating",
    isPrivate: false,
    lastMessage: {
      user: "DatingGuru",
      message: "Remember, confidence is key!",
      time: "5 minutes ago",
    },
    tags: ["advice", "dating", "relationships"],
  },
  {
    id: 3,
    name: "NYC Singles",
    description: "Connect with singles in New York City area",
    image: "/placeholder.svg?height=80&width=80&text=NYC",
    members: 892,
    onlineMembers: 67,
    category: "Location",
    isPrivate: false,
    lastMessage: {
      user: "BigAppleLover",
      message: "Great restaurant recommendations here!",
      time: "1 hour ago",
    },
    tags: ["nyc", "local", "meetups"],
  },
  {
    id: 4,
    name: "Book Lovers Unite",
    description: "Discuss your favorite books and find reading partners",
    image: "/placeholder.svg?height=80&width=80&text=Books",
    members: 234,
    onlineMembers: 12,
    category: "Interests",
    isPrivate: false,
    lastMessage: {
      user: "BookwormBella",
      message: "Just finished 'The Seven Husbands of Evelyn Hugo'",
      time: "3 hours ago",
    },
    tags: ["books", "reading", "literature"],
  },
  {
    id: 5,
    name: "VIP Members Only",
    description: "Exclusive chat for verified premium members",
    image: "/placeholder.svg?height=80&width=80&text=VIP",
    members: 156,
    onlineMembers: 23,
    category: "Premium",
    isPrivate: true,
    lastMessage: {
      user: "PremiumUser",
      message: "Planning an exclusive event next month",
      time: "30 minutes ago",
    },
    tags: ["vip", "premium", "exclusive"],
  },
  {
    id: 6,
    name: "Fitness & Wellness",
    description: "Share workout tips and find gym buddies",
    image: "/placeholder.svg?height=80&width=80&text=Fitness",
    members: 445,
    onlineMembers: 28,
    category: "Health",
    isPrivate: false,
    lastMessage: {
      user: "FitnessFanatic",
      message: "Morning yoga session was amazing!",
      time: "45 minutes ago",
    },
    tags: ["fitness", "health", "wellness"],
  },
]

const categories = ["All", "General", "Dating", "Location", "Interests", "Premium", "Health"]

export default function ChatroomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredChatrooms = chatrooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || room.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Chat Rooms</h1>
            <p className="text-muted-foreground">Join conversations and connect with people who share your interests</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Room
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chat rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className={selectedCategory === category ? "bg-red-500 hover:bg-red-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChatrooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-32 object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary">{room.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    {room.isPrivate ? (
                      <Lock className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Globe className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      <Users className="h-3 w-3 mr-1" />
                      {room.onlineMembers} online
                    </Badge>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Link href={`/chat/${room.id}`} className="hover:text-red-500 transition-colors">
                        {room.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{room.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {room.members} members
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Active
                    </div>
                  </div>

                  {room.lastMessage && (
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm font-medium">{room.lastMessage.user}:</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{room.lastMessage.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{room.lastMessage.time}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {room.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/chat/${room.id}`}>
                    <Button className="w-full bg-red-500 hover:bg-red-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Join Chat
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChatrooms.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No chat rooms found</h3>
            <p className="text-muted-foreground">Try adjusting your search or browse different categories.</p>
          </div>
        )}

        {/* Popular Tags */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {["dating", "relationships", "nyc", "fitness", "books", "music", "travel", "food", "movies", "gaming"].map(
              (tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
                >
                  #{tag}
                </Badge>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
