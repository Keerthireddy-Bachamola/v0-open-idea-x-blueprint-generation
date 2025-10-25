"use client"

import { useState, useEffect } from "react"
import { ImpactScorecard } from "@/components/impact-scorecard"
import { Users, Globe, TrendingUp, Zap } from "lucide-react"

export default function ImpactPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const metrics = [
    {
      name: "People Impacted",
      value: 125000,
      target: 150000,
      unit: "individuals",
      icon: <Users className="w-5 h-5 text-blue-400" />,
      color: "bg-blue-500/20",
    },
    {
      name: "CO2 Reduced",
      value: 45000,
      target: 50000,
      unit: "tons",
      icon: <Globe className="w-5 h-5 text-green-400" />,
      color: "bg-green-500/20",
    },
    {
      name: "Economic Value",
      value: 2500000,
      target: 3000000,
      unit: "USD",
      icon: <TrendingUp className="w-5 h-5 text-yellow-400" />,
      color: "bg-yellow-500/20",
    },
    {
      name: "Jobs Created",
      value: 850,
      target: 1000,
      unit: "positions",
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      color: "bg-purple-500/20",
    },
  ]

  const sdgAlignment = [
    { sdg: "SDG 1", score: 92 },
    { sdg: "SDG 2", score: 95 },
    { sdg: "SDG 3", score: 88 },
    { sdg: "SDG 5", score: 85 },
    { sdg: "SDG 8", score: 90 },
    { sdg: "SDG 13", score: 93 },
  ]

  const timelineData = [
    { month: "Month 1", impact: 15 },
    { month: "Month 3", impact: 35 },
    { month: "Month 6", impact: 58 },
    { month: "Month 9", impact: 75 },
    { month: "Month 12", impact: 88 },
    { month: "Month 18", impact: 95 },
  ]

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading impact analysis...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Impact Measurement Dashboard</h1>
        </div>
      </nav>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ImpactScorecard
          blueprintTitle="Climate-Resilient Agriculture Initiative"
          overallScore={89}
          metrics={metrics}
          sdgAlignment={sdgAlignment}
          timelineData={timelineData}
        />
      </section>
    </main>
  )
}
