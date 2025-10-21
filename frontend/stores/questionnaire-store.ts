import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Answer } from "@/lib/types"

interface QuestionnaireState {
  currentQuestionIndex: number
  answers: Answer[]
  setCurrentQuestionIndex: (index: number) => void
  setAnswer: (answer: Answer) => void
  updateAnswer: (questionId: string, value: string | string[] | Array<Record<string, string>>) => void
  clearAnswers: () => void
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set, get) => ({
      currentQuestionIndex: 0,
      answers: [],
      setCurrentQuestionIndex: (index: number) => set({ currentQuestionIndex: index }),
      setAnswer: (answer: Answer) =>
        set((state) => ({
          answers: [...state.answers.filter((a) => a.questionId !== answer.questionId), answer],
        })),
      updateAnswer: (questionId: string, value: string | string[] | Array<Record<string, string>>) =>
        set((state) => ({
          answers: [...state.answers.filter((a) => a.questionId !== questionId), { questionId, value }],
        })),
      clearAnswers: () => set({ answers: [], currentQuestionIndex: 0 }),
    }),
    {
      name: "questionnaire-storage",
    }
  )
)