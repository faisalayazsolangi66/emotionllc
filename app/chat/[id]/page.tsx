"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Phone, Video, MoreVertical, Smile, Paperclip, Heart } from "lucide-react"

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    senderId: "sarah_123",
    message: "Hey! How's your day going?",
    timestamp: "2:30 PM",
    isOwn: false,
    avatar: "/placeholder.svg?height=32&width=32&text=SJ",
  },
  {
    id: 2,
    sender: "You",
    senderId: "current_user",
    message: "Hi Sarah! It's going great, thanks for asking. How about yours?",
    timestamp: "2:32 PM",
    isOwn: true,
    avatar: "/placeholder.svg?height=32&width=32&text=You",
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    senderId: "sarah_123",
    message: "Pretty good! I just finished a great workout. Do you like staying active?",
    timestamp: "2:35 PM",
    isOwn: false,
    avatar: "/placeholder.svg?height=32&width=32&text=SJ",
  },
  {
    id: 4,
    sender: "You",
    senderId: "current_user",
    message: "I love hiking and going to the gym. What kind of workout did you do?",
    timestamp: "2:37 PM",
    isOwn: true,
    avatar: "/placeholder.svg?height=32&width=32&text=You",
  },
  {
    id: 5,
    sender: "Sarah Johnson",
    senderId: "sarah_123",
    message: "I did a yoga class followed by some cardio. There's this amazing studio near Central Park!",
    timestamp: "2:40 PM",
    isOwn: false,
    avatar: "/placeholder.svg?height=32&width=32&text=SJ",
  },
]

export default function ChatPage({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(messages)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: "You",
        senderId: "current_user",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
        avatar: "/placeholder.svg?height=32&width=32&text=You",
      }
      setChatMessages([...chatMessages, message])
      setNewMessage("")

      // Simulate typing indicator
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        // Simulate response
        const response = {
          id: chatMessages.length + 2,
          sender: "Sarah Johnson",
          senderId: "sarah_123",
          message: "That sounds great! I'd love to hear more about your hiking adventures.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOwn: false,
          avatar: "/placeholder.svg?height=32&width=32&text=SJ",
        }
        setChatMessages((prev) => [...prev, response])
      }, 2000)
    }
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
                src="/placeholder.svg?height=40&width=40&text=SJ"
                alt="Sarah Johnson"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold">Sarah Johnson</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Online now</span>
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
            {/* Match Notification */}
            <div className="text-center py-4">
              <Card className="inline-block p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                  <span className="text-sm">You matched with Sarah on January 15th</span>
                </div>
              </Card>
            </div>

            {/* Messages */}
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <img
                    src={message.avatar || "/placeholder.svg"}
                    alt={message.sender}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.isOwn ? "bg-red-500 text-white rounded-br-sm" : "bg-muted rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? "text-red-100" : "text-muted-foreground"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                  <img
                    src="/placeholder.svg?height=24&width=24&text=SJ"
                    alt="Sarah Johnson"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="px-4 py-2 rounded-2xl bg-muted rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
