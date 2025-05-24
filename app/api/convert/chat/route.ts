import type { NextRequest } from "next/server"
import { systemPrompts } from "@/lib/system-prompts"
import { ConvertRequestSchema, RefactorRequestSchema } from "@/lib/validation-schemas"
import { handleAIEndpoint } from "@/lib/ai-endpoint-handler"

export async function POST(request: NextRequest) {
  return handleAIEndpoint(request, {
    schema: ConvertRequestSchema,
    getSystemPrompt: (data) => systemPrompts.convert(data.sourceLanguage, data.targetLanguage),
  })
}