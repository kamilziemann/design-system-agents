"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CodeSection } from "./code-section"
import { LanguageSelector } from "./language-selector"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { useInputOutput } from "@/hooks/use-input-output"
import { Language } from '@/types/enums'

export const ComponentAgent = () => {
  const [requirements, setRequirements] = useState("")
  const [targetLanguage, setTargetLanguage] = useState<Language>(Language.REACT)


  const { output, isLoading, generate, stop, clear } = useInputOutput({
    api: "/api/generate/chat",
    body: { language: targetLanguage },
    onSuccess: () => {
      toast.success(`Your ${targetLanguage} component has been generated.`)
    },
    onError: (error) => {
      toast.error(`Generation failed: ${error.message}`)
    },
  })

  const handleGenerate = async () => {
    if (!requirements.trim()) {
      toast.error("Please describe what component you want to generate.")
      return
    }

    const prompt = `Generate a ${targetLanguage} component based on these requirements:\n\n${requirements}`
    await generate(prompt)
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setTargetLanguage(newLanguage)
    clear()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Component Agent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 min-h-[40px]">
              <LanguageSelector
                value={targetLanguage}
                onChange={handleLanguageChange}
                placeholder="Target language"
                className="w-48"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between min-h-[40px]">
                <h3 className="text-lg font-semibold text-gray-900">Define Requirements</h3>
              </div>
              <Textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Describe the component you want to generate. For example: 'A primary button with an optional leading icon and loading state'"
                className="min-h-[300px] resize-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="min-h-[40px]" />
            <CodeSection
              title="Generated Component Code"
              value={output}
              readOnly
              placeholder="Generated component code will appear here..."
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={handleGenerate} disabled={isLoading || !requirements.trim()} className="px-8">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Component
          </Button>
          {isLoading && (
            <Button variant="outline" onClick={stop} className="px-4">
              Stop
            </Button>
          )}
          {output && (
            <Button variant="outline" onClick={clear} className="px-4">
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
