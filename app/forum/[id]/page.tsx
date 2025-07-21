"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ThumbsUp, ThumbsDown, Send } from "lucide-react"

type Reply = {
  id: number
  author: string
  avatar: string
  content: string
  likes: number
  dislikes: number
}

const mockThread = {
  id: 1,
  title: "How do you maintain a healthy relationship while working remotely?",
  author: "Samantha Green",
  avatar: "/placeholder.svg?height=40&width=40&text=SG",
  createdAt: "2 days ago",
  body: `Working from home can blur the line between your job and personal life.  
Here are some tips that helped me:  
1. Set office hours 🕑  
2. Schedule quality time with your partner 📅  
3. Communicate expectations clearly 🗣️  

What works for you?`,
  replies: [
    {
      id: 101,
      author: "Michael Lee",
      avatar: "/placeholder.svg?height=40&width=40&text=ML",
      content: "Great points!  My wife and I also share a Google Calendar so we can see each other’s busy blocks.",
      likes: 12,
      dislikes: 1,
    },
    {
      id: 102,
      author: "Jenna Gomez",
      avatar: "/placeholder.svg?height=40&width=40&text=JG",
      content: "Separating work devices from personal devices really helped us create mental distance after 6 PM.",
      likes: 8,
      dislikes: 0,
    },
  ] as Reply[],
}

export default function ForumThreadPage() {
  // slug/id from the URL (we’re using mock data here)
  const { id } = useParams()

  const [replies, setReplies] = useState<Reply[]>(mockThread.replies)
  const [newReply, setNewReply] = useState("")

  const handleSubmit = () => {
    if (!newReply.trim()) return
    setReplies((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "You",
        avatar: "/placeholder.svg?height=40&width=40&text=U",
        content: newReply.trim(),
        likes: 0,
        dislikes: 0,
      },
    ])
    setNewReply("")
  }

  const vote = (replyId: number, type: "like" | "dislike") => {
    setReplies((prev) =>
      prev.map((r) =>
        r.id === replyId
          ? {
              ...r,
              likes: type === "like" ? r.likes + 1 : r.likes,
              dislikes: type === "dislike" ? r.dislikes + 1 : r.dislikes,
            }
          : r,
      ),
    )
  }

  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      {/* thread header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={mockThread.avatar || "/placeholder.svg"} alt={mockThread.author} />
              <AvatarFallback>{mockThread.author.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{mockThread.title}</CardTitle>
              <CardDescription className="text-xs">
                {mockThread.author} • {mockThread.createdAt}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="prose max-w-none whitespace-pre-wrap">{mockThread.body}</CardContent>
      </Card>

      {/* replies */}
      <section className="mt-8 space-y-6">
        {replies.map((reply) => (
          <Card key={reply.id}>
            <CardHeader className="flex flex-row items-start gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
                <AvatarFallback>{reply.author.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-sm">{reply.author}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" title="Like" onClick={() => vote(reply.id, "like")}>
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <span className="text-sm tabular-nums">{reply.likes}</span>
                <Button size="icon" variant="ghost" title="Dislike" onClick={() => vote(reply.id, "dislike")}>
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <span className="text-sm tabular-nums">{reply.dislikes}</span>
              </div>
            </CardHeader>
            <CardContent className="whitespace-pre-wrap text-sm">{reply.content}</CardContent>
          </Card>
        ))}
      </section>

      {/* reply box */}
      <Card className="mt-10">
        <CardHeader className="flex flex-row items-center gap-2">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base">Add a reply</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share your thoughts…"
            rows={4}
          />
          <div className="mt-3 flex justify-end">
            <Button onClick={handleSubmit} disabled={!newReply.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Post Reply
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
