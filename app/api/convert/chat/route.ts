import type { NextRequest } from "next/server"
import { systemPrompts } from "@/lib/system-prompts"
import { createAIStream, createErrorResponse, validateAndParseRequest } from "@/lib/ai-utils"
import { ConvertRequestSchema } from "@/lib/validation-schemas"

export async function POST(request: NextRequest) {
  try {
    // Validate request with Zod
    const validation = await validateAndParseRequest(request, ConvertRequestSchema)

    if (!validation.success) {
      return validation.response
    }

    const { messages, sourceLanguage, targetLanguage } = validation.data
    const userMessage = messages[messages.length - 1]?.content

    if (!userMessage) {
      return createErrorResponse("No message content provided", 400)
    }

    const systemPrompt = systemPrompts.convert(sourceLanguage, targetLanguage)
    const result = await createAIStream(systemPrompt, userMessage)

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in convert chat API:", error)
    return createErrorResponse(error instanceof Error ? error.message : "Failed to process conversion request")
  }
}
