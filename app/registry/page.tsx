"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Filter, Star, Heart, Share2, GitFork } from "lucide-react"

interface Blueprint {
  id: string
  title: string
  description: string
  author: string
  category: string
  sdgs: string[]
  impactScore: number
  downloads: number
  remixes: number
  likes: number
  createdAt: string
  tags: string[]
  featured: boolean
}

export default function RegistryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("trending")
  const [likedBlueprints, setLikedBlueprints] = useState<Set<string>>(new Set())

  const blueprints: Blueprint[] = [
    {
      id: "bp1",
      title: "Climate-Resilient Agriculture Initiative",
      description: "Develop and distribute drought-resistant crop varieties for sub-Saharan Africa",
      author: "Global Agriculture Network",
      category: "Agriculture",
      sdgs: ["SDG 2", "SDG 13"],
      impactScore: 89,
      downloads: 2341,
      remixes: 156,
      likes: 892,
      createdAt: "2024-08-15",
      tags: ["climate", "agriculture", "sustainability"],
      featured: true,
    },
    {
      id: "bp2",
      title: "Urban Water Management System",
      description: "Smart water distribution and conservation system for cities",
      author: "Urban Solutions Collective",
      category: "Water",
      sdgs: ["SDG 6", "SDG 11"],
      impactScore: 85,
      downloads: 1876,
      remixes: 124,
      likes: 756,
      createdAt: "2024-08-10",
      tags: ["water", "urban", "technology"],
      featured: true,
    },
    {
      id: "bp3",
      title: "Renewable Energy Transition Framework",
      description: "Comprehensive roadmap for transitioning to 100% renewable energy",
      author: "Clean Energy Alliance",
      category: "Energy",
      sdgs: ["SDG 7", "SDG 13"],
      impactScore: 92,
      downloads: 3102,
      remixes: 287,
      likes: 1243,
      createdAt: "2024-08-05",
      tags: ["energy", "renewable", "climate"],
      featured: true,
    },
    {
      id: "bp4",
      title: "Education Access in Rural Communities",
      description: "Digital learning platform for underserved rural areas",
      author: "Education for All Foundation",
      category: "Education",
      sdgs: ["SDG 4", "SDG 5"],
      impactScore: 81,
      downloads: 1543,
      remixes: 98,
      likes: 634,
      createdAt: "2024-07-28",
      tags: ["education", "digital", "access"],
      featured: false,
    },
    {
      id: "bp5",
      title: "Healthcare in Underserved Regions",
      description: "Mobile health clinics and telemedicine network",
      author: "Global Health Initiative",
      category: "Healthcare",
      sdgs: ["SDG 3"],
      impactScore: 87,
      downloads: 2156,
      remixes: 167,
      likes: 891,
      createdAt: "2024-07-20",
      tags: ["healthcare", "mobile", "telemedicine"],
      featured: false,
    },
  ]

  const categories = ["all", "Agriculture", "Water", "Energy", "Education", "Healthcare"]

  const filteredBlueprints = blueprints
    .filter((bp) => selectedCategory === "all" || bp.category === selectedCategory)
    .filter(
      (bp) =>
        bp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bp.tags.some((tag) => tag.includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortBy === "trending") return b.downloads - a.downloads
      if (sortBy === "recent") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === "impact") return b.impactScore - a.impactScore
      return b.likes - a.likes
    })

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedBlueprints)
    if (newLiked.has(id)) {
      newLiked.delete(id)
    } else {
      newLiked.add(id)
    }
    setLikedBlueprints(newLiked)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Open Blueprint Registry</h1>
          <p className="text-sm text-muted-foreground">Discover, remix, and share innovation blueprints</p>
        </div>
      </nav>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search blueprints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Advanced
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              <span className="text-sm text-muted-foreground flex items-center">Sort by:</span>
              {["trending", "recent", "impact", "popular"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    sortBy === option
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Blueprints */}
          {filteredBlueprints.filter((bp) => bp.featured).length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Featured Blueprints
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredBlueprints
                  .filter((bp) => bp.featured)
                  .map((bp) => (
                    <BlueprintCard
                      key={bp.id}
                      blueprint={bp}
                      isLiked={likedBlueprints.has(bp.id)}
                      onLike={() => toggleLike(bp.id)}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* All Blueprints */}
          <div>
            <h2 className="text-xl font-bold mb-4">All Blueprints ({filteredBlueprints.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlueprints.map((bp) => (
                <BlueprintCard
                  key={bp.id}
                  blueprint={bp}
                  isLiked={likedBlueprints.has(bp.id)}
                  onLike={() => toggleLike(bp.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function BlueprintCard({
  blueprint,
  isLiked,
  onLike,
}: {
  blueprint: Blueprint
  isLiked: boolean
  onLike: () => void
}) {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-border transition-colors flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{blueprint.title}</h3>
          <p className="text-xs text-muted-foreground">{blueprint.author}</p>
        </div>
        <div className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2">
          {blueprint.impactScore}% Impact
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{blueprint.description}</p>

      {/* SDGs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {blueprint.sdgs.map((sdg) => (
          <span key={sdg} className="bg-muted/50 text-muted-foreground text-xs px-2 py-1 rounded">
            {sdg}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Downloads</div>
          <div className="font-semibold text-sm">{(blueprint.downloads / 1000).toFixed(1)}k</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Remixes</div>
          <div className="font-semibold text-sm">{blueprint.remixes}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Likes</div>
          <div className="font-semibold text-sm">{(blueprint.likes / 100).toFixed(0)}k</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {blueprint.tags.map((tag) => (
          <span key={tag} className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={onLike}>
          <Heart className={`w-4 h-4 mr-1 ${isLiked ? "fill-current text-red-500" : ""}`} />
          {isLiked ? "Liked" : "Like"}
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          <GitFork className="w-4 h-4 mr-1" />
          Remix
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          <Share2 className="w-4 h-4 mr-1" />
          Share
        </Button>
      </div>
    </Card>
  )
}
