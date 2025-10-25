import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { problemStatement, context, targetAudience, constraints } = await request.json()

    // Generate comprehensive blueprint using AI
    const { text: blueprintText } = await generateText({
      model: "openai/gpt-4-turbo",
      prompt: `You are an expert innovation consultant. Generate a comprehensive innovation blueprint for the following challenge:

Problem Statement: ${problemStatement}
Context: ${context}
Target Audience: ${targetAudience}
Constraints: ${constraints}

Provide a detailed JSON response with the following structure:
{
  "problemAnalysis": "Deep analysis of the problem",
  "solutions": [
    {
      "title": "Solution title",
      "description": "Detailed description",
      "impact": 85,
      "timeline": "6 months",
      "resources": ["Resource 1", "Resource 2"],
      "implementation_steps": ["Step 1", "Step 2"]
    }
  ],
  "roadmap": [
    {
      "phase": "Phase name",
      "duration": "Duration",
      "tasks": 5,
      "description": "Phase description"
    }
  ],
  "sdg_alignment": [
    {
      "sdg": "SDG number and name",
      "alignment_score": 85,
      "description": "How this blueprint aligns with this SDG"
    }
  ],
  "risks": ["Risk 1", "Risk 2"],
  "success_metrics": ["Metric 1", "Metric 2"],
  "estimated_budget": "Budget range",
  "team_composition": ["Role 1", "Role 2"]
}

Return ONLY valid JSON, no markdown or extra text.`,
    })

    // Parse the generated blueprint
    const blueprint = JSON.parse(blueprintText)

    return Response.json({
      success: true,
      blueprint,
    })
  } catch (error) {
    console.error("Blueprint generation error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate blueprint",
      },
      { status: 500 },
    )
  }
}
