"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Heart, Star, Users, Calendar, MessageSquare } from "lucide-react"
import Image from "next/image"

function getTokenFromCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || ""
  return ""
}

export default function MobileHomePage() {
  const [stats, setStats] = useState({
    profileViews: 0,
    totalMatches: 0,
    eventsJoined: 0,
    messages: 0,
  })
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [recentMatches, setRecentMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getTokenFromCookie("token")

    // Dashboard stats
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/dashboard/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (res.ok && data.status && data.data) {
          setStats((prev) => ({
            ...prev,
            profileViews: data.data.profile_views,
            totalMatches: data.data.total_matches,
            eventsJoined: data.data.total_events_joined,
          }))
        }
      } catch {}
    }

    // Upcoming events
    const fetchUpcomingEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/events/upcoming`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (res.ok && data.status && data.data && data.data.event) {
          const event = data.data.event
          setUpcomingEvents([{
            id: event.id,
            title: event.title,
            location: event.location,
            time: event.time,
            attendees: event.attendees,
            image: event.image,
          }])
        } else {
          setUpcomingEvents([])
        }
      } catch {
        setUpcomingEvents([])
      }
    }

    // Recent matches
    const fetchMatches = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}matches`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (res.ok && data.status && Array.isArray(data.data)) {
          const matches = data.data.map((item: any) => {
            const user = item.user
            return {
              id: user.id,
              name: user.realname || user.username,
              image: user.photo_url || "/placeholder.svg",
              matchDate: item.updated_at ? new Date(item.updated_at).toLocaleDateString() : "",
            }
          })
          setRecentMatches(matches)
          setStats((prev) => ({
            ...prev,
            totalMatches: matches.length,
          }))
        }
      } catch {
        setRecentMatches([])
      }
      setLoading(false)
    }

    fetchStats()
    fetchUpcomingEvents()
    fetchMatches()
  }, [])

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome back!</h2>
        <p className="text-muted-foreground">Ready to find your perfect match?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <CardContent className="p-0 flex items-center space-x-3">
            <Heart className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-2xl font-bold">{stats.totalMatches}</p>
              <p className="text-sm text-muted-foreground">New Matches</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="p-0 flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{stats.profileViews}</p>
              <p className="text-sm text-muted-foreground">Profile Views</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="p-0 flex items-center space-x-3">
            <MessageSquare className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{stats.messages}</p>
              <p className="text-sm text-muted-foreground">Messages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent className="p-0 flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">{stats.eventsJoined}</p>
              <p className="text-sm text-muted-foreground">Events Joined</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Matches */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Recent Matches</h3>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : recentMatches.length === 0 ? (
            <div className="text-center text-muted-foreground">No matches found.</div>
          ) : (
            recentMatches.map((match) => (
              <Card key={match.id} className="p-3">
                <CardContent className="p-0 flex items-center space-x-3">
                  <Image
                    src={match.image}
                    alt={match.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{match.name}</p>
                    <p className="text-xs text-muted-foreground">Matched {match.matchDate}</p>
                  </div>
                </CardContent>
              </Card>
            )))
          }
        </div>
      </div>

      {/* Nearby Events */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : upcomingEvents.length === 0 ? (
            <div className="text-center text-muted-foreground">No upcoming events found.</div>
          ) : (
            upcomingEvents.map((event) => (
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
            )))
          }
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
