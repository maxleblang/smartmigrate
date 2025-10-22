"use client"

import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { useLanguageStore } from "@/stores/language-store"
import type { InputType } from "@/lib/types"

interface TextInputQuestionProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  inputType?: InputType
}

function validate(inputType: InputType | undefined, value: string) {
  if (!inputType) return true
  const v = value.trim()
  switch (inputType) {
    case "date":
      // simple MM/DD/YYYY check
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

export function TextInputQuestion({ value, onChange, placeholder, inputType }: TextInputQuestionProps) {
  const { language } = useLanguageStore()
  const [touched, setTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const cursorPosRef = useRef<number>(0)

  const isValid = validate(inputType, value)

  const hint = (() => {
    switch (inputType) {
      case "date":
        return { en: "MM/DD/YYYY", es: "MM/DD/AAAA", fr: "MM/JJ/AAAA" }
      case "dateRange":
        return { en: "MM/YYYY - MM/YYYY", es: "MM/AAAA - MM/AAAA", fr: "MM/AAAA - MM/AAAA" }
      case "phone":
        return { en: "(555) 555-5555", es: "(555) 555-5555", fr: "(555) 555-5555" }
      case "ssn":
        return { en: "___-__-____", es: "___-__-____", fr: "___-__-____" }
      default:
        return undefined
    }
  })()

  const maskInputValue = (raw: string): string => {
    if (!inputType) return raw
    const digits = raw.replace(/\D/g, "")
    switch (inputType) {
      case "date": {
        // MMDDYYYY -> MM/DD/YYYY
        // Show slash after 2 digits (MM), after 4 digits (DD), format with all 8 digits (YYYY)
        const d = digits.slice(0, 8)
        if (d.length === 0) return ""
        if (d.length === 1) return d
        if (d.length === 2) return `${d.slice(0, 2)}/`
        if (d.length === 3) return `${d.slice(0, 2)}/${d.slice(2)}`
        if (d.length === 4) return `${d.slice(0, 2)}/${d.slice(2, 4)}/`
        return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
      }
      case "dateRange": {
        // MMYYYYMMYYYY -> MM/YYYY - MM/YYYY
        const d = digits.slice(0, 12)
        if (d.length === 0) return ""
        if (d.length === 1) return d
        if (d.length === 2) return `${d.slice(0, 2)}/`
        if (d.length === 3) return `${d.slice(0, 2)}/${d.slice(2)}`
        if (d.length === 4) return `${d.slice(0, 2)}/${d.slice(2)}`
        if (d.length === 5) return `${d.slice(0, 2)}/${d.slice(2)} -`
        if (d.length === 6) return `${d.slice(0, 2)}/${d.slice(2, 6)} - `
        if (d.length === 7) return `${d.slice(0, 2)}/${d.slice(2, 6)} - ${d.slice(6)}`
        if (d.length === 8) return `${d.slice(0, 2)}/${d.slice(2, 6)} - ${d.slice(6)}/`
        if (d.length <= 12) return `${d.slice(0, 2)}/${d.slice(2, 6)} - ${d.slice(6, 8)}/${d.slice(8)}`
        return `${d.slice(0, 2)}/${d.slice(2, 6)} - ${d.slice(6, 8)}/${d.slice(8, 12)}`
      }
      case "phone": {
        // digits -> (XXX) XXX-XXXX
        const d = digits.slice(0, 10)
        if (d.length === 0) return ""
        if (d.length === 1) return d
        if (d.length === 2) return d
        if (d.length === 3) return `(${d}) `
        if (d.length === 4) return `(${d.slice(0, 3)}) ${d.slice(3)}`
        if (d.length === 5) return `(${d.slice(0, 3)}) ${d.slice(3)}`
        if (d.length === 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-`
        return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
      }
      case "ssn": {
        // XXX-XX-XXXX
        const d = digits.slice(0, 9)
        if (d.length === 0) return ""
        if (d.length === 1) return d
        if (d.length === 2) return d
        if (d.length === 3) return `${d}-`
        if (d.length === 4) return `${d.slice(0, 3)}-${d.slice(3)}`
        if (d.length === 5) return `${d.slice(0, 3)}-${d.slice(3)}-`
        return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`
      }
      default:
        return raw
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const oldValue = value
    const oldCursorPos = input.selectionStart || 0
    const newRaw = input.value
    const newFormatted = maskInputValue(newRaw)

    const oldDigitCount = oldValue.replace(/\D/g, "").length
    const newDigitCount = newFormatted.replace(/\D/g, "").length
    const digitsAdded = newDigitCount - oldDigitCount
    
    let cursorPos = oldCursorPos

    if (digitsAdded > 0) {
      // User typed digit(s)
      cursorPos = oldCursorPos + digitsAdded
      // Move cursor past any separators that were added at this position
      while (cursorPos < newFormatted.length && !/\d/.test(newFormatted[cursorPos])) {
        cursorPos++
      }
    } else if (digitsAdded < 0) {
      // User deleted digit(s)
      cursorPos = Math.min(oldCursorPos, newFormatted.length)
    } else if (newFormatted.length > oldValue.length) {
      // Only separators were added, move cursor to end
      cursorPos = newFormatted.length
    }

    onChange(newFormatted)
    cursorPosRef.current = cursorPos

    // Set cursor position after state update
    requestAnimationFrame(() => {
      input.setSelectionRange(cursorPosRef.current, cursorPosRef.current)
    })
  }

  return (
    <div className="space-y-2">
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        placeholder={placeholder || (hint && (hint as any)[language])}
        className="text-lg p-6 h-auto"
      />
      {!isValid && touched && (
        <div className="text-sm text-red-600">{language === "es" ? "Entrada inválida" : language === "fr" ? "Entrée invalide" : "Invalid input"}</div>
      )}
    </div>
  )
}
