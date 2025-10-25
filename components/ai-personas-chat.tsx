"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Send, Users } from "lucide-react"

interface PersonaResponse {
  persona: string
  name: string
  response: string
}

interface AiPersonasChatProps {
  blueprint: any
}

const personas = [
  {
    key: "strategist",
    name: "Strategic Advisor",
    color: "from-purple-500 to-pink-600",
    description: "Strategic planning & market positioning",
  },
  {
    key: "technologist",
    name: "Tech Lead",
    color: "from-blue-500 to-cyan-600",
    description: "Technical feasibility & implementation",
  },
  {
    key: "impact",
    name: "Impact Analyst",
    color: "from-green-500 to-emerald-600",
    description: "Social & environmental impact",
  },
]

export function AiPersonasChat({ blueprint }: AiPersonasChatProps) {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(["strategist", "technologist", "impact"])
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState<PersonaResponse[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, responses])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)
    setResponses([])

    try {
      const response = await fetch("/api/ai-personas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blueprint,
          userMessage,
          conversationHistory: messages,
          selectedPersonas,
        }),
      })

      if (!response.ok) throw new Error("Failed to get responses")

      const { responses: personaResponses } = await response.json()
      setResponses(personaResponses)
      setMessages((prev) => [
        ...prev,
        ...personaResponses.map((r: PersonaResponse) => ({
          role: r.name,
          content: r.response,
        })),
      ])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Persona Selection */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-cyan-500" />
          <h3 className="text-lg font-semibold">AI Collaboration Team</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personas.map((persona) => (
            <button
              key={persona.key}
              onClick={() =>
                setSelectedPersonas((prev) =>
                  prev.includes(persona.key) ? prev.filter((p) => p !== persona.key) : [...prev, persona.key],
                )
              }
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedPersonas.includes(persona.key)
                  ? `border-cyan-500 bg-cyan-500/10`
                  : "border-border bg-card/50 hover:border-border"
              }`}
            >
              <div
                className={`text-sm font-semibold bg-gradient-to-r ${persona.color} bg-clip-text text-transparent mb-1`}
              >
                {persona.name}
              </div>
              <div className="text-xs text-muted-foreground">{persona.description}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50 h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Start a conversation with your AI team</p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === "user" ? "bg-cyan-500/20 text-cyan-100" : "bg-muted text-muted-foreground text-sm"
                  }`}
                >
                  {msg.role !== "user" && <div className="font-semibold text-xs mb-1">{msg.role}</div>}
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Ask your AI team for feedback..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </Card>
    </div>
  )
}
