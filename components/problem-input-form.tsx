"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"

interface ProblemInputFormProps {
  onSubmit: (data: any) => void
  onBack: () => void
}

export function ProblemInputForm({ onSubmit, onBack }: ProblemInputFormProps) {
  const [formData, setFormData] = useState({
    problemStatement: "",
    context: "",
    targetAudience: "",
    constraints: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate blueprint")
      }

      const { blueprint } = await response.json()
      onSubmit({
        ...formData,
        ...blueprint,
        generatedAt: new Date().toISOString(),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Define Your Challenge</h1>
          <p className="text-muted-foreground">
            Describe the global challenge you want to solve. Our AI will generate a comprehensive blueprint with
            solutions, roadmap, and impact metrics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Problem Statement</label>
                <Textarea
                  placeholder="Describe the global challenge you want to address..."
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  className="min-h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Context & Background</label>
                <Textarea
                  placeholder="Provide context about the problem, affected communities, and current situation..."
                  value={formData.context}
                  onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                  className="min-h-24"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Target Audience</label>
                  <Input
                    placeholder="e.g., Students, NGOs, Researchers"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Key Constraints</label>
                  <Input
                    placeholder="e.g., Budget, Timeline, Resources"
                    value={formData.constraints}
                    onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </Card>

          {error && (
            <Card className="p-4 bg-destructive/10 border-destructive/50">
              <p className="text-sm text-destructive">{error}</p>
            </Card>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading || !formData.problemStatement}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Blueprint...
                </>
              ) : (
                "Generate Blueprint"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onBack}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
