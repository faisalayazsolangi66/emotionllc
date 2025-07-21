"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MapPin, Calendar, Star, MessageCircle, UserPlus, Camera, Heart, Share2 } from "lucide-react"

const groupData = {
  id: 1,
  name: "NYC Hiking Adventures",
  description:
    "Join us for weekend hikes around New York and nearby areas. All skill levels welcome! We explore beautiful trails, share outdoor experiences, and build lasting friendships through our love of nature.",
  image: "/placeholder.svg?height=300&width=600&text=Group+Cover",
  members: 234,
  location: "New York, NY",
  category: "Outdoor",
  isPrivate: false,
  rating: 4.8,
  tags: ["hiking", "outdoor", "fitness", "nature", "weekend", "adventure"],
  admin: {
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=40&width=40&text=SJ",
    joinDate: "Group founder",
  },
  stats: {
    totalEvents: 45,
    upcomingEvents: 3,
    totalPhotos: 156,
    avgRating: 4.8,
  },
  rules: [
    "Be respectful to all members",
    "RSVP accurately for events",
    "Share photos from our adventures",
    "Help newcomers feel welcome",
    "Follow Leave No Trace principles",
  ],
}

const upcomingEvents = [
  {
    id: 1,
    title: "Central Park Nature Walk",
    date: "Feb 17, 2024",
    time: "9:00 AM",
    attendees: 18,
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Hudson Valley Trail Hike",
    date: "Feb 24, 2024",
    time: "8:00 AM",
    attendees: 25,
    difficulty: "Moderate",
  },
  {
    id: 3,
    title: "Sunset Photography Hike",
    date: "Mar 2, 2024",
    time: "5:00 PM",
    attendees: 12,
    difficulty: "Easy",
  },
]

const recentMembers = [
  { name: "Alex Chen", image: "/placeholder.svg?height=32&width=32&text=AC", joinDate: "2 days ago" },
  { name: "Maria Garcia", image: "/placeholder.svg?height=32&width=32&text=MG", joinDate: "1 week ago" },
  { name: "David Kim", image: "/placeholder.svg?height=32&width=32&text=DK", joinDate: "2 weeks ago" },
  { name: "Emma Wilson", image: "/placeholder.svg?height=32&width=32&text=EW", joinDate: "3 weeks ago" },
]

const photos = [
  "/placeholder.svg?height=200&width=200&text=Hike+1",
  "/placeholder.svg?height=200&width=200&text=Hike+2",
  "/placeholder.svg?height=200&width=200&text=Hike+3",
  "/placeholder.svg?height=200&width=200&text=Hike+4",
  "/placeholder.svg?height=200&width=200&text=Hike+5",
  "/placeholder.svg?height=200&width=200&text=Hike+6",
]

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  const [isJoined, setIsJoined] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Cover Image */}
          <div className="relative mb-8">
            <img
              src={groupData.image || "/placeholder.svg"}
              alt={groupData.name}
              className="w-full h-64 md:h-80 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{groupData.name}</h1>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {groupData.members} members
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {groupData.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                      {groupData.rating}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">About This Group</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{groupData.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {groupData.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-500">{groupData.stats.totalEvents}</div>
                          <div className="text-sm text-muted-foreground">Total Events</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">{groupData.stats.upcomingEvents}</div>
                          <div className="text-sm text-muted-foreground">Upcoming</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">{groupData.stats.totalPhotos}</div>
                          <div className="text-sm text-muted-foreground">Photos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-500">{groupData.stats.avgRating}</div>
                          <div className="text-sm text-muted-foreground">Rating</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Group Rules</h4>
                        <ul className="space-y-2">
                          {groupData.rules.map((rule, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span className="text-muted-foreground">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="events" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{event.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {event.date} at {event.time}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  {event.attendees} attending
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {event.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <Button size="sm" className="bg-red-500 hover:bg-red-600">
                              Join Event
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="photos" className="space-y-6 mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Group photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      View All Photos
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="members" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentMembers.map((member, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={member.image || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">Joined {member.joinDate}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button variant="outline">View All {groupData.members} Members</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Join Button */}
              <Card>
                <CardContent className="p-6">
                  <Button className="w-full bg-red-500 hover:bg-red-600 mb-4" onClick={() => setIsJoined(!isJoined)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isJoined ? "Leave Group" : "Join Group"}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Free to join • {groupData.members} members
                  </div>
                </CardContent>
              </Card>

              {/* Group Admin */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Group Admin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={groupData.admin.image || "/placeholder.svg"} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{groupData.admin.name}</p>
                      <p className="text-sm text-muted-foreground">{groupData.admin.joinDate}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Admin
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Group Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Event</span>
                    <span className="font-semibold">Feb 17</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New Members</span>
                    <span className="font-semibold">+12 this week</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Activity Level</span>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                      Very Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Related Groups */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Similar Groups</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "NYC Rock Climbing", members: 156 },
                    { name: "Weekend Warriors", members: 89 },
                    { name: "Nature Photography", members: 234 },
                  ].map((group, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{group.name}</p>
                        <p className="text-xs text-muted-foreground">{group.members} members</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
