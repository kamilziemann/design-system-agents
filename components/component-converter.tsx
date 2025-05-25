"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeSection } from "./code-section"
import { LanguageSelector } from "./language-selector"
import { SampleButtons } from "./sample-buttons"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { useInputOutput } from "@/hooks/use-input-output"
import { Language } from '@/types/enums'
import { API_ROUTES } from '@/consts/api-routes'

export const ComponentConverter = () => {
  const [inputCode, setInputCode] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState<Language>(Language.REACT)
  const [targetLanguage, setTargetLanguage] = useState<Language>(Language.KOTLIN)


  const { output, isLoading, generate, stop, clear } = useInputOutput({
    api: API_ROUTES.CONVERT,
    body: { sourceLanguage, targetLanguage },
    onSuccess: () => {
      toast.success(`Your ${sourceLanguage} code has been converted to ${targetLanguage}.`)
    },
    onError: (error) => {
      toast.error(`Conversion failed: ${error.message}`)
    },
  })

  const handleSampleSelect = (code: string, sampleLanguage: Language) => {
    setInputCode(code)
    setSourceLanguage(sampleLanguage)
    clear()
  }

  const handleConvert = async () => {
    if (!inputCode.trim()) {
      toast.error("Please enter some code to convert.")
      return
    }

    if (sourceLanguage === targetLanguage) {
      toast.error("Please select different source and target languages.")
      return
    }

    const prompt = `Convert this ${sourceLanguage} component to ${targetLanguage}, preserving all functionality and visual design:
    \n\n\`\`\`${sourceLanguage}\n${inputCode}\n\`\`\``
    await generate(prompt)
  }

  const handleSourceLanguageChange = (newLanguage: Language) => {
    setSourceLanguage(newLanguage)
    if (newLanguage === targetLanguage) {
      const languages: Language[] = [Language.REACT, Language.KOTLIN, Language.SWIFT]
      const availableTargets = languages.filter((lang) => lang !== newLanguage)
      setTargetLanguage(availableTargets[0])
    }
    clear()
  }

  const handleTargetLanguageChange = (newLanguage: Language) => {
    setTargetLanguage(newLanguage)
    clear()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Component Converter</CardTitle>
          <SampleButtons onSampleSelect={handleSampleSelect} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 min-h-[40px]">
              <LanguageSelector
                value={sourceLanguage}
                onChange={handleSourceLanguageChange}
                placeholder="Source language"
                className="w-48"
              />
            </div>
            <CodeSection
              title="Input Code"
              value={inputCode}
              onChange={setInputCode}
              placeholder="Paste your code here to convert..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 min-h-[40px]">
              <LanguageSelector
                value={targetLanguage}
                onChange={handleTargetLanguageChange}
                placeholder="Target language"
                className="w-48"
                excludeLanguage={sourceLanguage}
              />
            </div>
            <CodeSection
              title="Converted Code"
              value={output}
              readOnly
              placeholder="Converted code will appear here..."
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={handleConvert}
            disabled={isLoading || !inputCode.trim() || sourceLanguage === targetLanguage}
            className="px-8"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Convert Component
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
