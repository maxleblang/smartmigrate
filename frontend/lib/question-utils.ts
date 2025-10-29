import type { Question, QuestionCondition, InputType } from "./types"

function validateInputType(inputType: InputType | undefined, value: string): boolean {
  if (!inputType) return true
  if (!value || value.trim() === "") return false // Empty value for inputType field is invalid
  const v = value.trim()
  switch (inputType) {
    case "date":
      // MM/DD/YYYY format
      return /^\d{2}\/\d{2}\/\d{4}$/.test(v)
    case "dateRange":
      return /^\d{2}\/\d{4} - \d{2}\/\d{4}$/.test(v) || /^\d{4}-\d{4}$/.test(v)
    case "phone":
      return /^\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/.test(v)
    case "ssn":
      return /^\d{3}-\d{2}-\d{4}$/.test(v)
    default:
      return true
  }
}

export function isQuestionValid(question: Question, answer: string | string[] | Array<Record<string, string>> | undefined): boolean {
  // For questions with entryFields (whether text or repeatable type)
  if (question.entryFields && question.entryFields.length > 0) {
    // If it's a single-field text question with inputType validation (e.g., date, phone, ssn)
    if (question.type === "text" && question.entryFields.length === 1) {
      if (typeof answer !== "string") return true // No answer yet or wrong type, so not invalid
      const field = question.entryFields[0]
      if (field.inputType) {
        // If there's an inputType, validate it
        return validateInputType(field.inputType, answer)
      }
      return true
    }

    // For repeatable structured entries with inputType validation
    if (question.type === "repeatable") {
      if (!Array.isArray(answer) || answer.length === 0) return true // No entries filled yet, so not invalid yet

      // Check each entry's fields
      return (answer as Array<Record<string, string>>).every((entry) =>
        question.entryFields!.every((field) => {
          const value = entry[field.key]
          if (!value || value.trim() === "") return true // Empty field is okay
          if (field.inputType) {
            return validateInputType(field.inputType, value)
          }
          return true
        })
      )
    }
  }

  return true
}

export function isQuestionConditionMet(
  condition: QuestionCondition | undefined,
  answers: Map<string, string | string[] | Array<Record<string, string>>>,
  questions: Question[],
): boolean {
  if (!condition) return true

  const answer = answers.get(condition.questionId)
  if (answer === undefined) return false

  // Find the question to get its options
  const question = questions.find((q) => q.id === condition.questionId)
  if (!question || !question.options) return false

  const operator = condition.operator || "equals"

  // Convert answer text to option index
  const getOptionIndex = (answerValue: string): number => {
    // Check all language options to find the index
    for (const lang of ["en", "es", "fr"] as const) {
      const options = question.options?.[lang]
      if (options) {
        const index = options.indexOf(answerValue)
        if (index !== -1) return index
      }
    }
    return -1
  }

  switch (operator) {
    case "equals":
      if (Array.isArray(answer)) {
        // If it's an array of primitive answers (strings), handle normally.
        // If it's an array of structured entries (objects), we can't match to options.
        if (answer.length === 0) return false
        if (typeof answer[0] === "object") return false
        const answerIndices = (answer as string[]).map(getOptionIndex).filter((i) => i !== -1)
        return Array.isArray(condition.expectedOptionIndex)
          ? answerIndices.length === condition.expectedOptionIndex.length &&
              answerIndices.every((idx) => Array.isArray(condition.expectedOptionIndex) && condition.expectedOptionIndex.includes(idx))
          : false
      }
      if (typeof answer !== "string") return false
      const answerIndex = getOptionIndex(answer)
      return answerIndex === condition.expectedOptionIndex

    case "notEquals":
      if (Array.isArray(answer)) {
        if (answer.length === 0) return true
        if (typeof answer[0] === "object") return true
        const answerIndices = (answer as string[]).map(getOptionIndex).filter((i) => i !== -1)
        return Array.isArray(condition.expectedOptionIndex)
          ? !(
              answerIndices.length === condition.expectedOptionIndex.length &&
              answerIndices.every((idx) => Array.isArray(condition.expectedOptionIndex) && condition.expectedOptionIndex.includes(idx))
            )
          : true
      }
      if (typeof answer !== "string") return true
      const notEqualIndex = getOptionIndex(answer)
      return notEqualIndex !== condition.expectedOptionIndex

    case "includes":
      if (Array.isArray(answer)) {
        if (answer.length === 0) return false
        if (typeof answer[0] === "object") return false
        const answerIndices = (answer as string[]).map(getOptionIndex).filter((i) => i !== -1)
        return (
          typeof condition.expectedOptionIndex === "number" && answerIndices.includes(condition.expectedOptionIndex)
        )
      }
      return false

    case "notIncludes":
      if (Array.isArray(answer)) {
        if (answer.length === 0) return true
        if (typeof answer[0] === "object") return true
        const answerIndices = (answer as string[]).map(getOptionIndex).filter((i) => i !== -1)
        return (
          typeof condition.expectedOptionIndex === "number" && !answerIndices.includes(condition.expectedOptionIndex)
        )
      }
      return false

    default:
      return true
  }
}

export function getVisibleQuestions(questions: Question[], answers: Map<string, string | string[] | Array<Record<string, string>>>): Question[] {
  return questions.filter((question) => isQuestionConditionMet(question.condition, answers, questions))
}

export function getSkippedQuestions(questions: Question[], answers: Map<string, string | string[] | Array<Record<string, string>>>): Set<number> {
  const skipped = new Set<number>()
  questions.forEach((question, index) => {
    if (!isQuestionConditionMet(question.condition, answers, questions)) {
      skipped.add(index)
    }
  })
  return skipped
}
