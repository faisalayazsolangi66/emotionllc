"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, Clock, Search, Plus, Pin, TrendingUp } from "lucide-react"

const forumCategories = [
  {
    id: 1,
    name: "Introductions",
    description: "New to the community? Introduce yourself here!",
    icon: "👋",
    threads: 234,
    posts: 1567,
    lastPost: {
      title: "Hello from NYC!",
      author: "Sarah_NYC",
      time: "2 hours ago",
    },
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Dating Advice",
    description: "Get and give advice on dating, relationships, and love",
    icon: "💕",
    threads: 892,
    posts: 5643,
    lastPost: {
      title: "First date conversation starters?",
      author: "Mike_Dating",
      time: "1 hour ago",
    },
    color: "bg-red-500",
  },
  {
    id: 3,
    name: "Success Stories",
    description: "Share your dating and relationship success stories",
    icon: "🎉",
    threads: 156,
    posts: 987,
    lastPost: {
      title: "We're getting married!",
      author: "HappyCouple2024",
      time: "3 hours ago",
    },
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Events & Meetups",
    description: "Discuss upcoming events and plan meetups",
    icon: "📅",
    threads: 78,
    posts: 456,
    lastPost: {
      title: "Speed dating event this Friday",
      author: "EventOrganizer",
      time: "5 hours ago",
    },
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "General Discussion",
    description: "Talk about anything and everything",
    icon: "💬",
    threads: 445,
    posts: 2890,
    lastPost: {
      title: "What's your favorite date spot?",
      author: "DateExplorer",
      time: "30 minutes ago",
    },
    color: "bg-orange-500",
  },
]

const recentThreads = [
  {
    id: 1,
    title: "How to overcome dating anxiety?",
    author: "NervousNelly",
    authorAvatar: "/placeholder.svg?height=32&width=32&text=NN",
    category: "Dating Advice",
    replies: 23,
    views: 156,
    lastReply: "15 minutes ago",
    isPinned: false,
    isHot: true,
  },
  {
    id: 2,
    title: "Welcome to Emotions LLC Community!",
    author: "Admin",
    authorAvatar: "/placeholder.svg?height=32&width=32&text=A",
    category: "Introductions",
    replies: 89,
    views: 1234,
    lastReply: "2 hours ago",
    isPinned: true,
    isHot: false,
  },
  {
    id: 3,
    title: "Best apps for long-distance relationships?",
    author: "LongDistanceLove",
    authorAvatar: "/placeholder.svg?height=32&width=32&text=LD",
    category: "Dating Advice",
    replies: 34,
    views: 289,
    lastReply: "1 hour ago",
    isPinned: false,
    isHot: true,
  },
]

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
            <p className="text-muted-foreground">Connect, share, and get advice from our amazing community</p>
          </div>
          <Link href="/forum/create">
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="h-4 w-4 mr-2" />
              New Thread
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search forum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Forum Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Forum Categories</h2>
              <div className="space-y-4">
                {forumCategories.map((category) => (
                  <Card key={category.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="text-3xl">{category.icon}</div>
                          <div className="flex-1">
                            <Link
                              href={`/forum/${category.id}`}
                              className="text-xl font-semibold hover:text-red-500 transition-colors"
                            >
                              {category.name}
                            </Link>
                            <p className="text-muted-foreground mt-1">{category.description}</p>
                            <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {category.threads} threads
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {category.posts} posts
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-medium">{category.lastPost.title}</p>
                          <p className="text-muted-foreground">by {category.lastPost.author}</p>
                          <p className="text-muted-foreground">{category.lastPost.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Threads */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Discussions</h2>
              <div className="space-y-4">
                {recentThreads.map((thread) => (
                  <Card key={thread.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <img
                            src={thread.authorAvatar || "/placeholder.svg"}
                            alt={thread.author}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              {thread.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                              {thread.isHot && <TrendingUp className="h-4 w-4 text-red-500" />}
                              <Link
                                href={`/forum/${thread.id}`}
                                className="font-semibold hover:text-red-500 transition-colors"
                              >
                                {thread.title}
                              </Link>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>by {thread.author}</span>
                              <Badge variant="outline" className="text-xs">
                                {thread.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4 mb-1">
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {thread.replies}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {thread.views}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {thread.lastReply}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Forum Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Forum Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Threads</span>
                    <span className="font-semibold">1,805</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Posts</span>
                    <span className="font-semibold">11,543</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Members</span>
                    <span className="font-semibold">2,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Online Now</span>
                    <span className="font-semibold text-green-500">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {[
                    { name: "DatingGuru", posts: 234, avatar: "/placeholder.svg?height=32&width=32&text=DG" },
                    { name: "LoveExpert", posts: 189, avatar: "/placeholder.svg?height=32&width=32&text=LE" },
                    { name: "RelationshipPro", posts: 156, avatar: "/placeholder.svg?height=32&width=32&text=RP" },
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={contributor.avatar || "/placeholder.svg"}
                        alt={contributor.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{contributor.name}</p>
                        <p className="text-xs text-muted-foreground">{contributor.posts} posts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Forum Rules */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Forum Guidelines</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Be respectful and kind to all members</p>
                  <p>• No spam or self-promotion</p>
                  <p>• Keep discussions relevant to the category</p>
                  <p>• Report inappropriate content</p>
                  <p>• Have fun and make connections!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
