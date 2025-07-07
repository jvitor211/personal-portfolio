"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Linkedin, Phone } from "lucide-react"
import { AnimatedGradient } from "./ui/animated-gradient"

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const contactInfo = [
    { icon: Mail, text: "jvbarbosa211@gmail.com", href: "mailto:jvbarbosa211@gmail.com" },
    { icon: Linkedin, text: "LinkedIn", href: "https://www.linkedin.com/in/jo%C3%A3o-rondon-3453001b1/?locale=en_US" },
    { icon: Phone, text: "+55 65992681781", href: "tel:+5565992681781" },
  ]

  return (
    <section id="contact" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <AnimatedGradient className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">Entre em Contato</h2>
          </AnimatedGradient>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="flex items-center justify-center mb-6 p-4 bg-[#1E1E1E] rounded-lg hover:bg-[#252525] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="w-6 h-6 mr-4 text-blue-400" />
              <span className="text-white text-lg">{item.text}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact

