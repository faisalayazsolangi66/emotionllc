"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, MessageCircle, Calendar, Users, Eye, TrendingUp, Settings, Edit } from "lucide-react"
import Link from "next/link"

const recentMatches = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    image: "/placeholder.svg?height=60&width=60&text=Sarah",
    matchDate: "2 days ago",
    compatibility: 95,
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 32,
    image: "/placeholder.svg?height=60&width=60&text=Michael",
    matchDate: "1 week ago",
    compatibility: 87,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    age: 26,
    image: "/placeholder.svg?height=60&width=60&text=Emma",
    matchDate: "3 days ago",
    compatibility: 92,
  },
]

const recentMessages = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=40&width=40&text=Sarah",
    message: "Hey! How's your day going?",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "/placeholder.svg?height=40&width=40&text=Michael",
    message: "Would love to grab coffee sometime!",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    image: "/placeholder.svg?height=40&width=40&text=Emma",
    message: "Thanks for the match! 😊",
    time: "5 hours ago",
    unread: true,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Speed Dating Night",
    date: "Feb 15, 2024",
    time: "7:00 PM",
    location: "Downtown Bar",
  },
  {
    id: 2,
    title: "Singles Hiking",
    date: "Feb 18, 2024",
    time: "9:00 AM",
    location: "Central Park",
  },
]

export default function DashboardPage() {
  const profileCompletion = 85

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Here's what's happening in your dating journey</p>
          </div>
          <div className="flex gap-2">
            <Link href="/profile/edit">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
            <Link href="/profile/settings">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% this week
                  </p>
                </div>
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Matches</p>
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3 new matches
                  </p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Messages</p>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <MessageCircle className="h-3 w-3 mr-1" />5 unread
                  </p>
                </div>
                <MessageCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Events Joined</p>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1" />2 upcoming
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Profile Completion
                  <Badge variant="secondary">{profileCompletion}%</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={profileCompletion} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    Complete your profile to get better matches and more visibility
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Add Photos
                    </Button>
                    <Button size="sm" variant="outline">
                      Update Bio
                    </Button>
                    <Button size="sm" variant="outline">
                      Set Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Matches
                  <Link href="/matches">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <div key={match.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img
                          src={match.image || "/placeholder.svg"}
                          alt={match.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">
                            {match.name}, {match.age}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Matched {match.matchDate} • {match.compatibility}% compatible
                          </p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">New match with Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Your profile was viewed 15 times</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Joined "Speed Dating Night" event</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Messages
                  <Link href="/messages">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMessages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
                    >
                      <img
                        src={message.image || "/placeholder.svg"}
                        alt={message.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{message.name}</p>
                          {message.unread && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{message.message}</p>
                        <p className="text-xs text-muted-foreground">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Upcoming Events
                  <Link href="/events">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground">{event.location}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/meet">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Discover People
                    </Button>
                  </Link>
                  <Link href="/search">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Advanced Search
                    </Button>
                  </Link>
                  <Link href="/events">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Browse Events
                    </Button>
                  </Link>
                  <Link href="/groups">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Join Groups
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
