"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import LanguageSelector from "./LanguageSelector"
import { useLanguage } from "../contexts/LanguageContext"
import { FormattedMessage } from "react-intl"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0A0A0A] shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          João Rondon
        </Link>
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            {["about", "skills", "projects", "experience", "resume", "contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FormattedMessage id={`nav.${item}`} />
                </button>
              </li>
            ))}
          </ul>
          <LanguageSelector />
        </div>
      </nav>
    </motion.header>
  )
}

export default Header

