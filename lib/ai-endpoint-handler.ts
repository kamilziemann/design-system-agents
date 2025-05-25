import type { NextRequest } from "next/server";
import { createAIStream, createErrorResponse, validateAndParseRequest } from "@/lib/ai-utils";
import type { z } from "zod";
type HandlerOptions<T> = {
	schema: z.ZodSchema<T>;
	getSystemPrompt: (data: T) => string;
};

export async function handleAIEndpoint<T extends { messages: { content: string }[] }>(
	request: NextRequest,
	options: HandlerOptions<T>
) {
	try {
		const validation = await validateAndParseRequest(request, options.schema);

		if (!validation.success) {
			return validation.response;
		}

		const data = validation.data as T;
		const { messages } = data;

		const userMessage = messages[messages.length - 1]?.content;

		if (!userMessage) {
			return createErrorResponse("No message content provided", 400);
		}

		const systemPrompt = options.getSystemPrompt(data);

		const result = await createAIStream(systemPrompt, userMessage);
    
		return result.toDataStreamResponse();
	} catch (error) {
		console.error("Error in AI endpoint:", error);

		return createErrorResponse(error instanceof Error ? error.message : "Failed to process request");
	}
}
