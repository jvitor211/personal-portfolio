"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin, Mail, Phone, Linkedin, Download, Award, Briefcase, Users, Heart } from "lucide-react"
import { AnimatedGradient } from "./ui/animated-gradient"
import { FormattedMessage } from "react-intl"
import { useState } from "react"
import jsPDF from 'jspdf'

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

  const skills = [
    "Linguagens: C#, JavaScript, Python, SQL, TypeScript",
    "Frameworks: .NET, React, Next.js",
    "Ferramentas: Azure, Docker, Git, Postman, VSCode",
    "Segurança: Pentest, OSINT, Análise de Malware, Ethical Hacking",
    "Automação: n8n, Python Scripts, PowerShell"
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
      
      // Cria novo documento PDF
      const pdf = new jsPDF()
      
      // Configurações
      let currentY = 20
      const marginLeft = 20
      const marginRight = 20
      const pageWidth = pdf.internal.pageSize.width
      const usableWidth = pageWidth - marginLeft - marginRight
      
      // Nome (título principal)
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text('João Rondon', marginLeft, currentY)
      currentY += 10
      
      // Informações de contato
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Cuiabá, MT – Brasil | jvbarbosa211@gmail.com | +55 65 99268-1781', marginLeft, currentY)
      currentY += 5
      pdf.text('LinkedIn: linkedin.com/in/joao-rondon-3453001b1', marginLeft, currentY)
      currentY += 15
      
      // Objetivo
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Objetivo', marginLeft, currentY)
      currentY += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      const objetivoText = 'Profissional autodidata apaixonado por cibersegurança e desenvolvimento, com experiência prática em suporte técnico, desenvolvimento full stack e ações de impacto social. Buscando oportunidades que aliem tecnologia, propósito e aprendizado contínuo.'
      const objetivoLines = pdf.splitTextToSize(objetivoText, usableWidth)
      pdf.text(objetivoLines, marginLeft, currentY)
      currentY += objetivoLines.length * 5 + 10
      
      // Experiência Profissional
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Experiência Profissional', marginLeft, currentY)
      currentY += 10
      
      // Full Stack Developer – Amaggi
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Full Stack Developer – Amaggi', marginLeft, currentY)
      currentY += 6
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Cuiabá – 2023–Presente', marginLeft, currentY)
      currentY += 6
      pdf.text('- Desenvolvimento .NET e React para novos MVPs e funcionalidades.', marginLeft, currentY)
      currentY += 5
      pdf.text('- Foco em performance, design moderno e usabilidade.', marginLeft, currentY)
      currentY += 5
      pdf.text('- Integração com serviços em Azure, APIs REST e banco de dados.', marginLeft, currentY)
      currentY += 10
      
      // N2 Support Technician – Lanlink
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text('N2 Support Technician – Lanlink', marginLeft, currentY)
      currentY += 6
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Remoto e Presencial – Abril 2023 a Outubro 2023', marginLeft, currentY)
      currentY += 6
      pdf.text('- Suporte técnico para 80 filiais (Brasil e exterior).', marginLeft, currentY)
      currentY += 5
      const lanlink1 = pdf.splitTextToSize('- Instalação e manutenção de balanças industriais, computadores e sistemas SAP, Citrix, Microsoft.', usableWidth)
      pdf.text(lanlink1, marginLeft, currentY)
      currentY += lanlink1.length * 5
      pdf.text('- Suporte remoto e presencial, com foco em eficiência operacional.', marginLeft, currentY)
      currentY += 10
      
      // Detetive Digital Voluntário
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Detetive Digital Voluntário – Projeto Pessoal', marginLeft, currentY)
      currentY += 6
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Online – 2022–Presente', marginLeft, currentY)
      currentY += 6
      pdf.text('- Apoio gratuito a vítimas de golpes online, rastreamento e denúncia.', marginLeft, currentY)
      currentY += 5
      pdf.text('- Utilização de OSINT, técnicas forenses e prevenção digital.', marginLeft, currentY)
      currentY += 10
      
      // Técnico de TI e Recuperação de Dados
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Técnico de TI e Recuperação de Dados – Freelancer', marginLeft, currentY)
      currentY += 6
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Cuiabá – 2020–2022', marginLeft, currentY)
      currentY += 6
      const freelancer1 = pdf.splitTextToSize('- Manutenção de hardware, redes e recuperação de arquivos de HDs danificados.', usableWidth)
      pdf.text(freelancer1, marginLeft, currentY)
      currentY += freelancer1.length * 5
      pdf.text('- Implantação de sistemas, suporte a usuários e automações em Python.', marginLeft, currentY)
      currentY += 15
      
      // Nova página se necessário
      if (currentY > 230) {
        pdf.addPage()
        currentY = 20
      }
      
      // Educação
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Educação', marginLeft, currentY)
      currentY += 10
      
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text('FIAP – Cyber Defense (2025–2026, em andamento)', marginLeft, currentY)
      currentY += 6
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('- Pentest, Forense Digital, Phishing, Malware', marginLeft, currentY)
      currentY += 8
      
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Ensino Médio – EE Raimundo Pinheiro (2019)', marginLeft, currentY)
      currentY += 6
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('- Líder de turma e suporte técnico interno', marginLeft, currentY)
      currentY += 5
      pdf.text('- Participação em projetos escolares de lógica e tecnologia', marginLeft, currentY)
      currentY += 15
      
      // Certificações e Cursos
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Certificações e Cursos', marginLeft, currentY)
      currentY += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('- TryHackMe – Fundamentos de Pentest e Cibersegurança', marginLeft, currentY)
      currentY += 5
      pdf.text('- Udemy – Python Automação e Web Scraping', marginLeft, currentY)
      currentY += 5
      pdf.text('- Alura – Git, Docker, Clean Architecture', marginLeft, currentY)
      currentY += 5
      pdf.text('- Hack The Box Labs – Exploração e análise de vulnerabilidades', marginLeft, currentY)
      currentY += 15
      
      // Voluntariado e Projetos
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Voluntariado e Projetos', marginLeft, currentY)
      currentY += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      const voluntario1 = pdf.splitTextToSize('- Distribuição de 130 kits anti-COVID durante a pandemia com equipe local, reconhecido na imprensa.', usableWidth)
      pdf.text(voluntario1, marginLeft, currentY)
      currentY += voluntario1.length * 5
      pdf.text('- Gestão técnica de comunidade internacional com mais de 11 mil membros.', marginLeft, currentY)
      currentY += 5
      pdf.text('- Apoio técnico a eventos educacionais e mentorias.', marginLeft, currentY)
      currentY += 15
      
      // Habilidades
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Habilidades', marginLeft, currentY)
      currentY += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('- Linguagens: C#, JavaScript, Python, SQL', marginLeft, currentY)
      currentY += 5
      pdf.text('- Frameworks: .NET, React', marginLeft, currentY)
      currentY += 5
      pdf.text('- Ferramentas: Azure, Docker, Git, Postman, VSCode', marginLeft, currentY)
      currentY += 5
      pdf.text('- Idiomas: Português (nativo), Inglês (intermediário)', marginLeft, currentY)
      
      // Salva o PDF
      pdf.save('CV-Joao-Rondon.pdf')

      // Feedback visual
      setTimeout(() => {
        setIsDownloading(false)
      }, 1500)
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
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
                  Download PDF
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