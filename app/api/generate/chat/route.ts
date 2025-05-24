import type { NextRequest } from "next/server"
import { systemPrompts } from "@/lib/system-prompts"
import { createAIStream, createErrorResponse, validateAndParseRequest } from "@/lib/ai-utils"
import { ConvertRequestSchema, GenerateRequestSchema } from "@/lib/validation-schemas"
import { handleAIEndpoint } from '@/lib/ai-endpoint-handler'

export async function POST(request: NextRequest) {
  return handleAIEndpoint(request, {
    schema: GenerateRequestSchema,
    getSystemPrompt: (data) => systemPrompts.generate(data.language),
  })
}