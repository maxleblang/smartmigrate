"use client"

import type { Question } from "@/lib/types"
import { TextInputQuestion } from "./text-input-question"
import { MultipleChoiceQuestion } from "./multiple-choice-question"
import { MultipleAnswerQuestion } from "./multiple-answer-question"
import { useLanguageStore } from "@/stores/language-store"

interface QuestionCardProps {
  question: Question
  value: string | string[]
  onChange: (value: string | string[]) => void
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const { language } = useLanguageStore()

  switch (question.type) {
    case "text":
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

    default:
      return null
  }
}
