"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, Globe, Zap } from "lucide-react"

interface ImpactMetric {
  name: string
  value: number
  target: number
  unit: string
  icon: React.ReactNode
  color: string
}

interface ImpactScorecardProps {
  blueprintTitle: string
  overallScore: number
  metrics: ImpactMetric[]
  sdgAlignment: Array<{ sdg: string; score: number }>
  timelineData: Array<{ month: string; impact: number }>
}

export function ImpactScorecard({
  blueprintTitle,
  overallScore,
  metrics,
  sdgAlignment,
  timelineData,
}: ImpactScorecardProps) {
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="p-8 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{blueprintTitle}</h2>
            <p className="text-muted-foreground">Overall Impact Score</p>
          </div>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${(overallScore / 100) * 282.7} 282.7`}
                className="text-cyan-500 transition-all"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">{overallScore}</div>
                <div className="text-xs text-muted-foreground">/ 100</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div>
        <h3 className="text-xl font-bold mb-4">Key Impact Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <Card key={i} className="p-4 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.color}`}>{metric.icon}</div>
                <div className="text-xs font-semibold text-cyan-400">
                  {Math.round((metric.value / metric.target) * 100)}%
                </div>
              </div>
              <h4 className="font-semibold text-sm mb-1">{metric.name}</h4>
              <div className="text-2xl font-bold mb-1">
                {metric.value}
                <span className="text-xs text-muted-foreground ml-1">{metric.unit}</span>
              </div>
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                  style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* SDG Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
          <h3 className="text-lg font-bold mb-4">SDG Alignment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sdgAlignment}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="sdg" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(12, 12, 16, 0.95)",
                  border: "1px solid rgba(100, 200, 255, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="score" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Impact Timeline */}
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
          <h3 className="text-lg font-bold mb-4">Impact Projection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(12, 12, 16, 0.95)",
                  border: "1px solid rgba(100, 200, 255, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="impact" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Impact Categories */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <h3 className="text-lg font-bold mb-4">Impact Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Social Impact", value: 92, icon: Users, color: "from-blue-500 to-cyan-600" },
            { label: "Environmental", value: 88, icon: Globe, color: "from-green-500 to-emerald-600" },
            { label: "Economic", value: 75, icon: TrendingUp, color: "from-yellow-500 to-orange-600" },
            { label: "Scalability", value: 85, icon: Zap, color: "from-purple-500 to-pink-600" },
          ].map((category, i) => (
            <div key={i} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}>
                  <category.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold">{category.label}</span>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold">{category.value}</div>
                <div className="text-xs text-muted-foreground mb-1">/ 100</div>
              </div>
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-2">
                <div className={`h-full bg-gradient-to-r ${category.color}`} style={{ width: `${category.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <h3 className="text-lg font-bold mb-4">Impact Optimization Recommendations</h3>
        <div className="space-y-3">
          {[
            "Increase community engagement to boost social impact score from 92 to 95+",
            "Implement carbon offset tracking to enhance environmental metrics",
            "Develop partnerships with local businesses to improve economic sustainability",
            "Create scalability framework for regional expansion",
          ].map((rec, i) => (
            <div key={i} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground">{rec}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
