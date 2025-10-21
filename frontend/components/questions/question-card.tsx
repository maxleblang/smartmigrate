"use client"

import type { Question } from "@/lib/types"
import { TextInputQuestion } from "./text-input-question"
import { MultipleChoiceQuestion } from "./multiple-choice-question"
import { MultipleAnswerQuestion } from "./multiple-answer-question"
import { useTranslation } from "@/contexts/language-context"

interface QuestionCardProps {
  question: Question
  value: string | string[]
  onChange: (value: string | string[]) => void
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const { language } = useTranslation()

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
