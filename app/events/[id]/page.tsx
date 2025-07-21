"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Share2, Heart, MessageCircle, Star, Camera } from "lucide-react"

const eventData = {
  id: 1,
  title: "Speed Dating Night - Downtown",
  description:
    "Join us for an exciting evening of speed dating in the heart of downtown! Meet 10+ singles in one fun-filled night with structured conversations designed to help you make meaningful connections. Our professional hosts will guide you through the evening, ensuring everyone has a great time.",
  longDescription: `
    <h3>What to Expect</h3>
    <p>Our speed dating events are carefully organized to maximize your chances of meeting someone special. Each date lasts 5 minutes, giving you enough time to get a feel for someone while keeping the energy high throughout the evening.</p>
    
    <h3>How It Works</h3>
    <ul>
      <li>Check-in starts at 6:30 PM with welcome drinks</li>
      <li>Brief introduction and explanation of the format</li>
      <li>Speed dating rounds begin at 7:00 PM</li>
      <li>10-minute break halfway through for refreshments</li>
      <li>Final rounds and wrap-up by 9:30 PM</li>
      <li>Match results sent via email the next day</li>
    </ul>

    <h3>What's Included</h3>
    <ul>
      <li>Welcome drink upon arrival</li>
      <li>Professional event hosting</li>
      <li>Scorecards and pens</li>
      <li>Light appetizers during break</li>
      <li>Match notification service</li>
    </ul>

    <h3>Dress Code</h3>
    <p>Smart casual attire recommended. You want to look your best while feeling comfortable!</p>
  `,
  image: "/placeholder.svg?height=400&width=800&text=Speed+Dating+Event",
  date: "2024-02-15",
  time: "7:00 PM - 10:00 PM",
  location: "The Rooftop Bar",
  address: "123 Main St, New York, NY 10001",
  price: 35,
  category: "Speed Dating",
  ageRange: "25-35",
  attendees: 24,
  maxAttendees: 30,
  organizer: {
    name: "Emotions Events Team",
    image: "/placeholder.svg?height=60&width=60&text=EET",
    rating: 4.9,
    eventsHosted: 127,
  },
  features: [
    "Professional hosting",
    "Welcome drinks included",
    "Light appetizers",
    "Match notification service",
    "Structured format",
    "Safe environment",
  ],
  requirements: [
    "Must be between 25-35 years old",
    "Valid ID required",
    "Arrive 15 minutes early",
    "Respectful behavior expected",
    "No phones during dating rounds",
  ],
}

const attendees = [
  { name: "Sarah J.", image: "/placeholder.svg?height=32&width=32&text=SJ", age: 28 },
  { name: "Michael C.", image: "/placeholder.svg?height=32&width=32&text=MC", age: 32 },
  { name: "Emma R.", image: "/placeholder.svg?height=32&width=32&text=ER", age: 26 },
  { name: "David K.", image: "/placeholder.svg?height=32&width=32&text=DK", age: 30 },
  { name: "Lisa M.", image: "/placeholder.svg?height=32&width=32&text=LM", age: 29 },
  { name: "Alex T.", image: "/placeholder.svg?height=32&width=32&text=AT", age: 27 },
]

const reviews = [
  {
    id: 1,
    author: "Jennifer L.",
    avatar: "/placeholder.svg?height=32&width=32&text=JL",
    rating: 5,
    comment:
      "Amazing event! Met some really interesting people and the organization was perfect. Definitely attending the next one!",
    date: "1 week ago",
  },
  {
    id: 2,
    author: "Mark S.",
    avatar: "/placeholder.svg?height=32&width=32&text=MS",
    rating: 5,
    comment: "Great atmosphere and well-organized. The hosts made everyone feel comfortable. Got 3 matches!",
    date: "2 weeks ago",
  },
  {
    id: 3,
    author: "Rachel K.",
    avatar: "/placeholder.svg?height=32&width=32&text=RK",
    rating: 4,
    comment: "Fun evening with a good mix of people. The venue was perfect and the format worked really well.",
    date: "3 weeks ago",
  },
]

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [isJoined, setIsJoined] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const spotsLeft = eventData.maxAttendees - eventData.attendees

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-8">
            <img
              src={eventData.image || "/placeholder.svg"}
              alt={eventData.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {eventData.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{eventData.title}</h1>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(eventData.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {eventData.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {eventData.location}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="attendees">Attendees</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">About This Event</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{eventData.description}</p>

                      <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: eventData.longDescription }}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">What's Included</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {eventData.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Requirements</h3>
                      <div className="space-y-2">
                        {eventData.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span className="text-sm text-muted-foreground">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="attendees" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Who's Coming ({eventData.attendees})</span>
                        <Badge variant="secondary">{spotsLeft} spots left</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {attendees.map((attendee, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                            <Avatar>
                              <AvatarImage src={attendee.image || "/placeholder.svg"} />
                              <AvatarFallback>
                                {attendee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{attendee.name}</p>
                              <p className="text-xs text-muted-foreground">Age {attendee.age}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-6">
                        <Button variant="outline">View All Attendees</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        Reviews ({reviews.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start space-x-3">
                              <Avatar>
                                <AvatarImage src={review.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {review.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="font-medium">{review.author}</p>
                                  <span className="text-sm text-muted-foreground">{review.date}</span>
                                </div>
                                <div className="flex items-center mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="photos" className="space-y-6 mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center py-12">
                        <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Photos Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Photos from this event will be shared here after the event.
                        </p>
                        <Button variant="outline">Upload Photos</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-red-500 mb-2">${eventData.price}</div>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{new Date(eventData.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{eventData.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Age Range</span>
                      <span className="font-medium">{eventData.ageRange}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Spots Left</span>
                      <Badge variant={spotsLeft < 5 ? "destructive" : "secondary"}>{spotsLeft} remaining</Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-red-500 hover:bg-red-600 mb-4" onClick={() => setIsJoined(!isJoined)}>
                    {isJoined ? "Cancel Registration" : "Join Event"}
                  </Button>

                  <div className="text-center text-xs text-muted-foreground">
                    Free cancellation up to 24 hours before
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{eventData.location}</p>
                      <p className="text-sm text-muted-foreground">{eventData.address}</p>
                    </div>
                    <div className="bg-muted h-32 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Map View</p>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Organizer Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src={eventData.organizer.image || "/placeholder.svg"} />
                      <AvatarFallback>EET</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{eventData.organizer.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                        {eventData.organizer.rating} • {eventData.organizer.eventsHosted} events
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Organizer
                  </Button>
                </CardContent>
              </Card>

              {/* Similar Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Similar Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "Wine Tasting Mixer", date: "Feb 20", price: 45 },
                    { title: "Singles Hiking", date: "Feb 25", price: 0 },
                    { title: "Cooking Class", date: "Mar 1", price: 55 },
                  ].map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{event.price === 0 ? "Free" : `$${event.price}`}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
