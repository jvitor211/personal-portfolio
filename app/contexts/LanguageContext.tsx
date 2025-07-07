"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"
import { IntlProvider } from "react-intl"
import messages from "../translations/messages"

export type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("pt")

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <IntlProvider messages={messages[language]} locale={language}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

