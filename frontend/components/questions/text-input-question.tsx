"use client"

import { Input } from "@/components/ui/input"

interface TextInputQuestionProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TextInputQuestion({ value, onChange, placeholder }: TextInputQuestionProps) {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-lg p-6 h-auto"
      />
    </div>
  )
}
