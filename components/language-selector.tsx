"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Language } from "@/types/enums"



interface LanguageSelectorProps {
  value: Language
  onChange: (value: Language) => void
  placeholder?: string
  className?: string
  excludeLanguage?: Language
}

export const LanguageSelector = ({
  value,
  onChange,
  placeholder = "Select language",
  className = "",
  excludeLanguage,
}: LanguageSelectorProps) => {
  const languages = [
    { value: Language.REACT, label: "React (JSX)" },
    { value: Language.KOTLIN, label: "Kotlin (Compose)" },
    { value: Language.SWIFT, label: "Swift (SwiftUI)" },
  ].filter((lang) => lang.value !== excludeLanguage)

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
