"use client"

import { cn } from "@/lib/utils"
import { Check, ChevronDown } from "lucide-react"
import type { Question, QuestionGroup } from "@/lib/types"
import { useLanguageStore } from "@/stores/language-store"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface ProgressTrackerProps {
  questions: Question[]
  totalQuestions: number
  currentQuestion: number
  answeredQuestions: Set<number>
  skippedQuestions: Set<number>
  invalidQuestions?: Set<number>
  onQuestionClick: (index: number) => void
  questionGroups?: Record<string, QuestionGroup>
}

export function ProgressTracker({
  questions,
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  skippedQuestions,
  invalidQuestions = new Set(),
  onQuestionClick,
  questionGroups,
}: ProgressTrackerProps) {
  const { t, language } = useLanguageStore()
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    questionGroups ? new Set(Object.keys(questionGroups)) : new Set()
  )

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName)
    } else {
      newExpanded.add(groupName)
    }
    setExpandedGroups(newExpanded)
  }

  const renderQuestionButton = (
    index: number,
    questionNumber: number,
    groupOffset: number = 0
  ) => {
    const isAnswered = answeredQuestions.has(index)
    const isCurrent = index === currentQuestion
    const isSkipped = skippedQuestions.has(index)
    const isInvalid = invalidQuestions.has(index)
    const questionName = questions[index]?.name[language] || `${t("question")} ${questionNumber}`

    return (
      <button
        key={index}
        onClick={() => onQuestionClick(index)}
        disabled={isSkipped}
        className={cn(
          "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
          !isSkipped && "hover:bg-accent hover:text-accent-foreground",
          isCurrent && "bg-primary text-primary-foreground hover:bg-primary/90",
          !isCurrent &&
            isInvalid &&
            !isSkipped &&
            "bg-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-500/30",
          !isCurrent &&
            isAnswered &&
            !isInvalid &&
            !isSkipped &&
            "bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-500/30",
          !isCurrent && !isAnswered && !isSkipped && !isInvalid && "hover:bg-accent",
          isSkipped && "opacity-40 cursor-not-allowed bg-muted",
        )}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all",
            isCurrent && !isSkipped && "border-primary-foreground bg-primary-foreground/20",
            !isCurrent && isInvalid && !isSkipped && "border-red-600 bg-red-500/30 dark:border-red-500",
            !isCurrent && isAnswered && !isInvalid && !isSkipped && "border-green-600 bg-green-500/30 dark:border-green-500",
            !isCurrent && !isAnswered && !isSkipped && !isInvalid && "border-muted-foreground/30",
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
  }

  // If groups are provided, render grouped view
  if (questionGroups && Object.keys(questionGroups).length > 0) {
    return (
      <div className="bg-card border-r border-border h-screen flex flex-col p-6">
        <h2 className="text-lg font-semibold text-card-foreground mb-6 flex-shrink-0">{t("progress")}</h2>

        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-3 pr-4">
            {Object.entries(questionGroups).map(([groupName, group]) => {
              const isExpanded = expandedGroups.has(groupName)

              return (
                <div key={groupName} className="space-y-2">
                  <button
                    onClick={() => toggleGroup(groupName)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-all"
                  >
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        !isExpanded && "-rotate-90"
                      )}
                    />
                    <span className="text-sm font-semibold">{groupName}</span>
                  </button>

                  {isExpanded && (
                    <div className="space-y-2 pl-4">
                      {group.questions.map((question, groupIndex) => {
                        const globalIndex = questions.findIndex((q) => q.id === question.id)
                        const questionNumber = globalIndex + 1

                        return renderQuestionButton(globalIndex, questionNumber)
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>

        <div className="mt-6 pt-6 border-t border-border flex-shrink-0">
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

  // Fallback to non-grouped view for backward compatibility
  return (
    <div className="bg-card border-r border-border h-screen flex flex-col p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-6 flex-shrink-0">{t("progress")}</h2>

      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-3 pr-4">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const questionNumber = i + 1
            return renderQuestionButton(i, questionNumber)
          })}
        </div>
      </ScrollArea>

      <div className="mt-6 pt-6 border-t border-border flex-shrink-0">
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
