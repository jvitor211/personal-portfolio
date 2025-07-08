"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin, Mail, Phone, Linkedin, Download, Award, Briefcase, Users, Heart } from "lucide-react"
import { AnimatedGradient } from "./ui/animated-gradient"
import { FormattedMessage, useIntl } from "react-intl"
import { useState } from "react"
import jsPDF from 'jspdf'
import { useLanguage } from "../contexts/LanguageContext"

const Resume = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isDownloading, setIsDownloading] = useState(false)
  const { language } = useLanguage()
  const intl = useIntl()

  // Dynamic data based on current language
  const getExperienceData = () => [
    {
      title: intl.formatMessage({ id: "resume.exp.0.title" }),
      company: intl.formatMessage({ id: "resume.exp.0.company" }),
      period: intl.formatMessage({ id: "resume.exp.0.period" }),
      location: intl.formatMessage({ id: "resume.exp.0.location" }),
      type: "current",
      description: [
        intl.formatMessage({ id: "resume.exp.0.desc.0" }),
        intl.formatMessage({ id: "resume.exp.0.desc.1" }),
        intl.formatMessage({ id: "resume.exp.0.desc.2" })
      ]
    },
    {
      title: intl.formatMessage({ id: "resume.exp.1.title" }),
      company: intl.formatMessage({ id: "resume.exp.1.company" }),
      period: intl.formatMessage({ id: "resume.exp.1.period" }),
      location: intl.formatMessage({ id: "resume.exp.1.location" }),
      type: "past",
      description: [
        intl.formatMessage({ id: "resume.exp.1.desc.0" }),
        intl.formatMessage({ id: "resume.exp.1.desc.1" }),
        intl.formatMessage({ id: "resume.exp.1.desc.2" })
      ]
    },
    {
      title: intl.formatMessage({ id: "resume.exp.2.title" }),
      company: intl.formatMessage({ id: "resume.exp.2.company" }),
      period: intl.formatMessage({ id: "resume.exp.2.period" }),
      location: intl.formatMessage({ id: "resume.exp.2.location" }),
      type: "volunteer",
      description: [
        intl.formatMessage({ id: "resume.exp.2.desc.0" }),
        intl.formatMessage({ id: "resume.exp.2.desc.1" }),
        intl.formatMessage({ id: "resume.exp.2.desc.2" })
      ]
    },
    {
      title: intl.formatMessage({ id: "resume.exp.3.title" }),
      company: intl.formatMessage({ id: "resume.exp.3.company" }),
      period: intl.formatMessage({ id: "resume.exp.3.period" }),
      location: intl.formatMessage({ id: "resume.exp.3.location" }),
      type: "freelance",
      description: [
        intl.formatMessage({ id: "resume.exp.3.desc.0" }),
        intl.formatMessage({ id: "resume.exp.3.desc.1" }),
        intl.formatMessage({ id: "resume.exp.3.desc.2" })
      ]
    }
  ]

  const getCertifications = () => [
    intl.formatMessage({ id: "resume.cert.0" }),
    intl.formatMessage({ id: "resume.cert.1" }),
    intl.formatMessage({ id: "resume.cert.2" }),
    intl.formatMessage({ id: "resume.cert.3" })
  ]

  const getVolunteerWork = () => [
    intl.formatMessage({ id: "resume.volunteer.0" }),
    intl.formatMessage({ id: "resume.volunteer.1" }),
    intl.formatMessage({ id: "resume.volunteer.2" })
  ]

  const experiences = getExperienceData()
  const certifications = getCertifications()
  const volunteerWork = getVolunteerWork()

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
      
      // Create new PDF document
      const pdf = new jsPDF()
      
      // Configuration
      let currentY = 20
      const marginLeft = 20
      const marginRight = 20
      const pageWidth = pdf.internal.pageSize.width
      const usableWidth = pageWidth - marginLeft - marginRight
      
      // Texts based on current language
      const texts = {
        pt: {
          name: 'João Rondon',
          contact: 'Cuiabá, MT – Brasil | jvbarbosa211@gmail.com | +55 65 99268-1781',
          linkedin: 'LinkedIn: linkedin.com/in/joao-rondon-3453001b1',
          objective: 'Objetivo',
          objectiveText: 'Profissional autodidata apaixonado por cibersegurança e desenvolvimento, com experiência prática em suporte técnico, desenvolvimento full stack e ações de impacto social. Buscando oportunidades que aliem tecnologia, propósito e aprendizado contínuo.',
          experience: 'Experiência Profissional',
          education: 'Educação',
          certifications: 'Certificações e Cursos',
          volunteer: 'Voluntariado e Projetos',
          skills: 'Habilidades',
          languages: '- Idiomas: Português (nativo), Inglês (intermediário)'
        },
        en: {
          name: 'João Rondon',
          contact: 'Cuiabá, MT – Brazil | jvbarbosa211@gmail.com | +55 65 99268-1781',
          linkedin: 'LinkedIn: linkedin.com/in/joao-rondon-3453001b1',
          objective: 'Objective',
          objectiveText: 'Self-taught professional passionate about cybersecurity and development, with practical experience in technical support, full stack development, and social impact initiatives. Seeking opportunities that combine technology, purpose, and continuous learning.',
          experience: 'Professional Experience',
          education: 'Education',
          certifications: 'Certifications and Courses',
          volunteer: 'Volunteer Work and Projects',
          skills: 'Skills',
          languages: '- Languages: Portuguese (native), English (intermediate)'
        }
      }
      
      const currentTexts = texts[language as keyof typeof texts]
      
      // Name (main title)
      pdf.setFontSize(18)
      pdf.setFont('helvetica', 'bold')
      pdf.text(currentTexts.name, marginLeft, currentY)
      currentY += 10
      
      // Contact information
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text(currentTexts.contact, marginLeft, currentY)
      currentY += 5
      pdf.text(currentTexts.linkedin, marginLeft, currentY)
      currentY += 15
      
      // Objective
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text(currentTexts.objective, marginLeft, currentY)
      currentY += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      const objectiveLines = pdf.splitTextToSize(currentTexts.objectiveText, usableWidth)
      pdf.text(objectiveLines, marginLeft, currentY)
      currentY += objectiveLines.length * 5 + 10
      
      // Professional Experience
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text(currentTexts.experience, marginLeft, currentY)
      currentY += 10
      
      // Add each experience
      experiences.forEach((exp, index) => {
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'bold')
        pdf.text(`${exp.title} – ${exp.company}`, marginLeft, currentY)
        currentY += 6
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        pdf.text(`${exp.location} – ${exp.period}`, marginLeft, currentY)
        currentY += 6
        
        exp.description.forEach(desc => {
          const descLines = pdf.splitTextToSize(`- ${desc}`, usableWidth)
          pdf.text(descLines, marginLeft, currentY)
          currentY += descLines.length * 5
        })
        currentY += 5
      })
      
      // Check if new page is needed
      if (currentY > 230) {
        pdf.addPage()
        currentY = 20
      }
      
      // Education
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text(currentTexts.education, marginLeft, currentY)
      currentY += 10
      
      if (language === 'pt') {
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
      } else {
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'bold')
        pdf.text('FIAP – Cyber Defense (2025–2026, in progress)', marginLeft, currentY)
        currentY += 6
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        pdf.text('- Pentest, Digital Forensics, Phishing, Malware', marginLeft, currentY)
        currentY += 8
        
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'bold')
        pdf.text('High School – EE Raimundo Pinheiro (2019)', marginLeft, currentY)
        currentY += 6
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        pdf.text('- Class leader and internal technical support', marginLeft, currentY)
        currentY += 5
        pdf.text('- Participation in school logic and technology projects', marginLeft, currentY)
      }
      currentY += 15
      
      // Certifications
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text(currentTexts.certifications, marginLeft, currentY)
      currentY += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      certifications.forEach(cert => {
        const certLines = pdf.splitTextToSize(`- ${cert}`, usableWidth)
        pdf.text(certLines, marginLeft, currentY)
        currentY += certLines.length * 5
      })
      currentY += 10
      
      // Volunteer Work
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text(currentTexts.volunteer, marginLeft, currentY)
      currentY += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      volunteerWork.forEach(work => {
        const workLines = pdf.splitTextToSize(`- ${work}`, usableWidth)
        pdf.text(workLines, marginLeft, currentY)
        currentY += workLines.length * 5
      })
      currentY += 10
      
      // Skills
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      pdf.text(currentTexts.skills, marginLeft, currentY)
      currentY += 8
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      if (language === 'pt') {
        pdf.text('- Linguagens: C#, JavaScript, Python, SQL', marginLeft, currentY)
        currentY += 5
        pdf.text('- Frameworks: .NET, React', marginLeft, currentY)
        currentY += 5
        pdf.text('- Ferramentas: Azure, Docker, Git, Postman, VSCode', marginLeft, currentY)
        currentY += 5
        pdf.text('- Idiomas: Português (nativo), Inglês (intermediário)', marginLeft, currentY)
      } else {
        pdf.text('- Languages: C#, JavaScript, Python, SQL', marginLeft, currentY)
        currentY += 5
        pdf.text('- Frameworks: .NET, React', marginLeft, currentY)
        currentY += 5
        pdf.text('- Tools: Azure, Docker, Git, Postman, VSCode', marginLeft, currentY)
        currentY += 5
        pdf.text('- Languages: Portuguese (native), English (intermediate)', marginLeft, currentY)
      }
      
      // Save PDF
      const fileName = language === 'pt' ? 'CV-Joao-Rondon.pdf' : 'Resume-Joao-Rondon.pdf'
      pdf.save(fileName)

      // Visual feedback
      setTimeout(() => {
        setIsDownloading(false)
      }, 1500)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      setIsDownloading(false)
      
      // Fallback: open LinkedIn
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
              <FormattedMessage id="resume.title" />
            </h2>
          </AnimatedGradient>
          <p className="text-gray-400 mt-4">
            <FormattedMessage id="resume.subtitle" />
          </p>
        </motion.div>

        {/* CV Header */}
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
                <FormattedMessage id="resume.jobTitle" />
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
                  <FormattedMessage id="resume.downloading" />
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <FormattedMessage id="resume.downloadPdf" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Objective */}
        <motion.div
          className="bg-[#1A1A1A] rounded-xl p-6 mb-8 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            <FormattedMessage id="resume.objective.title" />
          </h4>
          <p className="text-gray-300 leading-relaxed">
            <FormattedMessage id="resume.objective.description" />
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Experiences */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <FormattedMessage id="resume.experience.title" />
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

          {/* Certifications, Volunteer Work and Languages */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Certifications */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-800">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <FormattedMessage id="resume.certifications.title" />
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

            {/* Volunteer Work */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-800">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <FormattedMessage id="resume.volunteer.title" />
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

            {/* Languages */}
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-800">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <FormattedMessage id="resume.languages.title" />
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">
                    <FormattedMessage id="resume.languages.portuguese" />
                  </span>
                  <span className="text-purple-400 font-medium">
                    <FormattedMessage id="resume.languages.native" />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">
                    <FormattedMessage id="resume.languages.english" />
                  </span>
                  <span className="text-purple-400 font-medium">
                    <FormattedMessage id="resume.languages.intermediate" />
                  </span>
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