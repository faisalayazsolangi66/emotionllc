"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Search, MoreVertical, Phone, Video, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useAuth } from "@/components/auth-context"
import io from "socket.io-client";

// Place this outside your component to avoid multiple connections
const socket = io("http://31.187.72.58:3001/");
function getTokenFromCookie(name: string) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift() || ""
    return ""
}

export default function MessagesPage({ params }: { params: { username: string } }) {
    const { user: loggedInUser } = useAuth()
    const currentUserId = loggedInUser?.id

    const [selectedChatId, setSelectedChatId] = useState<number | null>(null)
    const [selectedChatUser, setSelectedChatUser] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const [chatData, setChatData] = useState<any>(null)
    const [chats, setChats] = useState<any[]>([])
    const [loadingChats, setLoadingChats] = useState(true)
    const [loadingMessages, setLoadingMessages] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to WebSocket server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket server");
        });

        socket.on("message", (message) => {
            // Handle incoming message
            console.log("Received message:", message);
            // If the message belongs to the current chat, update chatData
            if (message.chat_id === selectedChatId) {
                setChatData((prev: any) => {
                    if (!prev?.chat?.messages) return prev;
                    return {
                        ...prev,
                        chat: {
                            ...prev.chat,
                            messages: [...prev.chat.messages, message],
                        },
                    };
                });
            }
        });

        socket.on("error", (error) => {
            console.error("WebSocket error:", error);
            // Optionally show error to user
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("message");
            socket.off("error");
        };
    }, [selectedChatId]);

    useEffect(() => {
        scrollToBottom()
    }, [chatData?.chat?.messages])

    useEffect(() => {
        const fetchChats = async () => {
            const token = getTokenFromCookie("token")
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}my-chats`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                const data = await res.json()
                if (res.ok && Array.isArray(data.chats)) {
                    const mappedChats = data.chats.map((chat: any) => ({
                        id: chat.chat_id,
                        last_message: chat.lastMessage?.message || "",
                        last_message_time: chat.lastMessage?.created_at || "",
                        unread_count: chat.lastMessage?.read_at ? 0 : 1,
                        other_user: {
                            id: chat.user.id,
                            realname: chat.user.realname || chat.user.username,
                            username: chat.user.username,
                            photo_url: chat.user.photo_url || "/placeholder.svg",
                            online_status: "offline", // update if API provides
                        },
                    }))
                    setChats(mappedChats)

                    // Find chat by username param
                    const selected = mappedChats.find(
                        (chat) => chat.other_user.username === params.username
                    )
                    if (selected) {
                        setSelectedChatId(selected.id)
                        setSelectedChatUser(selected.other_user.id)
                    }
                } else {
                    setChats([])
                }
            } catch {
                setChats([])
            }
            setLoadingChats(false)
        }
        fetchChats()
    }, [params.username])

    useEffect(() => {
        if (!selectedChatId) return
        const fetchChatMessages = async () => {
            setLoadingMessages(true)
            const token = getTokenFromCookie("token")
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}chat/${selectedChatId}/messages`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                const data = await res.json()
                if (res.ok && data.chat) {
                    setChatData(data)
                } else {
                    setChatData(null)
                }
            } catch {
                setChatData(null)
            }
            setLoadingMessages(false)
        }
        fetchChatMessages()
    }, [selectedChatId])

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedChatUser) return
        const token = getTokenFromCookie("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}chat/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    receiver_id: selectedChatUser,
                    message: newMessage,
                }),
            })
            if (res.ok) {
                setNewMessage("")
                // Emit socket event for real-time update
                socket.emit("message", {
                    chat_id: selectedChatId,
                    sender_id: currentUserId,
                    receiver_id: selectedChatUser,
                    message: newMessage,
                    timestamp: new Date().toISOString(),
                })
                // Optionally refresh messages from API
                const fetchChatMessages = async () => {
                    setLoadingMessages(true)
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}chat/${selectedChatId}/messages`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    })
                    const data = await res.json()
                    if (res.ok && data.chat) {
                        setChatData(data)
                    }
                    setLoadingMessages(false)
                }
                fetchChatMessages()
            }
        } catch {
            // Optionally show error
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const filteredChats = chats.filter(
        (chat) =>
            chat.other_user.realname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.last_message.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const selectedChat = chats.find((chat) => chat.id === selectedChatId)
    const otherUser = selectedChatId === chatData?.chat?.id ? chatData?.chat?.user_two : selectedChat?.other_user

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

        if (diffInHours < 24) {
            return date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            })
        }
    }

    const getOnlineStatusColor = (status: string) => {
        switch (status) {
            case "online":
                return "bg-green-500"
            case "away":
                return "bg-yellow-500"
            default:
                return "bg-gray-400"
        }
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Chat List - Left Side */}
            <div className="w-70 border-r bg-card flex flex-col">
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

                {/* Chat List */}
                <ScrollArea className="flex-1">
                    <div className="p-2">
                        {filteredChats.map((chat) => (
                            <Link key={chat.id} href={`/messages/${chat.other_user.username}`}>
                                <div
                                    className={cn(
                                        "flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors",
                                        selectedChatId === chat.id ? "bg-accent" : "",
                                    )}
                                >
                                    <div className="relative">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={chat.other_user.photo_url || "/placeholder.svg"} alt={chat.other_user.realname} />
                                            <AvatarFallback>
                                                {chat.other_user.realname
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div
                                            className={cn(
                                                "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                                                getOnlineStatusColor(chat.other_user.online_status),
                                            )}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium truncate">{chat.other_user.realname}</h4>
                                            <span className="text-xs text-muted-foreground">{formatTime(chat.last_message_time)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground truncate">{chat.last_message}</p>
                                            {chat.unread_count > 0 && (
                                                <Badge
                                                    variant="destructive"
                                                    className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                                                >
                                                    {chat.unread_count}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Chat Conversation - Right Side */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="border-b p-4 flex items-center justify-between bg-card">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={otherUser?.photo_url || "/placeholder.svg"} alt={otherUser?.realname} />
                                <AvatarFallback>
                                    {otherUser?.realname
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("") || "U"}
                                </AvatarFallback>
                            </Avatar>
                            {selectedChat && (
                                <div
                                    className={cn(
                                        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                                        getOnlineStatusColor(selectedChat.other_user.online_status),
                                    )}
                                />
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold">{otherUser?.realname}</h3>
                            <p className="text-sm text-muted-foreground">
                                {selectedChat?.other_user.online_status === "online"
                                    ? "Online"
                                    : selectedChat?.other_user.online_status === "away"
                                        ? "Away"
                                        : "Offline"}
                            </p>
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
                            <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {chatData?.chat?.messages?.map((message) => {
                            const isCurrentUser = message.sender_id === currentUserId
                            const sender = isCurrentUser ? chatData.chat.user_one : chatData.chat.user_two

                            return (
                                <div
                                    key={message.id}
                                    className={cn("flex items-start space-x-2", isCurrentUser ? "flex-row-reverse space-x-reverse" : "")}
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={sender.photo_url || "/placeholder.svg"} alt={sender.realname} />
                                        <AvatarFallback>
                                            {sender.realname
                                                ?.split(" ")
                                                .map((n) => n[0])
                                                .join("") || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div
                                        className={cn(
                                            "max-w-[70%] rounded-lg p-3",
                                            isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted",
                                        )}
                                    >
                                        <p className="text-sm">{message.message}</p>
                                        <p
                                            className={cn(
                                                "text-xs mt-1",
                                                isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground",
                                            )}
                                        >
                                            {formatTime(message.created_at)}
                                            {isCurrentUser && message.read_at && <span className="ml-1">✓✓</span>}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4 bg-card">
                    <div className="flex items-center space-x-2">
                        <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-1"
                        />
                        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
