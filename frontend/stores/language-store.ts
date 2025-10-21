import { create } from "zustand"
import { persist } from "zustand/middleware"
import translations from "@/locales/translations.json"

type Language = "en" | "es" | "fr"

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (lang: Language) => set({ language: lang }),
      t: (key: string) => {
        const { language } = get()
        const translation = translations[language]?.[key as keyof typeof translations.en]
        return translation || key
      },
    }),
    {
      name: "language-storage",
    }
  )
)