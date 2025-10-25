"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { KnowledgeGraphViewer } from "@/components/knowledge-graph-viewer"
import { Loader2, Network, LinkIcon } from "lucide-react"

export default function KnowledgeGraphPage() {
  const [nodes, setNodes] = useState<any[]>([])
  const [edges, setEdges] = useState<any[]>([])
  const [relatedBlueprints, setRelatedBlueprints] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading knowledge graph
    const mockBlueprint = {
      problemStatement: "Climate change impact on agricultural productivity",
      solutions: ["Climate-resilient crops", "Water management systems"],
      sdg_alignment: ["SDG 2", "SDG 13"],
    }

    setTimeout(() => {
      setNodes([
        { id: "bp1", label: "Climate Agriculture", type: "blueprint", color: "#3b82f6", size: 20 },
        { id: "sol1", label: "Crop Varieties", type: "solution", color: "#06b6d4", size: 15 },
        { id: "sol2", label: "Water Systems", type: "solution", color: "#06b6d4", size: 15 },
        { id: "sdg2", label: "Zero Hunger", type: "sdg", color: "#22c55e", size: 12 },
        { id: "sdg13", label: "Climate Action", type: "sdg", color: "#22c55e", size: 12 },
        { id: "res1", label: "Agricultural Data", type: "resource", color: "#f97316", size: 10 },
        { id: "con1", label: "Sustainability", type: "concept", color: "#a855f7", size: 12 },
      ])

      setEdges([
        { source: "bp1", target: "sol1", label: "implements", strength: 0.9 },
        { source: "bp1", target: "sol2", label: "implements", strength: 0.85 },
        { source: "sol1", target: "sdg2", label: "aligns with", strength: 0.95 },
        { source: "sol2", target: "sdg13", label: "aligns with", strength: 0.88 },
        { source: "bp1", target: "con1", label: "focuses on", strength: 0.8 },
        { source: "sol1", target: "res1", label: "uses", strength: 0.7 },
      ])

      setRelatedBlueprints([
        {
          id: "bp2",
          title: "Sustainable Water Management",
          similarity: 0.92,
          reason: "Shares water management solutions",
        },
        {
          id: "bp3",
          title: "Food Security in Africa",
          similarity: 0.88,
          reason: "Addresses similar SDG targets",
        },
        {
          id: "bp4",
          title: "Climate Resilience Framework",
          similarity: 0.85,
          reason: "Overlapping climate adaptation strategies",
        },
      ])

      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Network className="w-6 h-6 text-cyan-500" />
          <h1 className="text-2xl font-bold">Knowledge Graph</h1>
        </div>
      </nav>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Graph Viewer */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Blueprint Connections</h2>
            {isLoading ? (
              <Card className="p-12 bg-card/50 backdrop-blur border-border/50 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-cyan-500" />
                  <p className="text-muted-foreground">Building knowledge graph...</p>
                </div>
              </Card>
            ) : (
              <KnowledgeGraphViewer nodes={nodes} edges={edges} />
            )}
          </div>

          {/* Related Blueprints */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Related Blueprints</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlueprints.map((bp) => (
                <Card
                  key={bp.id}
                  className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-border transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">{bp.title}</h3>
                    <div className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-medium">
                      {Math.round(bp.similarity * 100)}%
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{bp.reason}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    View Blueprint
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Graph Statistics */}
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <h3 className="text-lg font-semibold mb-4">Graph Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Nodes</div>
                <div className="text-3xl font-bold">{nodes.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Connections</div>
                <div className="text-3xl font-bold">{edges.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Blueprints</div>
                <div className="text-3xl font-bold">{nodes.filter((n) => n.type === "blueprint").length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Solutions</div>
                <div className="text-3xl font-bold">{nodes.filter((n) => n.type === "solution").length}</div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
