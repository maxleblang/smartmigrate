"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguageStore } from "@/stores/language-store"

interface RepeatableTextQuestionProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string | { en?: string; es?: string; fr?: string }
}

export function RepeatableTextQuestion({ value, onChange, placeholder }: RepeatableTextQuestionProps) {
  const [items, setItems] = useState<string[]>(() => (Array.isArray(value) ? value : []))
  const { language } = useLanguageStore()

  const handleAdd = () => {
    const newItems = [...items, ""]
    setItems(newItems)
    onChange(newItems)
  }

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
    onChange(newItems)
  }

  const handleChange = (index: number, val: string) => {
    const newItems = items.map((it, i) => (i === index ? val : it))
    setItems(newItems)
    onChange(newItems)
  }

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <Input
            value={item}
            onChange={(e) => handleChange(idx, e.target.value)}
            placeholder={
              typeof placeholder === "string" ? placeholder : (placeholder && (placeholder as any)[language]) || undefined
            }
            className="flex-1"
          />
          <Button variant="destructive" onClick={() => handleRemove(idx)}>
            Remove
          </Button>
        </div>
      ))}

      <div>
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  )
}
