"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Heart, MessageCircle, Share2, Bookmark, ThumbsUp, Send } from "lucide-react"

const blogPost = {
  id: 1,
  title: "10 Tips for Creating the Perfect Dating Profile",
  content: `
    <p>Creating an attractive and authentic dating profile is crucial for finding meaningful connections online. Your profile is your first impression, and it can make or break your chances of finding that special someone. Here are ten expert tips to help you craft a profile that truly represents who you are while attracting the right kind of attention.</p>

    <h2>1. Choose the Right Profile Photo</h2>
    <p>Your main profile photo is the most important element of your dating profile. It should be a clear, recent photo of just you, with good lighting and a genuine smile. Avoid group photos, sunglasses, or heavily filtered images for your main picture.</p>

    <h2>2. Show Your Personality Through Photos</h2>
    <p>Use your additional photos to showcase different aspects of your life. Include photos of you doing activities you enjoy, traveling, or spending time with friends (but make sure you're clearly identifiable in group shots).</p>

    <h2>3. Write an Engaging Bio</h2>
    <p>Your bio should be authentic, positive, and give potential matches a sense of who you are. Avoid clichés like "I love to laugh" and instead share specific details about your interests, hobbies, and what you're looking for.</p>

    <h2>4. Be Honest About Your Intentions</h2>
    <p>Whether you're looking for something casual or a serious relationship, be upfront about your intentions. This helps attract people who are looking for the same thing and saves everyone time.</p>

    <h2>5. Highlight Your Unique Qualities</h2>
    <p>What makes you different from everyone else? Maybe you speak three languages, have traveled to 20 countries, or make the world's best chocolate chip cookies. These unique details make you memorable.</p>

    <h2>6. Use Humor Wisely</h2>
    <p>A little humor can go a long way in making your profile stand out, but make sure it's appropriate and reflects your actual personality. Avoid controversial jokes or anything that could be misinterpreted.</p>

    <h2>7. Keep It Positive</h2>
    <p>Focus on what you want rather than what you don't want. Instead of listing deal-breakers, talk about the qualities you appreciate in others and the experiences you'd like to share.</p>

    <h2>8. Update Regularly</h2>
    <p>Keep your profile fresh by updating your photos and bio regularly. This shows that you're active on the platform and gives you new conversation starters.</p>

    <h2>9. Proofread Everything</h2>
    <p>Spelling and grammar mistakes can be a turn-off for many people. Take the time to proofread your profile before publishing it, or ask a friend to review it for you.</p>

    <h2>10. Be Patient and Stay Authentic</h2>
    <p>Finding the right person takes time, and it's important to stay true to yourself throughout the process. Don't try to be someone you're not just to attract more matches – the right person will appreciate the real you.</p>

    <p>Remember, your dating profile is just the beginning. The real magic happens when you start having genuine conversations and getting to know each other. Use these tips as a foundation, but don't forget that authenticity and kindness are the most attractive qualities of all.</p>
  `,
  excerpt:
    "Learn how to showcase your best self and attract meaningful connections with these expert tips for crafting an irresistible dating profile.",
  image: "/placeholder.svg?height=400&width=800&text=Dating+Profile+Tips",
  author: {
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=60&width=60&text=SJ",
    bio: "Dating coach and relationship expert with over 10 years of experience helping singles find love.",
    followers: 15420,
  },
  publishDate: "2024-01-15",
  readTime: "5 min read",
  category: "Dating Tips",
  tags: ["dating", "profile", "tips", "online-dating", "relationships"],
  stats: {
    likes: 124,
    comments: 18,
    shares: 32,
    bookmarks: 67,
  },
}

const comments = [
  {
    id: 1,
    author: "Alex Chen",
    avatar: "/placeholder.svg?height=32&width=32&text=AC",
    content:
      "This is so helpful! I've been struggling with my profile for weeks. The tip about being specific instead of using clichés really resonates with me.",
    timestamp: "2 hours ago",
    likes: 5,
  },
  {
    id: 2,
    author: "Maria Garcia",
    avatar: "/placeholder.svg?height=32&width=32&text=MG",
    content:
      "Great advice! I especially love the point about staying positive. It's so much more attractive when someone focuses on what they want rather than complaining about past experiences.",
    timestamp: "4 hours ago",
    likes: 8,
  },
  {
    id: 3,
    author: "David Kim",
    avatar: "/placeholder.svg?height=32&width=32&text=DK",
    content:
      "The photo tips are gold! I never realized how important lighting was until I started paying attention to it. Got way more matches after updating my main photo.",
    timestamp: "1 day ago",
    likes: 12,
  },
]

const relatedPosts = [
  {
    id: 2,
    title: "First Date Ideas That Actually Work",
    image: "/placeholder.svg?height=100&width=150&text=First+Date",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Building Confidence for Dating Success",
    image: "/placeholder.svg?height=100&width=150&text=Confidence",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Red Flags to Watch Out For",
    image: "/placeholder.svg?height=100&width=150&text=Red+Flags",
    readTime: "4 min read",
  },
]

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [likes, setLikes] = useState(blogPost.stats.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      // Handle comment submission
      console.log("New comment:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {blogPost.category}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{blogPost.excerpt}</p>

            {/* Author and Meta Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={blogPost.author.image || "/placeholder.svg"} />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{blogPost.author.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(blogPost.publishDate).toLocaleDateString()}
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    {blogPost.readTime}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className={isLiked ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                  {likes}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "text-blue-500 border-blue-500" : ""}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={blogPost.image || "/placeholder.svg"}
              alt={blogPost.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-8">
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  />

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {likes} likes
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {blogPost.stats.comments} comments
                        </div>
                        <div className="flex items-center">
                          <Share2 className="h-4 w-4 mr-1" />
                          {blogPost.stats.shares} shares
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Article
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="mt-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Comments ({blogPost.stats.comments})</h3>

                  {/* Add Comment */}
                  <div className="mb-6">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-3"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleComment} disabled={!newComment.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {comment.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">{comment.author}</p>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                          <div className="flex items-center mt-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage src={blogPost.author.image || "/placeholder.svg"} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold mb-2">{blogPost.author.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{blogPost.author.bio}</p>
                    <div className="text-sm text-muted-foreground mb-4">
                      {blogPost.author.followers.toLocaleString()} followers
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600">Follow Author</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Related Articles</h4>
                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`}>
                        <div className="flex space-x-3 hover:bg-muted p-2 rounded-lg transition-colors">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm line-clamp-2">{post.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{post.readTime}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Stay Updated</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest dating tips and relationship advice delivered to your inbox.
                  </p>
                  <Button className="w-full bg-red-500 hover:bg-red-600">Subscribe to Newsletter</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
