"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface Node {
  id: string
  label: string
  type: "blueprint" | "solution" | "concept" | "sdg" | "resource"
  color: string
  size: number
}

interface Edge {
  source: string
  target: string
  label: string
  strength: number
}

interface KnowledgeGraphViewerProps {
  nodes: Node[]
  edges: Edge[]
}

export function KnowledgeGraphViewer({ nodes, edges }: KnowledgeGraphViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Simple force-directed layout simulation
    const positions: Record<string, { x: number; y: number; vx: number; vy: number }> = {}

    // Initialize positions
    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2
      const radius = Math.min(canvas.width, canvas.height) / 3
      positions[node.id] = {
        x: canvas.width / 2 + radius * Math.cos(angle),
        y: canvas.height / 2 + radius * Math.sin(angle),
        vx: 0,
        vy: 0,
      }
    })

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(8, 8, 12, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw edges
      ctx.strokeStyle = "rgba(100, 200, 255, 0.2)"
      ctx.lineWidth = 1
      edges.forEach((edge) => {
        const source = positions[edge.source]
        const target = positions[edge.target]
        if (source && target) {
          ctx.beginPath()
          ctx.moveTo(source.x, source.y)
          ctx.lineTo(target.x, target.y)
          ctx.stroke()
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        const pos = positions[node.id]
        if (!pos) return

        // Draw node circle
        ctx.fillStyle = node.color
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, node.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw node label
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.label, pos.x, pos.y)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [nodes, edges])

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="w-full h-96 bg-card/50 backdrop-blur border border-border/50 rounded-lg" />

      {/* Legend */}
      <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-muted-foreground">Blueprints</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-xs text-muted-foreground">Solutions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-xs text-muted-foreground">Concepts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">SDGs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs text-muted-foreground">Resources</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
