import { streamText } from "ai";
import { google, GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";
import type { z } from "zod";
import type { ErrorResponse } from "./validation-schemas";

export const createAIStream = async (systemPrompt: string, userMessage: string) =>
	streamText({
		model: google("gemini-2.5-flash-preview-04-17"),
		system: systemPrompt,
		messages: [
			{
				role: "user",
				content: userMessage,
			},
		],
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      } satisfies GoogleGenerativeAIProviderOptions,
    },
		temperature: 0.1,
		maxTokens: 10000,
    
	});

export const createValidationErrorResponse = (error: z.ZodError): Response => {
	const errorResponse: ErrorResponse = {
		error: "Validation failed",
		details: error.errors.map((err) => ({
			field: err.path.join("."),
			message: err.message,
		})),
	};

	return new Response(JSON.stringify(errorResponse), {
		status: 400,
		headers: { "Content-Type": "application/json" },
	});
};

export const createErrorResponse = (message: string, status = 500): Response => {
	const errorResponse: ErrorResponse = {
		error: message,
	};

	return new Response(JSON.stringify(errorResponse), {
		status,
		headers: { "Content-Type": "application/json" },
	});
};

export const validateAndParseRequest = async <T>(
	request: Request,
	schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; response: Response }> => {
	try {
		const body = await request.json();
		const result = schema.safeParse(body);

		if (!result.success) {
			return {
				success: false,
				response: createValidationErrorResponse(result.error),
			};
		}

		return {
			success: true,
			data: result.data,
		};
	} catch (error) {
		return {
			success: false,
			response: createErrorResponse("Invalid JSON format", 400),
		};
	}
};

