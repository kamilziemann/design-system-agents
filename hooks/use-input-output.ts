"use client"

import { useChat } from "@ai-sdk/react"
import { useCallback } from "react"

interface UseInputOutputOptions {
  api: string
  body?: Record<string, any>
  onSuccess?: (result: string) => void
  onError?: (error: Error) => void
}

export const useInputOutput = ({ api, body = {}, onSuccess, onError }: UseInputOutputOptions) => {
  const { messages, append, isLoading, stop, setMessages } = useChat({
    api,
    body,
    onFinish: (message) => {
      onSuccess?.(message.content)
    },
    onError: (error) => {
      onError?.(error)
    },
  })

  const generate = useCallback(
    async (input: string) => {
      // Clear previous messages before generating
      setMessages([])

      await append({
        role: "user",
        content: input,
      })
    },
    [append, setMessages],
  )

  const clear = useCallback(() => {
    setMessages([])
  }, [setMessages])

  // Get the latest assistant message as output
  const output = messages.find((m) => m.role === "assistant")?.content || ""

  return {
    output,
    isLoading,
    generate,
    stop,
    clear,
  }
}
