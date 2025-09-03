"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, Heart, MessageCircle, Calendar, TrendingUp, Edit, Settings, TrendingUpIcon, ListStartIcon, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-context"
import { useToast } from "@/hooks/use-toast"

type IconKey = keyof typeof iconMap
const profileCompletion = {
	rate: 85,
	actions: [
		{ label: "Add Photos" },
		{ label: "Update Bio" },
		{ label: "Set Preferences" },
	],
}
const recentActivities = [
	{
		id: 1,
		icon: "Heart",
		color: "text-red-500",
		title: "New match with Sarah Johnson",
		time: "2 days ago",
	},
	{
		id: 2,
		icon: "Eye",
		color: "text-blue-500",
		title: "Your profile was viewed 15 times",
		time: "Yesterday",
	},
	{
		id: 3,
		icon: "Calendar",
		color: "text-purple-500",
		title: 'Joined "Speed Dating Night" event',
		time: "3 days ago",
	},
]
export default function DashboardPage() {
	const { user } = useAuth()
	const [recentMatches, setRecentMatches] = useState<any[]>([])
	const [loadingMatches, setLoadingMatches] = useState(true)
	const [recentMessages, setRecentMessages] = useState<any[]>([])
	const [loadingMessages, setLoadingMessages] = useState(true)
	const [dashboardStatsData, setDashboardStatsData] = useState({
		profileViews: 0,
		totalMatches: 0,
		totalEventsJoined: 0,
		messages: 0,
	})
	const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
	const [loadingEvents, setLoadingEvents] = useState(true)
	const { toast } = useToast()

	const iconMap = {
		Eye,
		Heart,
		MessageCircle,
		Calendar,
		TrendingUp,
		Edit,
		Settings,
	}

	function getTokenFromCookie(name: string) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop()?.split(';').shift() || "";
		return "";
	}

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
					setDashboardStatsData((prev) => ({
						...prev,
						profileViews: data.data.profile_views,
						totalMatches: data.data.total_matches,
						totalEventsJoined: data.data.total_events_joined,
					}))
				}
			} catch {
				toast({ title: "Error", description: "Failed to load dashboard stats.", variant: "destructive" })
			}
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
						date: event.start_date,
						time: event.time,
						location: event.location,
						image: event.image,
						description: event.description,
					}])
				} else {
					setUpcomingEvents([])
				}
			} catch {
				setUpcomingEvents([])
			}
			setLoadingEvents(false)
		}

		fetchStats()
		fetchUpcomingEvents()
	}, [])

	// Messages stat from messages API
	useEffect(() => {
		const fetchMessages = async () => {
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
					const messages = data.chats.map((chat: any) => ({
						id: chat.user.id,
						name: chat.user.realname || chat.user.username,
						image: chat.user.photo_url || "/placeholder.svg",
						message: chat.lastMessage?.message || "",
						time: chat.lastMessage?.created_at
							? new Date(chat.lastMessage.created_at).toLocaleString()
							: "",
						unread: !chat.lastMessage?.read_at,
					}))
					setRecentMessages(messages)
					setDashboardStatsData((prev) => ({
						...prev,
						messages: messages.length,
					}))
				} else {
					setRecentMessages([])
					setDashboardStatsData((prev) => ({
						...prev,
						messages: 0,
					}))
				}
			} catch {
				setRecentMessages([])
				setDashboardStatsData((prev) => ({
					...prev,
					messages: 0,
				}))
			}
			setLoadingMessages(false)
		}
		fetchMessages()
	}, [])

	useEffect(() => {
		const fetchMatches = async () => {
			const token = getTokenFromCookie("token")
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
					// Map API data to UI format
					const matches = data.data.map((item: any) => {
						const user = item.user
						return {
							id: user.id,
							name: user.realname || user.username,
							age: user.birthdate ? new Date().getFullYear() - new Date(user.birthdate).getFullYear() : null,
							image: user.photo_url || "/placeholder.svg",
							matchDate: item.updated_at ? new Date(item.updated_at).toLocaleDateString() : "",
							compatibility: 90, // You can update this if API provides compatibility
						}
					})
					setRecentMatches(matches)
				}
			} catch (err) {
				setRecentMatches([])
			}
			setLoadingMatches(false)
		}
		fetchMatches()
	}, [])

	// Replace dashboardStats with API data
	const dashboardStats = [
		{
			key: "profileViews",
			label: "Profile Views",
			value: dashboardStatsData.profileViews,
			icon: "Eye",
			trend: "+12% this week",
			trendIcon: "TrendingUp",
			trendColor: "green",
		},
		{
			key: "totalMatches",
			label: "Total Matches",
			value: dashboardStatsData.totalMatches,
			icon: "Heart",
			trend: "+3 new matches",
			trendIcon: "TrendingUp",
			trendColor: "green",
		},
		{
			key: "messages",
			label: "Messages",
			value: dashboardStatsData.messages,
			icon: "MessageCircle",
			trend: "5 unread",
			trendIcon: "MessageCircle",
			trendColor: "blue",
		},
		{
			key: "eventsJoined",
			label: "Events Joined",
			value: dashboardStatsData.totalEventsJoined,
			icon: "Calendar",
			trend: "2 upcoming",
			trendIcon: "Calendar",
			trendColor: "purple",
		},
	]

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold">
    Welcome back, {user?.realname || "User"}!
  </h1>
						<p className="text-muted-foreground">Here's what's happening in your dating journey</p>
					</div>
					<div className="flex gap-2">
						<Link href="/profile/edit">
							<Button variant="outline">
								<Edit className="h-4 w-4 mr-2" />
								Edit Profile
							</Button>
						</Link>
						<Link href="/profile/settings">
							<Button variant="outline">
								<Settings className="h-4 w-4 mr-2" />
								Settings
							</Button>
						</Link>
					</div>
				</div>
				{/* Dashboard Stats */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{dashboardStats.map((stat) => {
						const StatIcon = iconMap[stat.icon as IconKey]
						const TrendIcon = iconMap[stat.trendIcon as IconKey]
						return (
							<Card key={stat.key}>
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
											<p className="text-2xl font-bold">{stat.value}</p>
											<p className={`text-xs text-${stat.trendColor}-600 flex items-center mt-1`}>
												<TrendIcon className="h-3 w-3 mr-1" />
												{stat.trend}
											</p>
										</div>
										<StatIcon className={`h-8 w-8 text-${stat.trendColor}-500`} />
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Profile Completion */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									Profile Completion
									<Badge variant="secondary">{profileCompletion?.rate}%</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<Progress value={profileCompletion.rate} className="h-2" />
									<div className="text-sm text-muted-foreground">
										Complete your profile to get better matches and more visibility
									</div>
									<div className="flex gap-2">
										{profileCompletion.actions.map((action) => (
											<Button key={action.label} size="sm" variant="outline">
												{action.label}
											</Button>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Recent Matches */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									Recent Matches
									<Link href="/matches">
										<Button variant="ghost" size="sm">
											View All
										</Button>
									</Link>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{loadingMatches ? (
										<div className="text-center text-muted-foreground">Loading...</div>
									) : recentMatches.length === 0 ? (
										<div className="text-center text-muted-foreground">No matches found.</div>
									) : (
										recentMatches.map((match) => (
											<div key={match.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
												<div className="flex items-center space-x-3">
													<img
														src={match.image}
														alt={match.name}
														className="w-12 h-12 rounded-full object-cover"
													/>
													<div>
														<p className="font-medium">
															{match.name}{match.age ? `, ${match.age}` : ""}
														</p>
														<p className="text-sm text-muted-foreground">
															Matched {match.matchDate} • {match.compatibility}% compatible
														</p>
													</div>
												</div>
												<Button size="sm" className="bg-red-500 hover:bg-red-600">
													<MessageCircle className="h-4 w-4 mr-1" />
													Message
												</Button>
											</div>
										))
									)}
								</div>
							</CardContent>
						</Card>

						{/* Recent Activity */}
						{/* <Card>
							<CardHeader>
								<CardTitle>Recent Activity</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{recentActivities.map((activity) => (
										<div key={activity.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
											<div className={activity.color}>
												<activity.icon className="h-5 w-5" />
											</div>
											<div>
												<p className="font-medium">{activity.title}</p>
												<p className="text-sm text-muted-foreground">{activity.time}</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card> */}
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Recent Messages */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									Messages
									<Link href="/messages">
										<Button variant="ghost" size="sm">
											View All
										</Button>
									</Link>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{loadingMessages ? (
										<div className="text-center text-muted-foreground">Loading...</div>
									) : recentMessages.length === 0 ? (
										<div className="text-center text-muted-foreground">No messages found.</div>
									) : (
										recentMessages.map((message) => (
											<div
												key={message.id}
												className="flex items-start space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer"
											>
												<img
													src={message.image || "/placeholder.svg"}
													alt={message.name}
													className="w-8 h-8 rounded-full object-cover"
												/>
												<div className="flex-1 min-w-0">
													<div className="flex items-center justify-between">
														<p className="font-medium text-sm truncate">{message.name}</p>
														{message.unread && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
													</div>
													<p className="text-xs text-muted-foreground truncate">{message.message}</p>
													<p className="text-xs text-muted-foreground">{message.time}</p>
												</div>
											</div>
										))
									)}
								</div>
							</CardContent>
						</Card>

						{/* Upcoming Events */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									Upcoming Events
									<Link href="/events">
										<Button variant="ghost" size="sm">
											View All
										</Button>
									</Link>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{loadingEvents ? (
										<div className="text-center text-muted-foreground">Loading...</div>
									) : upcomingEvents.length === 0 ? (
										<div className="text-center text-muted-foreground">No upcoming events found.</div>
									) : (
										upcomingEvents.map((event) => (
											<div key={event.id} className="p-3 bg-muted rounded-lg flex items-center gap-3">
												<img src={event.image} alt={event.title} className="w-16 h-16 object-cover rounded-lg" />
												<div>
													<p className="font-medium text-sm">{event.title}</p>
													<p className="text-xs text-muted-foreground">
														{event.date} at {event.time}
													</p>
													<p className="text-xs text-muted-foreground">{event.location}</p>
												</div>
											</div>
										))
									)}
								</div>
							</CardContent>
						</Card>

						{/* Quick Actions */}
						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<Link href="/meet">
										<Button className="w-full justify-start bg-transparent" variant="outline">
											<Heart className="h-4 w-4 mr-2" />
											Discover People
										</Button>
									</Link>
									<Link href="/search">
										<Button className="w-full justify-start bg-transparent" variant="outline">
											<Users className="h-4 w-4 mr-2" />
											Advanced Search
										</Button>
									</Link>
									<Link href="/events">
										<Button className="w-full justify-start bg-transparent" variant="outline">
											<Calendar className="h-4 w-4 mr-2" />
											Browse Events
										</Button>
									</Link>
									<Link href="/groups">
										<Button className="w-full justify-start bg-transparent" variant="outline">
											<Users className="h-4 w-4 mr-2" />
											Join Groups
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
