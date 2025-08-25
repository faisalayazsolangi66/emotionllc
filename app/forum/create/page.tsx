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
import { ArrowLeft, Upload, X, Plus, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = [
  "Introductions",
  "Dating Advice",
  "Success Stories",
  "Events & Meetups",
  "General Discussion",
  "Relationships",
  "Self-Improvement",
]

export default function CreateForumThreadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    isPinned: false,
    isLocked: false,
    allowReplies: true,
    image: null as File | null,
    poll: {
      enabled: false,
      question: "",
      options: ["", ""],
    },
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePollChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      poll: { ...prev.poll, [field]: value },
    }))
  }

  const addPollOption = () => {
    if (formData.poll.options.length < 6) {
      setFormData((prev) => ({
        ...prev,
        poll: {
          ...prev.poll,
          options: [...prev.poll.options, ""],
        },
      }))
    }
  }

  const removePollOption = (index: number) => {
    if (formData.poll.options.length > 2) {
      setFormData((prev) => ({
        ...prev,
        poll: {
          ...prev.poll,
          options: prev.poll.options.filter((_, i) => i !== index),
        },
      }))
    }
  }

  const updatePollOption = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      poll: {
        ...prev.poll,
        options: prev.poll.options.map((option, i) => (i === index ? value : option)),
      },
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleInputChange("image", file)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
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
        title: "Thread Created!",
        description: "Your forum thread has been created successfully.",
      })

      router.push("/forum")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create thread. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Create New Thread</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Thread Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Thread Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter thread title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
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
                    <Label htmlFor="body">Thread Content *</Label>
                    <Textarea
                      id="body"
                      value={formData.body}
                      onChange={(e) => handleInputChange("body", e.target.value)}
                      placeholder="Write your thread content here..."
                      rows={8}
                      required
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <Label>Attach Image (Optional)</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="mt-2">
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <span className="text-sm text-red-500 hover:text-red-600">Upload an image</span>
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

                {/* Poll Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="poll">Include Poll</Label>
                      <p className="text-sm text-gray-500">Add a poll to your thread</p>
                    </div>
                    <Switch
                      id="poll"
                      checked={formData.poll.enabled}
                      onCheckedChange={(checked) => handlePollChange("enabled", checked)}
                    />
                  </div>

                  {formData.poll.enabled && (
                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div>
                        <Label htmlFor="pollQuestion">Poll Question *</Label>
                        <Input
                          id="pollQuestion"
                          value={formData.poll.question}
                          onChange={(e) => handlePollChange("question", e.target.value)}
                          placeholder="What's your poll question?"
                          required={formData.poll.enabled}
                        />
                      </div>

                      <div>
                        <Label>Poll Options *</Label>
                        <div className="space-y-2 mt-2">
                          {formData.poll.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Input
                                value={option}
                                onChange={(e) => updatePollOption(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                required={formData.poll.enabled}
                              />
                              {formData.poll.options.length > 2 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removePollOption(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        {formData.poll.options.length < 6 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addPollOption}
                            className="mt-2 bg-transparent"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Option
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
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
                  <p className="text-xs text-gray-500 mt-1">Add up to 5 tags to help categorize your thread</p>
                </div>

                {/* Thread Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pinned">Pin Thread</Label>
                      <p className="text-sm text-gray-500">Keep this thread at the top</p>
                    </div>
                    <Switch
                      id="pinned"
                      checked={formData.isPinned}
                      onCheckedChange={(checked) => handleInputChange("isPinned", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="locked">Lock Thread</Label>
                      <p className="text-sm text-gray-500">Prevent new replies</p>
                    </div>
                    <Switch
                      id="locked"
                      checked={formData.isLocked}
                      onCheckedChange={(checked) => handleInputChange("isLocked", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowReplies">Allow Replies</Label>
                      <p className="text-sm text-gray-500">Users can reply to this thread</p>
                    </div>
                    <Switch
                      id="allowReplies"
                      checked={formData.allowReplies}
                      onCheckedChange={(checked) => handleInputChange("allowReplies", checked)}
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.title || !formData.body || !formData.category}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isLoading ? "Creating..." : "Create Thread"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
