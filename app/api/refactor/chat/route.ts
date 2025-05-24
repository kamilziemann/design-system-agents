import type { NextRequest } from "next/server";
import { systemPrompts } from "@/lib/system-prompts";
import { RefactorRequestSchema } from "@/lib/validation-schemas";
import { handleAIEndpoint } from "@/lib/ai-endpoint-handler";

export async function POST(request: NextRequest) {
	return handleAIEndpoint(request, {
		schema: RefactorRequestSchema,
		getSystemPrompt: (data) => systemPrompts.refactor(data.language),
	});
}

