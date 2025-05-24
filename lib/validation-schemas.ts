import { z } from "zod"
import { Language } from "@/types/enums"

// Base schemas
export const LanguageSchema = z.enum([Language.REACT, Language.KOTLIN, Language.SWIFT])

export const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1, "Message content cannot be empty"),
})

export const MessagesSchema = z.array(MessageSchema).min(1, "At least one message is required")

// Refactor Agent Schema
export const RefactorRequestSchema = z.object({
  messages: MessagesSchema,
  language: LanguageSchema,
})

// Component Converter Schema
export const ConvertRequestSchema = z
  .object({
    messages: MessagesSchema,
    sourceLanguage: LanguageSchema,
    targetLanguage: LanguageSchema,
  })
  .refine((data) => data.sourceLanguage !== data.targetLanguage, {
    message: "Source and target languages must be different",
    path: ["targetLanguage"],
  })

// Component Generator Schema
export const GenerateRequestSchema = z.object({
  messages: MessagesSchema,
  language: LanguageSchema,
})


// Error response schema
export const ErrorResponseSchema = z.object({
  error: z.string(),
  details: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
})

export type RefactorRequest = z.infer<typeof RefactorRequestSchema>
export type ConvertRequest = z.infer<typeof ConvertRequestSchema>
export type GenerateRequest = z.infer<typeof GenerateRequestSchema>
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
