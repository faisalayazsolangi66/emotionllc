"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MessageSquare, Search, MoreHorizontal, AlertTriangle, Eye, Ban, Flag } from "lucide-react"

const conversations = [
  {
    id: 1,
    participants: ["John Doe", "Jane Smith"],
    lastMessage: "Hey, how are you doing?",
    lastMessageTime: "2024-01-20 14:30",
    messageCount: 25,
    status: "active",
    reported: false,
  },
  {
    id: 2,
    participants: ["Mike Johnson", "Sarah Wilson"],
    lastMessage: "Would love to meet up sometime!",
    lastMessageTime: "2024-01-20 12:15",
    messageCount: 8,
    status: "active",
    reported: true,
  },
]

const reportedMessages = [
  {
    id: 1,
    reporter: "Jane Smith",
    reported: "John Doe",
    message: "Inappropriate content here...",
    reason: "Inappropriate content",
    timestamp: "2024-01-20 15:45",
    status: "pending",
  },
]

export default function AdminChat() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Chat & Messages</h1>
        <Button variant="outline">
          <AlertTriangle className="h-4 w-4 mr-2" />
          View Reports
        </Button>
      </div>

      <Tabs defaultValue="conversations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Chat Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Conversations */}
          <Card>
            <CardHeader>
              <CardTitle>Active Conversations</CardTitle>
              <CardDescription>Monitor user conversations and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <MessageSquare className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{conversation.participants.join(" & ")}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">{conversation.lastMessage}</p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.messageCount} messages • {conversation.lastMessageTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {conversation.reported && (
                        <Badge variant="destructive">
                          <Flag className="h-3 w-3 mr-1" />
                          Reported
                        </Badge>
                      )}
                      <Badge variant={conversation.status === "active" ? "default" : "secondary"}>
                        {conversation.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Messages
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="h-4 w-4 mr-2" />
                            Block Conversation
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

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reported Messages</CardTitle>
              <CardDescription>Review and moderate reported content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedMessages.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-red-600">Report #{report.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.reporter} reported {report.reported}
                        </p>
                      </div>
                      <Badge variant="outline">{report.status}</Badge>
                    </div>
                    <div className="bg-muted p-3 rounded mb-2">
                      <p className="text-sm">{report.message}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Reason: {report.reason}</p>
                        <p className="text-xs text-muted-foreground">{report.timestamp}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Dismiss
                        </Button>
                        <Button size="sm" variant="destructive">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chat Settings</CardTitle>
              <CardDescription>Configure chat and messaging features</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Chat settings configuration coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
