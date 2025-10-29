import type { Question } from "./types"
import { i589_part_a_questions } from "./i589_questions"

// For backward compatibility, keep `questions` export referencing the I-589 Part A set
export const questions: Question[] = i589_part_a_questions
