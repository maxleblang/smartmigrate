"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Globe } from "lucide-react"
import { useLanguageStore } from "@/stores/language-store"

export default function LanguageSelectionPage() {
  const { setLanguage, t, language } = useLanguageStore()
  const router = useRouter()

  const handleLanguageSelect = (lang: "en" | "es" | "fr") => {
    console.log("Language selected:", lang)
    setLanguage(lang)
    setTimeout(() => {
      console.log("Navigating to questionnaire")
      router.push("/questionnaire")
    }, 100)
  }

  const languages = [
    { code: "en" as const, name: "English", flag: "🇬🇧" },
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
    { code: "fr" as const, name: "Français", flag: "🇫🇷" },
  ]

  console.log("Current language on selection page:", language)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
            <Globe className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{t("selectLanguage")}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <Card
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className="p-8 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 bg-card"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{lang.flag}</div>
                <h2 className="text-2xl font-semibold text-card-foreground">{lang.name}</h2>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
