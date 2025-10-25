import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { blueprintId, blueprintContent } = await request.json()

    // Generate knowledge graph using AI
    const { text: graphText } = await generateText({
      model: "openai/gpt-4-turbo",
      prompt: `Analyze this innovation blueprint and generate a knowledge graph structure.

Blueprint:
${JSON.stringify(blueprintContent, null, 2)}

Return a JSON object with:
{
  "nodes": [
    {
      "id": "unique_id",
      "label": "Node name",
      "type": "blueprint|solution|concept|sdg|resource",
      "color": "hex_color",
      "size": 10-30
    }
  ],
  "edges": [
    {
      "source": "node_id",
      "target": "node_id",
      "label": "relationship",
      "strength": 0.5-1.0
    }
  ],
  "relatedBlueprints": [
    {
      "id": "blueprint_id",
      "title": "Title",
      "similarity": 0.85,
      "reason": "Why it's related"
    }
  ]
}

Return ONLY valid JSON.`,
    })

    const graph = JSON.parse(graphText)

    return Response.json({
      success: true,
      graph,
    })
  } catch (error) {
    console.error("Knowledge graph error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate knowledge graph",
      },
      { status: 500 },
    )
  }
}
