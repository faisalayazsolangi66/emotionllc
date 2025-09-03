"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function getTokenFromCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || ""
  return ""
}

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [chats, setChats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChats = async () => {
      const token = getTokenFromCookie("token")
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}my-chats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (res.ok && Array.isArray(data.chats)) {
          setChats(
            data.chats.map((chat: any) => ({
              id: chat.chat_id,
              username: chat.user.username,
              name: chat.user.realname || chat.user.username,
              image: chat.user.photo_url || "/placeholder.svg",
              lastMessage: chat.lastMessage?.message || "",
              time: chat.lastMessage?.created_at
                ? new Date(chat.lastMessage.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "",
              unread: chat.lastMessage?.read_at ? 0 : 1,
              isOnline: chat.user.online_status === "online",
            })),
          )
        } else {
          setChats([])
        }
      } catch {
        setChats([])
      }
      setLoading(false)
    }
    fetchChats()
  }, [])

  const filteredConversations = chats.filter((conv) =>
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
        {loading ? (
          <div className="text-center text-muted-foreground py-8">Loading...</div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">No conversations found</p>
              <p className="text-sm text-muted-foreground">Start matching to begin chatting!</p>
            </div>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <Link key={conversation.id} href={`/m/chat/${conversation.username}`}>
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
          ))
        )}
      </div>
    </div>
  )
}
