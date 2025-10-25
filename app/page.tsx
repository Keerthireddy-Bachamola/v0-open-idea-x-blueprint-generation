"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Zap, Users, TrendingUp } from "lucide-react"
import { ProblemInputForm } from "@/components/problem-input-form"
import { BlueprintPreview } from "@/components/blueprint-preview"

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [blueprint, setBlueprint] = useState(null)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">OpenIdeaX</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Docs</Button>
            <Button variant="ghost">Community</Button>
            <Button>Sign In</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {!showForm && !blueprint && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  Turn Global Challenges Into Implementable Solutions
                </h1>
                <p className="text-xl text-muted-foreground">
                  OpenIdeaX combines generative AI, real-time collaboration, and impact evaluation to democratize
                  innovation. From problem statement to complete blueprint in minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  onClick={() => setShowForm(true)}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Creating
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <div className="text-3xl font-bold">2 min</div>
                  <div className="text-sm text-muted-foreground">Blueprint generation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">7 SDGs</div>
                  <div className="text-sm text-muted-foreground">Impact alignment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">∞</div>
                  <div className="text-sm text-muted-foreground">Remix & share</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative h-96 lg:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl blur-3xl" />
              <Card className="relative h-full bg-card/50 backdrop-blur border-border/50 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-3 bg-muted rounded-full w-3/4" />
                  <div className="h-3 bg-muted rounded-full w-1/2" />
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-muted rounded-full" />
                  <div className="h-2 bg-muted rounded-full w-5/6" />
                  <div className="h-2 bg-muted rounded-full w-4/6" />
                </div>
              </Card>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              { icon: Sparkles, title: "AI-Powered", desc: "Multi-agent AI collaboration" },
              { icon: Users, title: "Co-Creation", desc: "Real-time collaboration rooms" },
              { icon: TrendingUp, title: "Impact Scoring", desc: "Measure SDG alignment" },
              { icon: Zap, title: "Open Registry", desc: "Remix & share blueprints" },
            ].map((feature, i) => (
              <Card
                key={i}
                className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-border transition-colors"
              >
                <feature.icon className="w-8 h-8 text-cyan-500 mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Problem Input Form */}
      {showForm && !blueprint && (
        <ProblemInputForm
          onSubmit={(data) => {
            setBlueprint(data)
          }}
          onBack={() => setShowForm(false)}
        />
      )}

      {/* Blueprint Preview */}
      {blueprint && <BlueprintPreview blueprint={blueprint} onBack={() => setBlueprint(null)} />}
    </main>
  )
}
