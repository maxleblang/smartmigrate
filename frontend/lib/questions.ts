import type { Question } from "./types"
import { i589_questions } from "./i589_questions"

// Flatten all questions from groups for use in the questionnaire
const flattenQuestions = (groups: Record<string, any>): Question[] => {
  return Object.values(groups).flatMap((group) => group.questions)
}

export const questions: Question[] = flattenQuestions(i589_questions)
