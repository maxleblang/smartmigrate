"use client"

import { useTranslation } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import type { Question } from "@/lib/types"

interface MobileProgressProps {
  questions: Question[]
  totalQuestions: number
  currentQuestion: number
  answeredQuestions: Set<number>
  skippedQuestions: Set<number>
  onQuestionClick: (index: number) => void
}

export function MobileProgress({
  questions,
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  skippedQuestions,
  onQuestionClick,
}: MobileProgressProps) {
  const { t, language } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentQuestionName = questions[currentQuestion]?.name[language] || `${t("question")} ${currentQuestion + 1}`

  return (
    <div className="bg-card border-b border-border">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex items-center justify-between text-left">
        <div>
          <div className="text-sm font-medium text-card-foreground">{currentQuestionName}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {answeredQuestions.size} / {totalQuestions} completed
          </div>
        </div>
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(answeredQuestions.size / totalQuestions) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: totalQuestions }, (_, i) => {
              const isAnswered = answeredQuestions.has(i)
              const isCurrent = i === currentQuestion
              const isSkipped = skippedQuestions.has(i)

              return (
                <button
                  key={i}
                  onClick={() => {
                    onQuestionClick(i)
                    setIsOpen(false)
                  }}
                  disabled={isSkipped}
                  className={cn(
                    "aspect-square rounded-lg flex items-center justify-center border-2 transition-all",
                    isCurrent && !isSkipped && "border-primary bg-primary text-primary-foreground",
                    !isCurrent &&
                      isAnswered &&
                      !isSkipped &&
                      "border-green-600 bg-green-500/20 text-green-700 dark:border-green-500 dark:text-green-400",
                    !isCurrent && !isAnswered && !isSkipped && "border-muted bg-background",
                    isSkipped && "opacity-40 cursor-not-allowed border-muted bg-muted",
                  )}
                >
                  {isAnswered || isSkipped ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{i + 1}</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
