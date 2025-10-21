"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface MultipleAnswerQuestionProps {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
}

export function MultipleAnswerQuestion({ options, value, onChange }: MultipleAnswerQuestionProps) {
  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isChecked = value.includes(option)
        return (
          <div
            key={option}
            className={cn(
              "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-accent",
              isChecked ? "border-primary bg-primary/5" : "border-border",
            )}
            onClick={() => handleToggle(option)}
          >
            <Checkbox id={option} checked={isChecked} onCheckedChange={() => handleToggle(option)} />
            <Label htmlFor={option} className="flex-1 cursor-pointer text-base font-medium">
              {option}
            </Label>
          </div>
        )
      })}
    </div>
  )
}
