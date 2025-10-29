import type { Answer, Question } from "./types"

/**
 * Converts answers from the questionnaire store format into a flat JSON object
 * compatible with the backend's /generate_pdf endpoint.
 * 
 * Format:
 * - Text fields: key -> value (string)
 * - Multiple choice: key -> index (number) of selected option
 * - Repeatable text: key_0, key_1, etc. -> value
 * - Repeatable structured: key_field_index -> value for each field
 * - Multiple answer: key_0, key_1, etc. -> index (number) of each selected option
 * - Phone fields: Extracts area code (first 3 digits) and stores in phone_area key,
 *   stores remaining number in phone key
 */

/**
 * Serializes a phone number field by extracting the area code and storing it separately.
 * Input format: "(555) 555-5555" or similar variants
 * Stores: phoneAreaKey -> "555", phoneKey -> "5555555"
 */
function serializePhoneField(
  phoneStr: string,
  phoneKey: string,
  serialized: Record<string, string | number>
): void {
  // Remove all non-digit characters
  const digitsOnly = phoneStr.replace(/\D/g, "")
  
  // Extract area code (first 3 digits) and remaining number
  const areaCode = digitsOnly.slice(0, 3)
  const phoneNumber = digitsOnly.slice(3)
  
  // Find the corresponding phone_area field key
  const phoneAreaKey = phoneKey.replace("_phone", "_phone_area")
  
  if (areaCode) {
    serialized[phoneAreaKey] = areaCode
  }
  if (phoneNumber) {
    serialized[phoneKey] = phoneNumber
  }
}

export function serializeAnswers(
  answers: Answer[],
  questions: Question[]
): Record<string, string | number> {
  const serialized: Record<string, string | number> = {}
  const questionMap = new Map(questions.map(q => [q.id, q]))

  for (const answer of answers) {
    const question = questionMap.get(answer.questionId)
    if (!question) continue

    // Handle multipleChoice - store the index of the selected option
    if (question.type === "multipleChoice") {
      if (typeof answer.value === "string" && question.options) {
        const language = "en" // Default to English
        const options = question.options[language]
        const selectedIndex = options.indexOf(answer.value)
        if (selectedIndex !== -1) {
          // For multipleChoice, we need to use entryFields if available to get the key
          // Otherwise, generate key based on question id
          const key = question.entryFields?.[0]?.key || `${question.id}_choice`
          serialized[key] = selectedIndex
        }
      }
    }
    // Handle repeatable text questions (simple string arrays)
    else if (question.type === "repeatable" && Array.isArray(answer.value)) {
      if (answer.value.length > 0 && typeof answer.value[0] === "string") {
        // Simple repeatable text items
        (answer.value as string[]).forEach((item, index) => {
          if (item.trim() !== "") {
            const key = `${question.id}_${index}`
            serialized[key] = item
          }
        })
      }
      // Structured repeatable entries (array of objects)
      else if (answer.value.length > 0 && typeof answer.value[0] === "object") {
        const entries = answer.value as Array<Record<string, string>>
        // Only append entry numbers if the question allows multiple entries (no maxEntries or maxEntries > 1)
        const allowsMultipleEntries = !question.maxEntries || question.maxEntries > 1
        
        entries.forEach((entry, entryIndex) => {
          if (question.entryFields) {
            for (const field of question.entryFields) {
              const value = entry[field.key]
              if (value && value.trim() !== "") {
                // Append entry number (1-indexed) to the key only if multiple entries are allowed
                const fieldKey = allowsMultipleEntries ? `${field.key}_${entryIndex + 1}` : field.key
                
                // Handle phone fields: extract area code and store separately
                if (field.inputType === "phone" && field.key.endsWith("_phone")) {
                  serializePhoneField(value, fieldKey, serialized)
                } else {
                  serialized[fieldKey] = value
                }
              }
            }
          }
        })
      }
    }
    // Handle multipleAnswer - store indices of selected options
    else if (question.type === "multipleAnswer" && Array.isArray(answer.value)) {
      if (question.options) {
        const language = "en" // Default to English
        const options = question.options[language]
        const indices: number[] = []
        
        for (const selectedValue of answer.value as string[]) {
          const index = options.indexOf(selectedValue)
          if (index !== -1) {
            indices.push(index)
          }
        }
        
        // Store each index with a suffix
        indices.forEach((index, i) => {
          const key = question.entryFields?.[0]?.key || `${question.id}_${i}`
          serialized[key] = index
        })
      }
    }
    // Handle text questions
    else if (question.type === "text") {
      if (typeof answer.value === "string" && answer.value.trim() !== "") {
        // Use the key from entryFields if available
        if (question.entryFields && question.entryFields.length > 0) {
          question.entryFields.forEach((field, index) => {
            if (index === 0 && typeof answer.value === "string") {
              // Handle phone fields: extract area code and store separately
              if (field.inputType === "phone" && field.key.endsWith("_phone")) {
                serializePhoneField(answer.value, field.key, serialized)
              } else {
                serialized[field.key] = answer.value
              }
            }
          })
        } else {
          // Fallback to question id if no entryFields
          serialized[question.id] = answer.value
        }
      }
    }
  }

  return serialized
}
