import type { NextRequest } from "next/server"
import { systemPrompts } from "@/lib/system-prompts"
import { createAIStream, createErrorResponse, validateAndParseRequest } from "@/lib/ai-utils"
import { RefactorRequestSchema } from "@/lib/validation-schemas"

export async function POST(request: NextRequest) {
  try {
    // Validate request with Zod
    const validation = await validateAndParseRequest(request, RefactorRequestSchema)

    if (!validation.success) {
      return validation.response
    }

    const { messages, language } = validation.data
    const userMessage = messages[messages.length - 1]?.content

    if (!userMessage) {
      return createErrorResponse("No message content provided", 400)
    }

    const systemPrompt = systemPrompts.refactor(language)
    const result = await createAIStream(systemPrompt, userMessage)

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in refactor chat API:", error)
    return createErrorResponse(error instanceof Error ? error.message : "Failed to process refactor request")
  }
}
