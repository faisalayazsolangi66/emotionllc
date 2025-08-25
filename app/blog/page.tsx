"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Calendar, MessageCircle, Heart, Plus } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Creating the Perfect Dating Profile",
    excerpt:
      "Learn how to showcase your best self and attract meaningful connections with these expert tips for crafting an irresistible dating profile.",
    image: "/placeholder.svg?height=200&width=400&text=Dating+Profile+Tips",
    author: "Sarah Johnson",
    authorImage: "/placeholder.svg?height=40&width=40&text=SJ",
    date: "2024-01-15",
    category: "Dating Tips",
    readTime: "5 min read",
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    title: "Navigating Long-Distance Relationships in the Digital Age",
    excerpt:
      "Discover strategies and tools to maintain strong connections with your partner across any distance, from video dates to surprise deliveries.",
    image: "/placeholder.svg?height=200&width=400&text=Long+Distance+Love",
    author: "Michael Chen",
    authorImage: "/placeholder.svg?height=40&width=40&text=MC",
    date: "2024-01-12",
    category: "Relationships",
    readTime: "8 min read",
    likes: 89,
    comments: 12,
  },
  {
    id: 3,
    title: "First Date Ideas That Actually Work",
    excerpt:
      "Move beyond coffee dates with these creative and engaging first date ideas that will help you make a lasting impression.",
    image: "/placeholder.svg?height=200&width=400&text=First+Date+Ideas",
    author: "Emma Rodriguez",
    authorImage: "/placeholder.svg?height=40&width=40&text=ER",
    date: "2024-01-10",
    category: "Dating Tips",
    readTime: "6 min read",
    likes: 156,
    comments: 24,
  },
  {
    id: 4,
    title: "Building Confidence for Dating Success",
    excerpt:
      "Overcome dating anxiety and build the confidence you need to put your best foot forward in the dating world.",
    image: "/placeholder.svg?height=200&width=400&text=Dating+Confidence",
    author: "David Kim",
    authorImage: "/placeholder.svg?height=40&width=40&text=DK",
    date: "2024-01-08",
    category: "Self-Improvement",
    readTime: "7 min read",
    likes: 203,
    comments: 31,
  },
]

const categories = ["All", "Dating Tips", "Relationships", "Self-Improvement", "Success Stories"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Dating & Relationship Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert advice, tips, and stories to help you navigate your dating journey and build meaningful
            relationships.
          </p>
        </div>

        {/* Write Article Button */}
        <div className="flex justify-center mb-8">
          <Link href="/blog/create">
            <Button className="bg-red-500 hover:bg-red-600">
              <Plus className="h-4 w-4 mr-2" />
              Write Article
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className={selectedCategory === category ? "bg-red-500 hover:bg-red-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={filteredPosts[0].image || "/placeholder.svg"}
                    alt={filteredPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="space-y-4">
                    <Badge variant="secondary">{filteredPosts[0].category}</Badge>
                    <h3 className="text-2xl font-bold">
                      <Link href={`/blog/${filteredPosts[0].id}`} className="hover:text-red-500 transition-colors">
                        {filteredPosts[0].title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground">{filteredPosts[0].excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={filteredPosts[0].authorImage || "/placeholder.svg"}
                          alt={filteredPosts[0].author}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="text-sm">
                          <p className="font-medium">{filteredPosts[0].author}</p>
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(filteredPosts[0].date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {filteredPosts[0].likes}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {filteredPosts[0].comments}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    <Link href={`/blog/${post.id}`} className="hover:text-red-500 transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <img
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or browse different categories.</p>
          </div>
        )}
      </div>
    </div>
  )
}
