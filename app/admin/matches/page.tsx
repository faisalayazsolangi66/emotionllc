"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, Search, MoreHorizontal, TrendingUp, Users, Eye, Ban } from "lucide-react"

const matches = [
  {
    id: 1,
    user1: { name: "John Doe", avatar: "/placeholder-user.jpg" },
    user2: { name: "Jane Smith", avatar: "/placeholder-user.jpg" },
    matchDate: "2024-01-20",
    status: "active",
    compatibility: 95,
    messagesExchanged: 12,
  },
  {
    id: 2,
    user1: { name: "Mike Johnson", avatar: "/placeholder-user.jpg" },
    user2: { name: "Sarah Wilson", avatar: "/placeholder-user.jpg" },
    matchDate: "2024-01-19",
    status: "inactive",
    compatibility: 87,
    messagesExchanged: 3,
  },
]

const matchStats = {
  totalMatches: 15420,
  activeMatches: 8930,
  successfulMatches: 2340,
  averageCompatibility: 82,
}

export default function AdminMatches() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMatches = matches.filter(
    (match) =>
      match.user1.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.user2.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Matches Management</h1>
        <Button>
          <TrendingUp className="h-4 w-4 mr-2" />
          View Analytics
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="matches">All Matches</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matchStats.totalMatches.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matchStats.activeMatches.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Currently messaging</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Matches</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matchStats.successfulMatches.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Led to relationships</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Compatibility</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matchStats.averageCompatibility}%</div>
                <p className="text-xs text-muted-foreground">Match quality score</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Matches</CardTitle>
              <CardDescription>Latest user matches and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matches.slice(0, 5).map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        <img
                          src={match.user1.avatar || "/placeholder.svg"}
                          alt={match.user1.name}
                          className="w-10 h-10 rounded-full border-2 border-background"
                        />
                        <img
                          src={match.user2.avatar || "/placeholder.svg"}
                          alt={match.user2.name}
                          className="w-10 h-10 rounded-full border-2 border-background"
                        />
                      </div>
                      <div>
                        <p className="font-medium">
                          {match.user1.name} & {match.user2.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {match.compatibility}% compatibility • {match.messagesExchanged} messages
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={match.status === "active" ? "default" : "secondary"}>{match.status}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="h-4 w-4 mr-2" />
                            Remove Match
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search matches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Matches Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Matches ({filteredMatches.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Users</th>
                      <th className="text-left p-2">Match Date</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Compatibility</th>
                      <th className="text-left p-2">Messages</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMatches.map((match) => (
                      <tr key={match.id} className="border-b">
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                              <img
                                src={match.user1.avatar || "/placeholder.svg"}
                                alt={match.user1.name}
                                className="w-8 h-8 rounded-full border-2 border-background"
                              />
                              <img
                                src={match.user2.avatar || "/placeholder.svg"}
                                alt={match.user2.name}
                                className="w-8 h-8 rounded-full border-2 border-background"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-xs">
                                {match.user1.name} & {match.user2.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 text-xs text-muted-foreground">{match.matchDate}</td>
                        <td className="p-2">
                          <Badge variant={match.status === "active" ? "default" : "secondary"}>{match.status}</Badge>
                        </td>
                        <td className="p-2 font-semibold">{match.compatibility}%</td>
                        <td className="p-2">{match.messagesExchanged}</td>
                        <td className="p-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>View Messages</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Remove Match</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Match Analytics</CardTitle>
              <CardDescription>Detailed analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Match analytics dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
