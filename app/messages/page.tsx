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

// Mock data for chat list
const chatList = [
	{
		id: 1,
		user_one_id: 881120,
		user_two_id: 892590,
		last_message: "Hi, how are you sir?",
		last_message_time: "2025-08-22T12:21:26.000000Z",
		unread_count: 3,
		other_user: {
			id: 892590,
			realname: "Faisal Ayaz",
			username: "faisalayazsolangi12",
			photo_url: "https://www.emotionsllc.com/ow_userfiles/plugins/base/avatars/avatar_big_892590_.jpg",
			online_status: "online",
		},
	},
	{
		id: 2,
		user_one_id: 881120,
		user_two_id: 892591,
		last_message: "Thanks for the great evening!",
		last_message_time: "2025-08-22T10:15:30.000000Z",
		unread_count: 0,
		other_user: {
			id: 892591,
			realname: "Sarah Johnson",
			username: "sarahjohnson",
			photo_url: "/placeholder.svg?height=40&width=40&text=SJ",
			online_status: "offline",
		},
	},
	{
		id: 3,
		user_one_id: 881120,
		user_two_id: 892592,
		last_message: "Would love to meet up this weekend",
		last_message_time: "2025-08-21T18:45:12.000000Z",
		unread_count: 1,
		other_user: {
			id: 892592,
			realname: "Emily Chen",
			username: "emilychen",
			photo_url: "/placeholder.svg?height=40&width=40&text=EC",
			online_status: "online",
		},
	},
	{
		id: 4,
		user_one_id: 881120,
		user_two_id: 892593,
		last_message: "Looking forward to our date!",
		last_message_time: "2025-08-21T14:20:45.000000Z",
		unread_count: 0,
		other_user: {
			id: 892593,
			realname: "Michael Rodriguez",
			username: "michaelr",
			photo_url: "/placeholder.svg?height=40&width=40&text=MR",
			online_status: "away",
		},
	},
	{
		id: 5,
		user_one_id: 881120,
		user_two_id: 892594,
		last_message: "Great profile! Would love to chat more",
		last_message_time: "2025-08-20T16:30:22.000000Z",
		unread_count: 2,
		other_user: {
			id: 892594,
			realname: "Jessica Williams",
			username: "jessicaw",
			photo_url: "/placeholder.svg?height=40&width=40&text=JW",
			online_status: "online",
		},
	},
]

// Mock data for open chat (following the API structure)
const mockChatData = {
	chat: {
		id: 1,
		user_one_id: 881120,
		user_two_id: 892590,
		created_at: "2025-08-22T12:18:20.000000Z",
		updated_at: "2025-08-22T12:18:20.000000Z",
		messages: [
			{
				id: 1,
				chat_id: 1,
				sender_id: 892590,
				receiver_id: 881120,
				message: "Hey! I saw your profile and thought we might have a lot in common. How's your day going?",
				read_at: "2025-08-22T12:19:45.000000Z",
				created_at: "2025-08-22T12:19:34.000000Z",
				updated_at: "2025-08-22T12:19:34.000000Z",
			},
			{
				id: 2,
				chat_id: 1,
				sender_id: 881120,
				receiver_id: 892590,
				message:
					"Hi there! Thanks for reaching out. My day's been great, just finished a hiking trip. I see you're into outdoor activities too!",
				read_at: "2025-08-22T12:20:30.000000Z",
				created_at: "2025-08-22T12:20:57.000000Z",
				updated_at: "2025-08-22T12:20:57.000000Z",
			},
			{
				id: 3,
				chat_id: 1,
				sender_id: 892590,
				receiver_id: 881120,
				message:
					"That sounds amazing! I love hiking too. Where did you go? I'm always looking for new trails to explore.",
				read_at: null,
				created_at: "2025-08-22T12:21:26.000000Z",
				updated_at: "2025-08-22T12:21:26.000000Z",
			},
			{
				id: 4,
				chat_id: 1,
				sender_id: 881120,
				receiver_id: 892590,
				message: "I went to the Santa Monica Mountains. The views were incredible! Have you been there before?",
				read_at: null,
				created_at: "2025-08-22T12:22:15.000000Z",
				updated_at: "2025-08-22T12:22:15.000000Z",
			},
			{
				id: 5,
				chat_id: 1,
				sender_id: 892590,
				receiver_id: 881120,
				message:
					"No, but I've been wanting to check it out! Maybe we could go together sometime? I know some great spots in Malibu too.",
				read_at: null,
				created_at: "2025-08-22T12:23:45.000000Z",
				updated_at: "2025-08-22T12:23:45.000000Z",
			},
		],
		user_one: {
			id: 881120,
			first_name: "Alex",
			last_name: "Thompson",
			realname: "Alex Thompson",
			username: "alexthompson",
			email: "alex.thompson@example.com",
			photo_url: "/placeholder.svg?height=40&width=40&text=AT",
			sex: 1,
			birthdate: "1992-03-15T00:00:00.000000Z",
			city: "Los Angeles",
			state: "California",
			country: "USA",
			profession: "Software Engineer",
			interests: ["hiking", "photography", "cooking"],
			created_at: "2025-08-19T11:40:41.000000Z",
			updated_at: "2025-08-19T11:40:41.000000Z",
		},
		user_two: {
			id: 892590,
			first_name: "Faisal",
			last_name: "Ayaz",
			language: "English",
			country: "USA",
			state: "California",
			city: "Los Angeles",
			zip_code: "90001",
			profile_views: 0,
			gender: null,
			ethnicity: "Hispanic",
			interested_in: "female",
			body_type: "athletic",
			height: "180cm",
			marital_status: "single",
			looking_for: "friendship",
			hair_color: "black",
			phone: "+123456789",
			cooking: "sometimes",
			cooking_for_partner: "yes",
			drinking: "socially",
			favorite_color: "blue",
			ideal_first_date: "Dinner at a cozy restaurant",
			favorite_movie: "Inception",
			music_genre: "rock",
			outdoors: "hiking",
			personality_type: "extrovert",
			education: "bachelor",
			profession: "developer",
			preferences: {
				race: "not-important",
				height: "not-important",
				smoking: "not-important",
				drinking: "not-important",
				bodyType: "not-important",
				profession: "not-important",
				location: "not-important",
				politics: "not-important",
				religion: "not-important",
				maritalStatus: "not-important",
			},
			interests: ["traveling", "music", "coding"],
			email: "faisalayazsolangi12@example.com",
			username: "faisalayazsolangi12",
			role: "user",
			avatar_hash: null,
			avatar_status: "active",
			avatar_extension: ".jpg",
			relationship: null,
			realname: "Faisal Ayaz",
			sex: 2,
			match_sex: null,
			birthdate: "1995-05-20T00:00:00.000000Z",
			match_age: null,
			email_verified_at: null,
			created_at: "2025-08-21T12:15:04.000000Z",
			updated_at: "2025-08-21T12:15:04.000000Z",
			photo_url: "https://www.emotionsllc.com/ow_userfiles/plugins/base/avatars/avatar_big_892590_.jpg",
		},
	},
}

const currentUserId = 881120 // Current logged-in user

function getTokenFromCookie(name: string) {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop()?.split(";").shift() || ""
	return ""
}

export default function MessagesPage() {
	const [selectedChatId, setSelectedChatId] = useState<number>(1)
    const [selectedChatUser, setSelectedChatUser] = useState<number>(1)

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
		scrollToBottom()
	}, [chatData?.chat.messages])

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
					setChats(
						data.chats.map((chat: any) => ({
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
					)
				} else {
					setChats([])
				}
			} catch {
				setChats([])
			}
			setLoadingChats(false)
		}
		fetchChats()
	}, [])

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
                console.log("Fetched chat data:", data);
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
		if (!newMessage.trim() || !chatData?.chat?.user_two?.id) return
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
				// Refresh messages after sending
				setNewMessage("")
				// Optionally, you can refetch messages or optimistically add the message
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
	const otherUser = selectedChatId === chatData?.chat.id ? chatData?.chat.user_two : selectedChat?.other_user

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
								key={chat.id}
								// onClick={() => {setSelectedChatId(chat.id); setSelectedChatUser(chat.other_user.id)}}
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
						{chatData?.chat.messages.map((message) => {
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
