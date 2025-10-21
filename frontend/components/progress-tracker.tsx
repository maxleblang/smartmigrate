"use client"

import { useTranslation } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import type { Question } from "@/lib/types"

interface ProgressTrackerProps {
  questions: Question[]
  totalQuestions: number
  currentQuestion: number
  answeredQuestions: Set<number>
  skippedQuestions: Set<number>
  onQuestionClick: (index: number) => void
}

export function ProgressTracker({
  questions,
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  skippedQuestions,
  onQuestionClick,
}: ProgressTrackerProps) {
  const { t, language } = useTranslation()

  return (
    <div className="bg-card border-r border-border h-full p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-6">{t("progress")}</h2>
      <div className="space-y-3">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const questionNumber = i + 1
          const isAnswered = answeredQuestions.has(i)
          const isCurrent = i === currentQuestion
          const isSkipped = skippedQuestions.has(i)
          const questionName = questions[i]?.name[language] || `${t("question")} ${questionNumber}`

          return (
            <button
              key={i}
              onClick={() => onQuestionClick(i)}
              disabled={isSkipped}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                !isSkipped && "hover:bg-accent hover:text-accent-foreground",
                isCurrent && "bg-primary text-primary-foreground hover:bg-primary/90",
                !isCurrent &&
                  isAnswered &&
                  !isSkipped &&
                  "bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30",
                !isCurrent && !isAnswered && !isSkipped && "hover:bg-accent",
                isSkipped && "opacity-40 cursor-not-allowed bg-muted",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all",
                  isCurrent && !isSkipped && "border-primary-foreground bg-primary-foreground/20",
                  !isCurrent && isAnswered && !isSkipped && "border-green-600 bg-green-500/30 dark:border-green-500",
                  !isCurrent && !isAnswered && !isSkipped && "border-muted-foreground/30",
                  isSkipped && "border-muted-foreground/20 bg-muted",
                )}
              >
                {isAnswered || isSkipped ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{questionNumber}</span>
                )}
              </div>
              <span className="text-sm font-medium">{questionName}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-sm text-muted-foreground">
          {answeredQuestions.size} / {totalQuestions} completed
        </div>
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(answeredQuestions.size / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
