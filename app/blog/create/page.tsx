"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Upload, X, Plus, FileText, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = [
  "Dating Tips",
  "Relationships",
  "Self-Improvement",
  "Success Stories",
  "Lifestyle",
  "Health & Wellness",
]
const readTimes = ["3 min read", "5 min read", "7 min read", "10 min read", "15 min read", "20+ min read"]

export default function CreateBlogPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    readTime: "",
    image: null as File | null,
    author: "",
    isDraft: true,
    allowComments: true,
    featured: false,
    metaDescription: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("image", file)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: formData.isDraft ? "Draft Saved!" : "Blog Published!",
        description: formData.isDraft
          ? "Your blog post has been saved as draft."
          : "Your blog post has been published successfully.",
      })

      router.push("/blog")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">Create New Blog Post</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? "Edit" : "Preview"}
              </Button>
            </div>
          </div>

          {!isPreview ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Blog Post Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt *</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange("excerpt", e.target.value)}
                        placeholder="Write a compelling excerpt that summarizes your post"
                        rows={3}
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">This will appear in blog listings and search results</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="readTime">Estimated Read Time *</Label>
                        <Select
                          value={formData.readTime}
                          onValueChange={(value) => handleInputChange("readTime", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select read time" />
                          </SelectTrigger>
                          <SelectContent>
                            {readTimes.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="author">Author Name</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => handleInputChange("author", e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      placeholder="Write your blog post content here..."
                      rows={15}
                      required
                      className="font-mono"
                    />
                    <p className="text-xs text-gray-500 mt-1">You can use Markdown formatting</p>
                  </div>

                  {/* Featured Image */}
                  <div>
                    <Label>Featured Image</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="mt-2">
                            <label htmlFor="image-upload" className="cursor-pointer">
                              <span className="text-sm text-red-500 hover:text-red-600">Upload featured image</span>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      </div>
                      {formData.image && (
                        <p className="text-sm text-green-600 mt-2">Image selected: {formData.image.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label>Tags (Optional)</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          #{tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Add up to 10 tags to help readers find your post</p>
                  </div>

                  {/* SEO */}
                  <div>
                    <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.metaDescription}
                      onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                      placeholder="Write a meta description for search engines"
                      rows={2}
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160 characters</p>
                  </div>

                  {/* Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="draft">Save as Draft</Label>
                        <p className="text-sm text-gray-500">Post won't be visible to readers</p>
                      </div>
                      <Switch
                        id="draft"
                        checked={formData.isDraft}
                        onCheckedChange={(checked) => handleInputChange("isDraft", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="comments">Allow Comments</Label>
                        <p className="text-sm text-gray-500">Readers can comment on this post</p>
                      </div>
                      <Switch
                        id="comments"
                        checked={formData.allowComments}
                        onCheckedChange={(checked) => handleInputChange("allowComments", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="featured">Featured Post</Label>
                        <p className="text-sm text-gray-500">Highlight this post on the blog homepage</p>
                      </div>
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleInputChange("featured", checked)}
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center justify-end space-x-4 pt-6">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleInputChange("isDraft", true)}
                      disabled={isLoading}
                    >
                      Save Draft
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || !formData.title || !formData.content || !formData.category}
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleInputChange("isDraft", false)}
                    >
                      {isLoading ? "Publishing..." : "Publish Post"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Preview Mode */
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <article className="prose prose-lg max-w-none">
                  {formData.image && (
                    <img
                      src="/placeholder.svg?height=300&width=600&text=Featured+Image"
                      alt="Featured"
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}

                  <div className="mb-6">
                    {formData.category && (
                      <Badge variant="secondary" className="mb-2">
                        {formData.category}
                      </Badge>
                    )}
                    <h1 className="text-4xl font-bold mb-4">{formData.title || "Your Blog Title"}</h1>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>By {formData.author || "Author Name"}</span>
                      <span className="mx-2">•</span>
                      <span>{formData.readTime || "5 min read"}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <p className="text-xl text-gray-600 mb-6">{formData.excerpt}</p>
                  </div>

                  <div className="whitespace-pre-wrap">
                    {formData.content || "Your blog content will appear here..."}
                  </div>

                  {tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
