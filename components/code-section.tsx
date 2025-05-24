"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Clipboard } from "lucide-react"
import { toast } from "sonner"


interface CodeSectionProps {
  title: string
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
  placeholder?: string
  className?: string
}

export const CodeSection = ({
  title,
  value,
  onChange,
  readOnly = false,
  placeholder,
  className = "",
}: CodeSectionProps) => {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success("Code has been copied to your clipboard.")
    } catch (err) {
      toast.error("Could not copy code to clipboard.")
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange?.(text)
      toast.success("Code has been pasted from your clipboard.")
    } catch (err) {
      toast.error("Could not paste from clipboard.")
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between min-h-[40px]">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex gap-2">
          {!readOnly && (
            <Button variant="outline" size="sm" onClick={handlePaste} className="flex items-center gap-2">
              <Clipboard className="h-4 w-4" />
              Paste
            </Button>
          )}
          {value && (
            <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          )}
        </div>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        className="min-h-[300px] font-mono text-sm resize-none"
      />
    </div>
  )
}
