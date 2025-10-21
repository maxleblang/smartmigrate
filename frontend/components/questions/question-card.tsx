"use client"

import type { Question } from "@/lib/types"
import { TextInputQuestion } from "./text-input-question"
import { MultipleChoiceQuestion } from "./multiple-choice-question"
import { MultipleAnswerQuestion } from "./multiple-answer-question"
import { RepeatableTextQuestion } from "./repeatable-text-question"
import { RepeatableGroupQuestion } from "./repeatable-group-question"
import { useLanguageStore } from "@/stores/language-store"

interface QuestionCardProps {
  question: Question
  // value can be a simple string, an array of strings, or an array of structured entry objects
  value: string | string[] | Array<Record<string, string>>
  onChange: (value: string | string[] | Array<Record<string, string>>) => void
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const { language } = useLanguageStore()

  switch (question.type) {
    case "text":
      // If a plain text question defines a single entryField, render the TextInputQuestion
      // which supports inputType (date/phone/ssn) and validation/masking.
      if (question.entryFields && question.entryFields.length === 1) {
        const f = question.entryFields[0]
        return (
          <TextInputQuestion
            value={(value as string) || ""}
            onChange={onChange as (value: string) => void}
            placeholder={(f.placeholder && (f.placeholder as any)[language]) || (f.label as any)[language]}
            inputType={f.inputType}
          />
        )
      }

      return <TextInputQuestion value={value as string} onChange={onChange as (value: string) => void} />

    case "multipleChoice":
      return (
        <MultipleChoiceQuestion
          options={question.options?.[language] || []}
          value={value as string}
          onChange={onChange as (value: string) => void}
        />
      )

    case "multipleAnswer":
      return (
        <MultipleAnswerQuestion
          options={question.options?.[language] || []}
          value={(value as string[]) || []}
          onChange={onChange as (value: string[]) => void}
        />
      )

    case "repeatable":
      // If the question defines structured entryFields, render the group editor
      if (question.entryFields && question.entryFields.length > 0) {
        return (
          <RepeatableGroupQuestion
            question={question}
            value={(value as Array<Record<string, string>>) || []}
            onChange={onChange as (value: Array<Record<string, string>>) => void}
          />
        )
      }

      return (
        <RepeatableTextQuestion
          value={(value as string[]) || []}
          onChange={onChange as (value: string[]) => void}
          placeholder={question.entryLabel?.[language]}
        />
      )

    default:
      return null
  }
}
