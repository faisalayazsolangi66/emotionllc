"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Phone, Video, MoreVertical, Smile, Paperclip, Heart } from "lucide-react"
import Image from "next/image"
import { io } from "socket.io-client"
import { useAuth } from "@/components/auth-context"

const socket = io("http://31.187.72.58:3001/")

function getTokenFromCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || ""
  return ""
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const { user: loggedInUser } = useAuth()
  const currentUserId = loggedInUser?.id
  const [chatData, setChatData] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [loadingMessages, setLoadingMessages] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [otherUser, setOtherUser] = useState<any>(null)

  // Get logged-in user info (replace with your auth context if available)
  useEffect(() => {
    // Example: fetch user from API or context
    // setCurrentUserId(loggedInUser.id)
  }, [])

  // Fetch chat info and messages
  useEffect(() => {
    const fetchChat = async () => {
      setLoadingMessages(true)
      const token = getTokenFromCookie("token")
      // First, get chat id by username
      const resChats = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}my-chats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const dataChats = await resChats.json()
      let chatId = null
      let userObj = null
      if (resChats.ok && Array.isArray(dataChats.chats)) {
        const chat = dataChats.chats.find((c: any) => c.user.username === params.id)
        if (chat) {
          chatId = chat.chat_id
          userObj = chat.user
        }
      }
      setOtherUser(userObj)
      if (!chatId) {
        setChatData(null)
        setLoadingMessages(false)
        return
      }
      // Now fetch messages
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}chat/${chatId}/messages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (res.ok && data.chat) {
        setChatData(data)
      } else {
        setChatData(null)
      }
      setLoadingMessages(false)
    }
    fetchChat()
  }, [params.id])

  // Socket.io: receive messages
  useEffect(() => {
    socket.on("message", (message) => {
      if (chatData?.chat?.id && message.chat_id === chatData.chat.id) {
        setChatData((prev: any) => ({
          ...prev,
          chat: {
            ...prev.chat,
            messages: [...(prev.chat.messages || []), message],
          },
        }))
      }
    })
    return () => {
      socket.off("message")
    }
  }, [chatData?.chat?.id])

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatData?.chat?.messages])

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !otherUser?.id || !chatData?.chat?.id) return
    const token = getTokenFromCookie("token")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver_id: otherUser.id,
          message: newMessage,
        }),
      })
      if (res.ok) {
        setNewMessage("")
        socket.emit("message", {
          chat_id: chatData.chat.id,
          sender_id: currentUserId,
          receiver_id: otherUser.id,
          message: newMessage,
          timestamp: new Date().toISOString(),
        })
        // Refresh messages
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}chat/${chatData.chat.id}/messages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        const data2 = await res2.json()
        if (res2.ok && data2.chat) {
          setChatData(data2)
        }
      }
    } catch {}
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <img
                src={otherUser?.photo_url || "/placeholder.svg"}
                alt={otherUser?.name || otherUser?.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold">{otherUser?.name || otherUser?.username}</h2>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 ${otherUser?.online_status === "online" ? "bg-green-500" : "bg-gray-400"} rounded-full`}></div>
                  <span className="text-sm text-muted-foreground">
                    {otherUser?.online_status === "online" ? "Online now" : "Offline"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Messages */}
            {chatData?.chat?.messages?.map((message: any) => (
              <div key={message.id} className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.sender_id === currentUserId ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <img
                    src={
                      message.sender_id === currentUserId
                        ? "/placeholder.svg?height=32&width=32&text=You"
                        : otherUser?.photo_url || "/placeholder.svg"
                    }
                    alt={message.sender_id === currentUserId ? "You" : otherUser?.name || otherUser?.username}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.sender_id === currentUserId ? "bg-red-500 text-white rounded-br-sm" : "bg-muted rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.sender_id === currentUserId ? "text-red-100" : "text-muted-foreground"}`}>
                      {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-2">
              <Button variant="ghost" size="icon" className="mb-2">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[40px] resize-none"
                />
              </div>
              <Button variant="ghost" size="icon" className="mb-2">
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="mb-2 bg-red-500 hover:bg-red-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
