"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextInputQuestion } from "./text-input-question"
import type { Question } from "@/lib/types"
import { useLanguageStore } from "@/stores/language-store"

interface RepeatableGroupQuestionProps {
  question: Question
  value?: Array<Record<string, string>>
  onChange: (value: Array<Record<string, string>>) => void
}

export function RepeatableGroupQuestion({ question, value, onChange }: RepeatableGroupQuestionProps) {
  const fields = question.entryFields || []
  const [items, setItems] = useState<Array<Record<string, string>>>(() =>
    Array.isArray(value) && value.length ? value : [fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {})],
  )

  const { language } = useLanguageStore()

  const handleAdd = () => {
    const newItem = fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {})
    const newItems = [...items, newItem]
    setItems(newItems)
    onChange(newItems)
  }

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
    onChange(newItems)
  }

  const handleFieldChange = (index: number, key: string, val: string) => {
    const newItems = items.map((it, i) => (i === index ? { ...it, [key]: val } : it))
    setItems(newItems)
    onChange(newItems)
  }

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="p-3 border rounded-md space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {fields.map((f) => (
              <div key={f.key}>
                {f.inputType ? (
                  <TextInputQuestion
                    value={item[f.key] || ""}
                    onChange={(val) => handleFieldChange(idx, f.key, val)}
                    placeholder={(f.placeholder && (f.placeholder as any)[language]) || (f.label as any)[language]}
                    inputType={f.inputType}
                  />
                ) : (
                  <Input
                    value={item[f.key] || ""}
                    onChange={(e) => handleFieldChange(idx, f.key, e.target.value)}
                    placeholder={(f.placeholder && (f.placeholder as any)[language]) || (f.label as any)[language]}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button variant="destructive" onClick={() => handleRemove(idx)}>
              Remove
            </Button>
          </div>
        </div>
      ))}

      <div>
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  )
}
