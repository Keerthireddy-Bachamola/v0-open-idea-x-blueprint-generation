"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MessageSquare, Users } from "lucide-react"
import { BlueprintPreview } from "@/components/blueprint-preview"
import { AiPersonasChat } from "@/components/ai-personas-chat"
import { CoCreationRoom } from "@/components/co-creation-room"
import Link from "next/link"

// Mock blueprint data - in production, fetch from database
const mockBlueprint = {
  problemStatement: "Climate change impact on agricultural productivity in developing nations",
  context: "Farmers in sub-Saharan Africa face severe droughts affecting crop yields",
  targetAudience: "Small-scale farmers, NGOs, governments",
  constraints: "Limited budget, need for scalable solutions",
  problemAnalysis: "Agricultural productivity is declining due to climate variability...",
  solutions: [
    {
      title: "Climate-Resilient Crop Varieties",
      description: "Develop and distribute drought-resistant crop varieties",
      impact: 85,
      timeline: "18 months",
      resources: ["Agricultural scientists", "Seed banks", "Farmer networks"],
      implementation_steps: ["Research phase", "Testing", "Distribution"],
    },
  ],
  roadmap: [
    { phase: "Research", duration: "6 months", tasks: 8, description: "Identify and test varieties" },
    { phase: "Pilot", duration: "6 months", tasks: 12, description: "Test with farmer groups" },
    { phase: "Scale", duration: "6 months", tasks: 15, description: "Expand to multiple regions" },
  ],
  sdg_alignment: [
    { sdg: "2 Zero Hunger", alignment_score: 95, description: "Direct impact on food security" },
    { sdg: "13 Climate Action", alignment_score: 88, description: "Addresses climate resilience" },
  ],
  risks: ["Market adoption challenges", "Climate unpredictability"],
  success_metrics: ["Yield increase by 30%", "Farmer adoption rate > 60%"],
  estimated_budget: "$2-5M",
  team_composition: ["Agricultural scientists", "Climate experts", "Community organizers"],
}

export default function BlueprintPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-xl font-bold">Blueprint Collaboration</h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Blueprint Overview</TabsTrigger>
            <TabsTrigger value="collaborate" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Collaboration
            </TabsTrigger>
            <TabsTrigger value="co-create" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Co-Creation Room
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <BlueprintPreview blueprint={mockBlueprint} onBack={() => {}} />
          </TabsContent>

          <TabsContent value="collaborate" className="space-y-6">
            <AiPersonasChat blueprint={mockBlueprint} />
          </TabsContent>

          <TabsContent value="co-create" className="space-y-6">
            <CoCreationRoom blueprintId="blueprint-1" blueprintTitle={mockBlueprint.problemStatement} />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
