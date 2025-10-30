export type QuestionType = "text" | "multipleChoice" | "multipleAnswer" | "repeatable"

export interface QuestionCondition {
  questionId: string
  expectedOptionIndex?: number | number[]
  operator?: "equals" | "includes" | "notEquals" | "notIncludes"
}

export type InputType = "text" | "date" | "dateRange" | "phone" | "ssn"

export interface Question {
  id: string
  name: {
    en: string
    es: string
    fr: string
  }
  type: QuestionType
  text: {
    en: string
    es: string
    fr: string
  }
  // Optional maximum number of entries for repeatable questions.
  // When set to 1, UI should render a single structured group without Add/Remove controls.
  maxEntries?: number
  options?: {
    en: string[]
    es: string[]
    fr: string[]
  }
  // when type is 'repeatable', indicates the placeholder/label for each entry
  entryLabel?: {
    en: string
    es: string
    fr: string
  }
  // For structured repeatable entries (like addresses), define the fields per entry
  entryFields?: {
    key: string // unique key for the field, used in answers
    label?: {
      en: string
      es: string
      fr: string
    }
    placeholder?: {
      en?: string
      es?: string
      fr?: string
    }
    // optional input type for this field (date, phone, ssn, etc.)
    inputType?: InputType
  }[]
  condition?: QuestionCondition
}

export interface Answer {
  questionId: string
  // For repeatable structured entries, value can be an array of objects mapping field keys to string values
  value: string | string[] | Array<Record<string, string>>
}

export interface QuestionGroup {
  name?: {
    en: string
    es: string
    fr: string
  }
  questions: Question[]
}
