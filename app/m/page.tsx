"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Heart, Star, Users, Calendar, MessageSquare } from "lucide-react"
import Image from "next/image"

const quickStats = [
  { label: "New Matches", value: "12", icon: Heart, color: "text-red-500" },
  { label: "Profile Views", value: "48", icon: Users, color: "text-blue-500" },
  { label: "Messages", value: "7", icon: MessageSquare, color: "text-green-500" },
  { label: "Events", value: "3", icon: Calendar, color: "text-purple-500" },
]

const recentActivity = [
  {
    id: 1,
    type: "match",
    user: "Sarah",
    image: "/placeholder.svg?height=40&width=40&text=S",
    message: "You have a new match!",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "like",
    user: "Emma",
    image: "/placeholder.svg?height=40&width=40&text=E",
    message: "Liked your photo",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "message",
    user: "Jessica",
    image: "/placeholder.svg?height=40&width=40&text=J",
    message: "Sent you a message",
    time: "3 hours ago",
  },
]

const nearbyEvents = [
  {
    id: 1,
    title: "Coffee & Chat",
    location: "Downtown Cafe",
    time: "Today 7:00 PM",
    attendees: 12,
    image: "/placeholder.svg?height=80&width=120&text=Coffee",
  },
  {
    id: 2,
    title: "Weekend Hiking",
    location: "Mountain Trail",
    time: "Sat 9:00 AM",
    attendees: 8,
    image: "/placeholder.svg?height=80&width=120&text=Hiking",
  },
]

export default function MobileHomePage() {
  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome back!</h2>
        <p className="text-muted-foreground">Ready to find your perfect match?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-4">
              <CardContent className="p-0 flex items-center space-x-3">
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <Card key={activity.id} className="p-3">
              <CardContent className="p-0 flex items-center space-x-3">
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.user}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.message}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Nearby Events */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Nearby Events</h3>
        <div className="space-y-3">
          {nearbyEvents.map((event) => (
            <Card key={event.id} className="p-3">
              <CardContent className="p-0 flex space-x-3">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={80}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                  <Badge variant="secondary" className="text-xs">
                    {event.attendees} attending
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-12">
          <Heart className="mr-2 h-4 w-4" />
          Start Matching
        </Button>
        <Button variant="outline" className="h-12 bg-transparent">
          <Star className="mr-2 h-4 w-4" />
          Boost Profile
        </Button>
      </div>
    </div>
  )
}
