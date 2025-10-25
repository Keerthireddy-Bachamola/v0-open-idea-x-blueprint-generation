import { generateText } from "ai"

interface PersonaRequest {
  blueprint: any
  userMessage: string
  conversationHistory: Array<{ role: string; content: string }>
}

const personas = {
  strategist: {
    name: "Strategic Advisor",
    role: "Strategist",
    color: "from-purple-500 to-pink-600",
    description: "Focuses on strategic planning and market positioning",
    systemPrompt: `You are a strategic innovation advisor. Your role is to analyze business strategy, market positioning, competitive advantage, and long-term viability. Provide strategic insights and recommendations for the innovation blueprint. Be concise but insightful.`,
  },
  technologist: {
    name: "Tech Lead",
    role: "Technologist",
    color: "from-blue-500 to-cyan-600",
    description: "Focuses on technical feasibility and implementation",
    systemPrompt: `You are a technology expert. Your role is to assess technical feasibility, recommend technology stacks, identify technical challenges, and suggest implementation approaches. Be practical and specific about technical requirements.`,
  },
  impact: {
    name: "Impact Analyst",
    role: "Impact Analyst",
    color: "from-green-500 to-emerald-600",
    description: "Focuses on social and environmental impact",
    systemPrompt: `You are an impact measurement specialist. Your role is to evaluate social and environmental impact, suggest metrics, identify stakeholders, and ensure alignment with SDGs. Focus on measurable outcomes and long-term sustainability.`,
  },
}

async function getPersonaResponse(
  personaKey: keyof typeof personas,
  blueprint: any,
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }>,
) {
  const persona = personas[personaKey]

  const conversationContext = conversationHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n")

  const { text } = await generateText({
    model: "openai/gpt-4-turbo",
    system: persona.systemPrompt,
    prompt: `Blueprint Context:
${JSON.stringify(blueprint, null, 2)}

Previous Conversation:
${conversationContext}

User Message: ${userMessage}

Provide a focused response from your perspective as the ${persona.role}.`,
  })

  return text
}

export async function POST(request: Request) {
  try {
    const { blueprint, userMessage, conversationHistory, selectedPersonas } = (await request.json()) as {
      blueprint: any
      userMessage: string
      conversationHistory: Array<{ role: string; content: string }>
      selectedPersonas: Array<keyof typeof personas>
    }

    const responses = await Promise.all(
      selectedPersonas.map((personaKey) =>
        getPersonaResponse(personaKey, blueprint, userMessage, conversationHistory).then((text) => ({
          persona: personaKey,
          name: personas[personaKey].name,
          response: text,
        })),
      ),
    )

    return Response.json({
      success: true,
      responses,
    })
  } catch (error) {
    console.error("AI Personas error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get persona responses",
      },
      { status: 500 },
    )
  }
}
