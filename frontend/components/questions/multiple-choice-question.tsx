"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface MultipleChoiceQuestionProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function MultipleChoiceQuestion({ options, value, onChange }: MultipleChoiceQuestionProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
      {options.map((option) => (
        <div
          key={option}
          className={cn(
            "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-accent",
            value === option ? "border-primary bg-primary/5" : "border-border",
          )}
          onClick={() => onChange(option)}
        >
          <RadioGroupItem value={option} id={option} />
          <Label htmlFor={option} className="flex-1 cursor-pointer text-base font-medium">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
