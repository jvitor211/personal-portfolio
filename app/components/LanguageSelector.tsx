"use client"

import type React from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { motion } from "framer-motion"

const languages = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
]

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "pt" | "en")}
        className="bg-transparent text-white border border-gray-600 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-gray-800">
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </motion.div>
  )
}

export default LanguageSelector

