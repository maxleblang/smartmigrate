"use client"

import { cn } from "@/lib/utils"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import type { Question, QuestionGroup } from "@/lib/types"
import { useLanguageStore } from "@/stores/language-store"

interface MobileProgressProps {
  questions: Question[]
  totalQuestions: number
  currentQuestion: number
  answeredQuestions: Set<number>
  skippedQuestions: Set<number>
  onQuestionClick: (index: number) => void
  questionGroups?: Record<string, QuestionGroup>
}

export function MobileProgress({
  questions,
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  skippedQuestions,
  onQuestionClick,
  questionGroups,
}: MobileProgressProps) {
  const { t, language } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)
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

  const currentQuestionName = questions[currentQuestion]?.name[language] || `${t("question")} ${currentQuestion + 1}`

  const renderQuestionGrid = () => {
    if (questionGroups && Object.keys(questionGroups).length > 0) {
      // Grouped view
      return (
        <div className="space-y-3">
          {Object.entries(questionGroups).map(([groupName, group]) => {
            const isExpanded = expandedGroups.has(groupName)

            return (
              <div key={groupName}>
                <button
                  onClick={() => toggleGroup(groupName)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-accent transition-all text-sm font-semibold"
                >
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      !isExpanded && "-rotate-90"
                    )}
                  />
                  {groupName}
                </button>

                {isExpanded && (
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {group.questions.map((question) => {
                      const globalIndex = questions.findIndex((q) => q.id === question.id)
                      const isAnswered = answeredQuestions.has(globalIndex)
                      const isCurrent = globalIndex === currentQuestion
                      const isSkipped = skippedQuestions.has(globalIndex)

                      return (
                        <button
                          key={globalIndex}
                          onClick={() => {
                            onQuestionClick(globalIndex)
                            setIsOpen(false)
                          }}
                          disabled={isSkipped}
                          className={cn(
                            "aspect-square rounded-lg flex items-center justify-center border-2 transition-all text-xs",
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
                            <Check className="w-3 h-3" />
                          ) : (
                            <span className="font-medium">{globalIndex + 1}</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )
    }

    // Non-grouped view (fallback for backward compatibility)
    return (
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
    )
  }

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
          {renderQuestionGrid()}
        </div>
      )}
    </div>
  )
}
