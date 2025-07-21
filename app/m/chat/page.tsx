"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const conversations = [
  {
    id: 1,
    name: "Sarah",
    image: "/placeholder.svg?height=50&width=50&text=S",
    lastMessage: "Hey! How was your day?",
    time: "2m ago",
    unread: 2,
    isOnline: true,
  },
  {
    id: 2,
    name: "Emma",
    image: "/placeholder.svg?height=50&width=50&text=E",
    lastMessage: "Thanks for the coffee recommendation!",
    time: "1h ago",
    unread: 0,
    isOnline: false,
  },
  {
    id: 3,
    name: "Jessica",
    image: "/placeholder.svg?height=50&width=50&text=J",
    lastMessage: "Would love to meet up this weekend",
    time: "3h ago",
    unread: 1,
    isOnline: true,
  },
  {
    id: 4,
    name: "Ashley",
    image: "/placeholder.svg?height=50&width=50&text=A",
    lastMessage: "That movie was amazing! 🎬",
    time: "1d ago",
    unread: 0,
    isOnline: false,
  },
  {
    id: 5,
    name: "Megan",
    image: "/placeholder.svg?height=50&width=50&text=M",
    lastMessage: "See you at the yoga class!",
    time: "2d ago",
    unread: 0,
    isOnline: true,
  },
]

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full pb-20">
      {/* Search Header */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <Link key={conversation.id} href={`/chat/${conversation.id}`}>
            <div className="flex items-center space-x-3 p-4 hover:bg-muted/50 border-b border-border/50">
              <div className="relative">
                <Image
                  src={conversation.image || "/placeholder.svg"}
                  alt={conversation.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                {conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>

              <div className="flex flex-col items-end space-y-1">
                {conversation.unread > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {conversation.unread}
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredConversations.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">No conversations found</p>
            <p className="text-sm text-muted-foreground">Start matching to begin chatting!</p>
          </div>
        </div>
      )}
    </div>
  )
}
