"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import translations from "@/locales/translations.json"

type Language = "en" | "es" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language")
      if (saved === "en" || saved === "es" || saved === "fr") {
        console.log("[v0] Loaded language from localStorage:", saved)
        return saved
      }
    }
    return "en"
  })

  useEffect(() => {
    console.log("[v0] Language changed to:", language)
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations.en]
    console.log("[v0] Translation lookup:", { key, language, translation })
    return translation || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
