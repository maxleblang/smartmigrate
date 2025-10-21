"use client"

import { questions } from "@/lib/questions"
import { getVisibleQuestions, getSkippedQuestions } from "@/lib/question-utils"
import { ProgressTracker } from "@/components/progress-tracker"
import { MobileProgress } from "@/components/mobile-progress"
import { QuestionCard } from "@/components/questions/question-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguageStore } from "@/stores/language-store"
import { useQuestionnaireStore } from "@/stores/questionnaire-store"

export default function QuestionnairePage() {
  const { t, language } = useLanguageStore()
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    answers: answersList,
    updateAnswer,
    clearAnswers
  } = useQuestionnaireStore()

  // Convert answers array to Map for compatibility with existing utils
  const answers = new Map(answersList.map(a => [a.questionId, a.value]))
  const visibleQuestions = getVisibleQuestions(questions, answers)
  const skippedQuestions = getSkippedQuestions(questions, answers)

  const currentQuestion = questions[currentQuestionIndex]

  const isCurrentQuestionVisible = visibleQuestions.some((q) => q.id === currentQuestion.id)

  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0

  const isCurrentQuestionAnswered =
    answers.has(currentQuestion.id) &&
    (Array.isArray(answers.get(currentQuestion.id))
      ? (answers.get(currentQuestion.id) as string[]).length > 0
      : answers.get(currentQuestion.id) !== "")

  const answeredQuestions = new Set(
    Array.from(answers.keys())
      .map((id) => questions.findIndex((q) => q.id === id))
      .filter((index) => index !== -1),
  )

  skippedQuestions.forEach((index) => answeredQuestions.add(index))

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      let nextIndex = currentQuestionIndex + 1
      while (nextIndex < questions.length && skippedQuestions.has(nextIndex)) {
        nextIndex++
      }
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      let prevIndex = currentQuestionIndex - 1
      while (prevIndex >= 0 && skippedQuestions.has(prevIndex)) {
        prevIndex--
      }
      if (prevIndex >= 0) {
        setCurrentQuestionIndex(prevIndex)
      }
    }
  }

  const handleSubmit = () => {
    console.log("Submitted answers:", answersList)
    alert("Questionnaire submitted! Check console for answers.")
    clearAnswers()
  }

  const handleAnswerChange = (value: string | string[]) => {
    const isEmpty = Array.isArray(value) ? value.length === 0 : value === ""

    if (isEmpty) {
      updateAnswer(currentQuestion.id, currentQuestion.type === "multipleAnswer" ? [] : "")
    } else {
      updateAnswer(currentQuestion.id, value)
    }
  }

  const handleQuestionClick = (index: number) => {
    if (!skippedQuestions.has(index)) {
      setCurrentQuestionIndex(index)
    }
  }

  const getCurrentAnswer = () => {
    const answer = answers.get(currentQuestion.id)
    if (currentQuestion.type === "multipleAnswer") {
      return Array.isArray(answer) ? answer : []
    }
    return answer || ""
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Progress */}
      <div className="lg:hidden">
        <MobileProgress
          questions={questions}
          totalQuestions={questions.length}
          currentQuestion={currentQuestionIndex}
          answeredQuestions={answeredQuestions}
          skippedQuestions={skippedQuestions}
          onQuestionClick={handleQuestionClick}
        />
      </div>

      {/* Desktop Layout */}
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <ProgressTracker
            questions={questions}
            totalQuestions={questions.length}
            currentQuestion={currentQuestionIndex}
            answeredQuestions={answeredQuestions}
            skippedQuestions={skippedQuestions}
            onQuestionClick={handleQuestionClick}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto p-6 lg:p-12">
            <Card className="p-6 lg:p-8 mb-6">
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-2">
                  {t("question")} {currentQuestionIndex + 1} of {questions.length}
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-card-foreground text-balance">
                  {currentQuestion.text[language]}
                </h2>
              </div>

              <div className="min-h-[200px]">
                <QuestionCard question={currentQuestion} value={getCurrentAnswer()} onChange={handleAnswerChange} />
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                {t("previous")}
              </Button>

              {isLastQuestion ? (
                <Button onClick={handleSubmit} className="flex items-center gap-2">
                  {t("submit")}
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex items-center gap-2">
                  {t("next")}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
