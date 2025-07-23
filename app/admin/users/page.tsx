"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserPlus, MoreHorizontal, Search, Mail, Ban, CheckCircle, XCircle, Crown } from "lucide-react"

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    verified: true,
    subscription: "premium",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "suspended",
    verified: false,
    subscription: "free",
    joinDate: "2024-01-10",
    lastActive: "2024-01-18",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    status: "active",
    verified: true,
    subscription: "vip",
    joinDate: "2024-01-05",
    lastActive: "2024-01-21",
    avatar: "/placeholder-user.jpg",
  },
]

const restrictedUsernames = ["admin", "administrator", "root", "support", "help", "info", "contact"]

export default function ManageUsers() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [inviteEmails, setInviteEmails] = useState("")
  const [newRestrictedUsername, setNewRestrictedUsername] = useState("")
  const [massEmailSubject, setMassEmailSubject] = useState("")
  const [massEmailContent, setMassEmailContent] = useState("")
  const [massEmailTarget, setMassEmailTarget] = useState("all")

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map((u) => u.id))
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on users:`, selectedUsers)
    // Implement bulk actions here
    setSelectedUsers([])
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Users</DialogTitle>
              <DialogDescription>Enter email addresses separated by commas to send invitations</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="emails">Email Addresses</Label>
                <Textarea
                  id="emails"
                  placeholder="user1@example.com, user2@example.com"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                />
              </div>
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Invitations
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse Users</TabsTrigger>
          <TabsTrigger value="roles">User Roles</TabsTrigger>
          <TabsTrigger value="restricted">Restricted Names</TabsTrigger>
          <TabsTrigger value="mailing">Mass Mailing</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Recently Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="unverified">Unverified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">{selectedUsers.length} users selected:</span>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("delete")}>
                    Delete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("suspend")}>
                    Suspend
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("reactivate")}>
                    Re-activate
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("unverify")}>
                    Mark Email Unverified
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("verify")}>
                    Mark Email Verified
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("approve")}>
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("upgrade")}>
                    Upgrade Subscription
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("downgrade")}>
                    Downgrade Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">
                        <Checkbox checked={selectedUsers.length === users.length} onCheckedChange={handleSelectAll} />
                      </th>
                      <th className="text-left p-2">User</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Subscription</th>
                      <th className="text-left p-2">Join Date</th>
                      <th className="text-left p-2">Last Active</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="p-2">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => handleSelectUser(user.id)}
                          />
                        </td>
                        <td className="p-2">
                          <div className="flex items-center space-x-3">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                            {user.verified ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge variant={user.subscription === "free" ? "secondary" : "default"}>
                            {user.subscription === "vip" && <Crown className="h-3 w-3 mr-1" />}
                            {user.subscription}
                          </Badge>
                        </td>
                        <td className="p-2 text-xs text-muted-foreground">{user.joinDate}</td>
                        <td className="p-2 text-xs text-muted-foreground">{user.lastActive}</td>
                        <td className="p-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
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

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>Manage user permissions and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">User roles management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restricted" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Restricted Usernames</CardTitle>
              <CardDescription>Manage usernames that cannot be registered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter username to restrict"
                  value={newRestrictedUsername}
                  onChange={(e) => setNewRestrictedUsername(e.target.value)}
                />
                <Button
                  onClick={() => {
                    if (newRestrictedUsername) {
                      console.log("Restricting username:", newRestrictedUsername)
                      setNewRestrictedUsername("")
                    }
                  }}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Restrict
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Currently Restricted:</h4>
                <div className="flex flex-wrap gap-2">
                  {restrictedUsernames.map((username) => (
                    <Badge key={username} variant="secondary">
                      {username}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0"
                        onClick={() => console.log("Removing restriction:", username)}
                      >
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mailing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mass Mailing</CardTitle>
              <CardDescription>Send emails to multiple users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Email subject"
                  value={massEmailSubject}
                  onChange={(e) => setMassEmailSubject(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  placeholder="Email content..."
                  rows={6}
                  value={massEmailContent}
                  onChange={(e) => setMassEmailContent(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="target">Send To</Label>
                <Select value={massEmailTarget} onValueChange={setMassEmailTarget}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="free">Free Users</SelectItem>
                    <SelectItem value="vip">VIP Users (Paid)</SelectItem>
                    <SelectItem value="premium">Premium Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Mass Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
