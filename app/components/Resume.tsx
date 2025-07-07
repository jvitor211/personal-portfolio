"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin, Mail, Phone, Linkedin, Download, Award, Briefcase, Users, Heart } from "lucide-react"
import { AnimatedGradient } from "./ui/animated-gradient"
import { FormattedMessage } from "react-intl"
import { useState } from "react"

const Resume = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isDownloading, setIsDownloading] = useState(false)

  const experiences = [
    {
      title: "Desenvolvedor Full Stack",
      company: "Amaggi",
      period: "2023 – Presente",
      location: "Cuiabá, MT",
      type: "current",
      description: [
        "Desenvolvimento de MVPs e novas funcionalidades em .NET e React",
        "Foco em performance, usabilidade e design moderno",
        "Integração com serviços Azure, APIs REST e bancos de dados"
      ]
    },
    {
      title: "Técnico de Suporte N2",
      company: "Lanlink",
      period: "Abr 2023 – Out 2023",
      location: "Remoto/Presencial",
      type: "past",
      description: [
        "Suporte técnico a 80 filiais (Brasil e exterior)",
        "Instalação e manutenção de balanças industriais e sistemas",
        "Suporte remoto e presencial com foco em eficiência operacional"
      ]
    },
    {
      title: "Investigador Digital Voluntário",
      company: "Projeto Pessoal",
      period: "2022 – Presente",
      location: "Online",
      type: "volunteer",
      description: [
        "Apoio gratuito a vítimas de golpes online: rastreio e denúncia",
        "Uso de ferramentas OSINT e técnicas forenses",
        "Prevenção e recuperação de casos de fraude digital"
      ]
    },
    {
      title: "Técnico de TI e Recuperação de Dados",
      company: "Freelancer",
      period: "2020 – 2022",
      location: "Cuiabá, MT",
      type: "freelance",
      description: [
        "Manutenção de hardware, redes e recuperação de dados",
        "Implantação de sistemas e suporte a usuários",
        "Automações com Python para otimização de processos"
      ]
    }
  ]

  const certifications = [
    "TryHackMe – Fundamentos de Pentest e Cibersegurança",
    "Udemy – Python para Automação e Web Scraping",
    "Alura – Git, Docker, Clean Architecture",
    "Hack The Box Labs – Análise e exploração de vulnerabilidades"
  ]

  const volunteerWork = [
    "Distribuição de 130+ kits anti-COVID em mercado popular com reconhecimento da mídia local",
    "Liderança técnica de comunidade internacional com mais de 11 mil membros",
    "Suporte técnico em eventos educacionais e de mentoria"
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'current': return 'from-green-500 to-emerald-500'
      case 'volunteer': return 'from-purple-500 to-violet-500'
      case 'freelance': return 'from-orange-500 to-amber-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'current': return '🚀'
      case 'volunteer': return '❤️'
      case 'freelance': return '💼'
      default: return '🔧'
    }
  }

  const handleDownloadCV = () => {
    try {
      setIsDownloading(true)
      
      // Gera conteúdo do CV em texto
      const cvContent = `
JOÃO RONDON
Pesquisador em Cibersegurança & Desenvolvedor Full Stack

CONTATO
📧 Email: jvbarbosa211@gmail.com
📱 Telefone: +55 65 99268-1781
📍 Localização: Cuiabá, MT – Brasil
🔗 LinkedIn: linkedin.com/in/joao-rondon-3453001b1

OBJETIVO
Profissional autodidata apaixonado por cibersegurança e desenvolvimento, com experiência prática em suporte técnico, desenvolvimento full stack e iniciativas de impacto social. Busca oportunidades que unam tecnologia, propósito e aprendizado contínuo.

EXPERIÊNCIA PROFISSIONAL

🚀 Desenvolvedor Full Stack - Amaggi (2023 – Presente)
• Desenvolvimento de MVPs e novas funcionalidades em .NET e React
• Foco em performance, usabilidade e design moderno
• Integração com serviços Azure, APIs REST e bancos de dados

🔧 Técnico de Suporte N2 - Lanlink (Abr 2023 – Out 2023)
• Suporte técnico a 80 filiais (Brasil e exterior)
• Instalação e manutenção de balanças industriais e sistemas
• Suporte remoto e presencial com foco em eficiência operacional

❤️ Investigador Digital Voluntário - Projeto Pessoal (2022 – Presente)
• Apoio gratuito a vítimas de golpes online: rastreio e denúncia
• Uso de ferramentas OSINT e técnicas forenses
• Prevenção e recuperação de casos de fraude digital

💼 Técnico de TI e Recuperação de Dados - Freelancer (2020 – 2022)
• Manutenção de hardware, redes e recuperação de dados
• Implantação de sistemas e suporte a usuários
• Automações com Python para otimização de processos

CERTIFICAÇÕES
🏆 TryHackMe – Fundamentos de Pentest e Cibersegurança
🏆 Udemy – Python para Automação e Web Scraping
🏆 Alura – Git, Docker, Clean Architecture
🏆 Hack The Box Labs – Análise e exploração de vulnerabilidades

VOLUNTARIADO E PROJETOS
❤️ Distribuição de 130+ kits anti-COVID em mercado popular com reconhecimento da mídia local
❤️ Liderança técnica de comunidade internacional com mais de 11 mil membros
❤️ Suporte técnico em eventos educacionais e de mentoria

IDIOMAS
🇧🇷 Português: Nativo
🇺🇸 Inglês: Intermediário

HABILIDADES TÉCNICAS
• Linguagens: C#, JavaScript, Python, SQL, TypeScript
• Frameworks: .NET, React, Next.js
• Ferramentas: Azure, Docker, Git, Postman, VSCode
• Segurança: Pentest, OSINT, Análise de Malware, Ethical Hacking
• Automação: n8n, Python Scripts, PowerShell
      `.trim()

      // Cria e baixa arquivo de texto
      const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'CV-Joao-Rondon.txt'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)

      // Feedback visual
      setTimeout(() => {
        setIsDownloading(false)
      }, 1500)
      
    } catch (error) {
      console.error('Erro ao baixar CV:', error)
      setIsDownloading(false)
      // Fallback: abrir LinkedIn
      window.open('https://linkedin.com/in/joao-rondon-3453001b1', '_blank')
    }
  }

  return (
    <section id="resume" className="py-20 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <AnimatedGradient className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">
              Currículo Profissional
            </h2>
          </AnimatedGradient>
          <p className="text-gray-400 mt-4">
            Minha jornada profissional em cibersegurança e desenvolvimento
          </p>
        </motion.div>

        {/* Header do CV */}
        <motion.div
          className="bg-gradient-to-r from-[#1A1A1A] to-[#252525] rounded-2xl p-8 mb-8 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JR
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-white mb-2">João Rondon</h3>
              <p className="text-lg text-blue-400 mb-4">
                Pesquisador em Cibersegurança & Desenvolvedor Full Stack
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Cuiabá, MT – Brasil</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>jvbarbosa211@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+55 65 99268-1781</span>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <span>linkedin.com/in/joao-rondon-3453001b1</span>
                </div>
              </div>
            </div>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isDownloading ? 1 : 1.05 }}
              whileTap={{ scale: isDownloading ? 1 : 0.95 }}
              onClick={handleDownloadCV}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Baixando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download CV
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Objetivo */}
        <motion.div
          className="bg-[#1A1A1A] rounded-xl p-6 mb-8 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Objetivo Profissional
          </h4>
          <p className="text-gray-300 leading-relaxed">
            Profissional autodidata apaixonado por cibersegurança e desenvolvimento, com experiência prática em suporte técnico, 
            desenvolvimento full stack e iniciativas de impacto social. Busca oportunidades que unam tecnologia, propósito e aprendizado contínuo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Experiências */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-400" />
              Experiência Profissional
            </h4>
            
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} mt-2`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold text-white">{exp.title}</h5>
                      <span className="text-lg">{getTypeIcon(exp.type)}</span>
                    </div>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-1 text-gray-300 text-sm">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Certificações, Voluntariado e Idiomas */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Certificações */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-800">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Cursos e Certificações
              </h4>
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-yellow-400 mt-1">🏆</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Voluntariado */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-800">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Voluntariado e Projetos
              </h4>
              <ul className="space-y-2">
                {volunteerWork.map((work, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-red-400 mt-1">❤️</span>
                    {work}
                  </li>
                ))}
              </ul>
            </div>

            {/* Idiomas */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-800">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                Idiomas
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Português</span>
                  <span className="text-purple-400 font-medium">Nativo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Inglês</span>
                  <span className="text-purple-400 font-medium">Intermediário</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Resume 