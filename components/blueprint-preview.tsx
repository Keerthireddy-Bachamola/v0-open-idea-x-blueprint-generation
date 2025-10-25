"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, Zap, AlertCircle, CheckCircle2, Users, Target } from "lucide-react"

interface BlueprintPreviewProps {
  blueprint: any
  onBack: () => void
}

export function BlueprintPreview({ blueprint, onBack }: BlueprintPreviewProps) {
  const sdgColors: Record<number, string> = {
    1: "bg-red-500/20 text-red-400",
    2: "bg-yellow-500/20 text-yellow-400",
    3: "bg-green-500/20 text-green-400",
    4: "bg-red-600/20 text-red-400",
    5: "bg-red-500/20 text-red-400",
    6: "bg-blue-500/20 text-blue-400",
    7: "bg-yellow-600/20 text-yellow-400",
    8: "bg-red-700/20 text-red-400",
    9: "bg-orange-500/20 text-orange-400",
    10: "bg-red-500/20 text-red-400",
    11: "bg-yellow-500/20 text-yellow-400",
    12: "bg-orange-600/20 text-orange-400",
    13: "bg-green-600/20 text-green-400",
    14: "bg-blue-600/20 text-blue-400",
    15: "bg-green-700/20 text-green-400",
    16: "bg-blue-700/20 text-blue-400",
    17: "bg-purple-500/20 text-purple-400",
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Problem Analysis */}
        <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
          <h2 className="text-2xl font-bold mb-4">Problem Analysis</h2>
          <p className="text-muted-foreground leading-relaxed">{blueprint.problemAnalysis}</p>
        </Card>

        {/* Solutions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Proposed Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blueprint.solutions?.map((solution: any, i: number) => (
              <Card
                key={i}
                className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-border transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg">{solution.title}</h3>
                  <div className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                    {solution.impact}% Impact
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{solution.description}</p>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                    <div className="text-sm font-medium">{solution.timeline}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-2">Required Resources</div>
                    <div className="flex flex-wrap gap-2">
                      {solution.resources?.map((r: string, j: number) => (
                        <span key={j} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                  {solution.implementation_steps && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">Implementation Steps</div>
                      <ol className="text-xs space-y-1">
                        {solution.implementation_steps.map((step: string, j: number) => (
                          <li key={j} className="text-muted-foreground">
                            {j + 1}. {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Implementation Roadmap */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Implementation Roadmap</h2>
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <div className="space-y-4">
              {blueprint.roadmap?.map((phase: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                      <span className="text-white font-semibold text-sm">{i + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{phase.phase}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {phase.duration} • {phase.tasks} tasks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* SDG Alignment */}
        {blueprint.sdg_alignment && blueprint.sdg_alignment.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Sustainable Development Goals Alignment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blueprint.sdg_alignment.map((sdg: any, i: number) => {
                const sdgNum = Number.parseInt(sdg.sdg.split(" ")[0])
                const colorClass = sdgColors[sdgNum] || "bg-blue-500/20 text-blue-400"
                return (
                  <Card key={i} className="p-4 bg-card/50 backdrop-blur border-border/50">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${colorClass}`}>
                      {sdg.sdg}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                          style={{ width: `${sdg.alignment_score}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold">{sdg.alignment_score}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{sdg.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Team Composition & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprint.team_composition && (
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-cyan-500" />
                <h3 className="text-lg font-semibold">Team Composition</h3>
              </div>
              <div className="space-y-2">
                {blueprint.team_composition.map((role: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                    {role}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {blueprint.estimated_budget && (
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-cyan-500" />
                <h3 className="text-lg font-semibold">Budget & Resources</h3>
              </div>
              <p className="text-2xl font-bold text-cyan-400 mb-4">{blueprint.estimated_budget}</p>
              {blueprint.success_metrics && (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground font-semibold mb-2">Success Metrics</div>
                  {blueprint.success_metrics.map((metric: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                      {metric}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Risks */}
        {blueprint.risks && blueprint.risks.length > 0 && (
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 border-destructive/50">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-semibold">Potential Risks</h3>
            </div>
            <div className="space-y-2">
              {blueprint.risks.map((risk: string, i: number) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{risk}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to collaborate?</h3>
              <p className="text-muted-foreground">
                Join our co-creation room to refine this blueprint with AI agents and community members.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              <Zap className="w-4 h-4 mr-2" />
              Start Co-Creation
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
