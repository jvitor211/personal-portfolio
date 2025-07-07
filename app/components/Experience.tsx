"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AnimatedGradient } from "./ui/animated-gradient"
import { FormattedMessage } from "react-intl"
import { useLanguage } from "../contexts/LanguageContext"

const experiences = [
  {
    id: 0,
    tools: [".NET", "C#", "Azure", "React", "MVP", "Full Stack Development"],
  },
  {
    id: 1,
    tools: ["Microsoft Solutions", "SAP", "Citrix", "Sigam", "Hardware Maintenance", "Remote Support"],
  },
]

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { language } = useLanguage()

  return (
    <section id="experience" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <AnimatedGradient className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">
              <FormattedMessage id="experience.title" />
            </h2>
          </AnimatedGradient>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              className="mb-8 bg-[#111111] rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: exp.id * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3
                className="text-xl font-semibold text-blue-400 mb-2"
                whileHover={{ color: "#60A5FA" }}
                transition={{ duration: 0.3 }}
              >
                <FormattedMessage id={`experience.${exp.id}.title`} />
              </motion.h3>
              <motion.p className="text-gray-300 mb-1" whileHover={{ color: "#9CA3AF" }} transition={{ duration: 0.3 }}>
                <FormattedMessage id={`experience.${exp.id}.company`} />
              </motion.p>
              <motion.p
                className="text-sm text-gray-400 mb-4"
                whileHover={{ color: "#D1D5DB" }}
                transition={{ duration: 0.3 }}
              >
                <FormattedMessage id={`experience.${exp.id}.location`} /> |{" "}
                <FormattedMessage id={`experience.${exp.id}.period`} />
              </motion.p>
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-200 mb-2">
                  <FormattedMessage id="experience.description" />:
                </h4>
                <ul className="list-disc pl-5 text-gray-300 mb-4">
                  {/* First experience has 4 descriptions (0-3), second has 5 (0-4) */}
                  {Array.from({ length: exp.id === 0 ? 4 : 5 }).map((_, i) => {
                    const messageId = `experience.${exp.id}.description.${i}`
                    return (
                      <FormattedMessage id={messageId} key={i}>
                        {(msg) => {
                          // Only render if the message exists (not equal to the messageId itself)
                          if (msg !== messageId && msg) {
                            return (
                              <li key={i} className="mb-2 hover:text-blue-400 transition-colors duration-300">
                                {msg}
                              </li>
                            )
                          }
                          return null
                        }}
                      </FormattedMessage>
                    )
                  })}
                </ul>
              </div>
              <motion.div
                className="text-sm text-gray-400"
                whileHover={{ color: "#9CA3AF" }}
                transition={{ duration: 0.3 }}
              >
                <FormattedMessage id="experience.viewTools" />:
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.tools.map((tool, index) => (
                    <span key={index} className="bg-gray-800 text-gray-200 px-2 py-1 rounded-md text-xs">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

