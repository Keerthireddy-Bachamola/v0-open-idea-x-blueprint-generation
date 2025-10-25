"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, FileText, Share2, Check, Send, Plus, Trash2 } from "lucide-react"

interface RoomMember {
  id: string
  name: string
  avatar: string
  role: "owner" | "editor" | "viewer"
  status: "online" | "offline"
}

interface RoomComment {
  id: string
  author: string
  content: string
  timestamp: Date
  section: string
}

interface RoomNote {
  id: string
  title: string
  content: string
  author: string
  createdAt: Date
  updatedAt: Date
}

interface CoCreationRoomProps {
  blueprintId: string
  blueprintTitle: string
}

export function CoCreationRoom({ blueprintId, blueprintTitle }: CoCreationRoomProps) {
  const [members, setMembers] = useState<RoomMember[]>([
    { id: "1", name: "You", avatar: "👤", role: "owner", status: "online" },
    { id: "2", name: "Sarah Chen", avatar: "👩‍💼", role: "editor", status: "online" },
    { id: "3", name: "Marcus Johnson", avatar: "👨‍💻", role: "editor", status: "offline" },
  ])

  const [comments, setComments] = useState<RoomComment[]>([
    {
      id: "1",
      author: "Sarah Chen",
      content: "We should focus on the implementation timeline first",
      timestamp: new Date(Date.now() - 3600000),
      section: "roadmap",
    },
  ])

  const [notes, setNotes] = useState<RoomNote[]>([
    {
      id: "1",
      title: "Key Discussion Points",
      content: "1. Budget allocation\n2. Team structure\n3. Timeline adjustments",
      author: "You",
      createdAt: new Date(Date.now() - 7200000),
      updatedAt: new Date(Date.now() - 3600000),
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [activeTab, setActiveTab] = useState("members")
  const [inviteLink, setInviteLink] = useState("")
  const [copied, setCopied] = useState(false)
  const commentsEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [comments])

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: RoomComment = {
      id: String(comments.length + 1),
      author: "You",
      content: newComment,
      timestamp: new Date(),
      section: "general",
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.title.trim() || !newNote.content.trim()) return

    const note: RoomNote = {
      id: String(notes.length + 1),
      title: newNote.title,
      content: newNote.content,
      author: "You",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setNotes([...notes, note])
    setNewNote({ title: "", content: "" })
  }

  const handleCopyInvite = () => {
    const link = `${window.location.origin}/join/${blueprintId}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Room Header */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{blueprintTitle}</h2>
            <p className="text-sm text-muted-foreground">Co-Creation Room</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyInvite}
            className="flex items-center gap-2 bg-transparent"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Share Room
              </>
            )}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Active Members</div>
            <div className="text-2xl font-bold">{members.filter((m) => m.status === "online").length}</div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Comments</div>
            <div className="text-2xl font-bold">{comments.length}</div>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Shared Notes</div>
            <div className="text-2xl font-bold">{notes.length}</div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Discussion
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Notes
          </TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <h3 className="font-semibold mb-4">Team Members</h3>
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{member.avatar}</div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{member.role}</div>
                    </div>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${member.status === "online" ? "bg-green-500" : "bg-muted-foreground"}`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-semibold mb-3">Invite Team Members</h4>
              <div className="flex gap-2">
                <Input placeholder="Enter email address" className="flex-1" />
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments" className="space-y-4">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {comments.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No comments yet. Start the discussion!</p>
                  </div>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">{comment.author}</div>
                      <div className="text-xs text-muted-foreground">{comment.timestamp.toLocaleTimeString()}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                  </div>
                ))
              )}
              <div ref={commentsEndRef} />
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2 border-t border-border pt-4">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <h3 className="font-semibold mb-4">Add New Note</h3>
            <form onSubmit={handleAddNote} className="space-y-3 mb-6 pb-6 border-b border-border">
              <Input
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <textarea
                placeholder="Note content..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full p-3 bg-muted/50 border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-24"
              />
              <Button
                type="submit"
                disabled={!newNote.title.trim() || !newNote.content.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </form>

            {/* Notes List */}
            <div className="space-y-3">
              {notes.map((note) => (
                <div key={note.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{note.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        by {note.author} • {note.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
