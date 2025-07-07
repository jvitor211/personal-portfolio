"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Share2 } from "lucide-react"
import { AnimatedGradient } from "./ui/animated-gradient"
import { FormattedMessage } from "react-intl"

const projects = [
  {
    title: "HTTPSForce",
    description:
      "Uma extensão para o Google Chrome que redireciona automaticamente as páginas da web de HTTP para HTTPS, garantindo uma conexão mais segura sempre que possível. Esta ferramenta é essencial para aumentar a segurança durante a navegação web.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "https://github.com/jvitor211/HTTPSForce",
    technologies: ["JavaScript", "Chrome Extension API", "Web Security"],
  },
  {
    title: "USB Tools",
    description:
      "Uma ferramenta de segurança para dispositivos USB, focada em bloquear e controlar câmeras USB. Este projeto demonstra minhas habilidades em desenvolvimento de ferramentas de segurança, permitindo monitorar, listar, desativar e reativar dispositivos USB, especialmente câmeras, microfones e dispositivos de áudio.",
    image:
      "https://images.unsplash.com/photo-1611175694989-4870fafa4494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "https://github.com/jvitor211/USB_Tools",
    technologies: ["Python", "USB Security", "Windows PowerShell", "Device Management"],
  },
  {
    title: "RFID Blocker",
    description:
      "Uma solução completa para gerenciamento e bloqueio de dispositivos RFID. Este projeto combina um backend robusto, uma interface web intuitiva e integração com hardware para oferecer segurança em aplicações que utilizam tecnologia RFID.",
    image:
      "https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "https://github.com/jvitor211/rfid-blocker",
    technologies: ["JavaScript", "Python", "C++", "RFID", "IoT", "Web Development"],
  },
  {
    title: "React and Next.js Learning Projects",
    description:
      "Uma série de projetos em desenvolvimento utilizando React e Next.js. Este trabalho reflete meu compromisso em expandir minhas habilidades de desenvolvimento front-end e criar aplicações web modernas e eficientes.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "https://github.com/jvitor211",
    technologies: ["React", "Next.js", "JavaScript", "TypeScript"],
  },
]

// Função para mapear tecnologias aos seus ícones
const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: string } = {
    // Linguagens de Programação
    "JavaScript": "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    "TypeScript": "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    "Python": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    "C++": "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
    "C#": "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
    "Java": "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
    
    // Frameworks e Bibliotecas
    "React": "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    "Next.js": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
    ".NET": "https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg",
    "Node.js": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    
    // Tecnologias Web e APIs
    "Chrome Extension API": "https://www.google.com/chrome/static/images/chrome-logo.svg",
    "Web Security": "https://cdn-icons-png.flaticon.com/512/3110/3110230.png",
    "Web Development": "https://cdn-icons-png.flaticon.com/512/1006/1006363.png",
    "HTML": "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    "CSS": "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
    
    // Segurança e Hardware
    "USB Security": "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
    "Windows PowerShell": "https://raw.githubusercontent.com/devicons/devicon/master/icons/powershell/powershell-original.svg",
    "Device Management": "https://cdn-icons-png.flaticon.com/512/2329/2329008.png",
    "RFID": "https://cdn-icons-png.flaticon.com/512/6815/6815723.png",
    "IoT": "https://cdn-icons-png.flaticon.com/512/4305/4305200.png",
    
    // Bancos de Dados
    "MySQL": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    "PostgreSQL": "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    "MongoDB": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    
    // Cloud e DevOps
    "AWS": "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg",
    "Azure": "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
    "Docker": "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    "Git": "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
  }
  
  return iconMap[tech] || "https://cdn-icons-png.flaticon.com/512/2721/2721297.png" // ícone padrão
}

// Função para obter a cor da badge baseada na tecnologia
const getTechColor = (tech: string) => {
  const colorMap: { [key: string]: string } = {
    // Linguagens de Programação
    "JavaScript": "from-yellow-500 to-yellow-600",
    "TypeScript": "from-blue-500 to-blue-600",
    "Python": "from-green-500 to-green-600",
    "C++": "from-purple-500 to-purple-600",
    "C#": "from-purple-600 to-purple-700",
    "Java": "from-red-600 to-red-700",
    
    // Frameworks e Bibliotecas
    "React": "from-cyan-500 to-cyan-600",
    "Next.js": "from-gray-700 to-gray-800",
    ".NET": "from-blue-600 to-purple-600",
    "Node.js": "from-green-600 to-green-700",
    
    // Tecnologias Web e APIs
    "Chrome Extension API": "from-red-500 to-red-600",
    "Web Security": "from-orange-500 to-orange-600",
    "Web Development": "from-violet-500 to-violet-600",
    "HTML": "from-orange-600 to-red-600",
    "CSS": "from-blue-400 to-blue-500",
    
    // Segurança e Hardware
    "USB Security": "from-indigo-500 to-indigo-600",
    "Windows PowerShell": "from-blue-600 to-blue-700",
    "Device Management": "from-teal-500 to-teal-600",
    "RFID": "from-pink-500 to-pink-600",
    "IoT": "from-emerald-500 to-emerald-600",
    
    // Bancos de Dados
    "MySQL": "from-blue-500 to-blue-600",
    "PostgreSQL": "from-blue-600 to-blue-700",
    "MongoDB": "from-green-600 to-green-700",
    
    // Cloud e DevOps
    "AWS": "from-orange-400 to-yellow-500",
    "Azure": "from-blue-500 to-blue-600",
    "Docker": "from-blue-400 to-blue-500",
    "Git": "from-orange-500 to-red-500",
  }
  
  return colorMap[tech] || "from-gray-500 to-gray-600"
}

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-20 bg-[#0A0A0A]">
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
              <FormattedMessage id="projects.title" />
            </h2>
          </AnimatedGradient>
          <p className="text-gray-400">
            <FormattedMessage id="projects.subtitle" />
          </p>
        </motion.div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="flex flex-col lg:flex-row gap-8 items-center bg-[#1A1A1A] rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className={`lg:w-1/2 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl object-cover"
                />
              </motion.div>
              <div className={`lg:w-1/2 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <motion.h3
                  className="text-2xl font-bold text-white mb-4"
                  whileHover={{ color: "#60A5FA" }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-gray-400 mb-6"
                  whileHover={{ color: "#9CA3AF" }}
                  transition={{ duration: 0.3 }}
                >
                  {project.description}
                </motion.p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <motion.div
                      key={tech}
                      className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${getTechColor(tech)} text-white rounded-full text-sm font-medium shadow-lg border border-white/10`}
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                        y: -2
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src={getTechIcon(tech)}
                        alt={tech}
                        className="w-4 h-4 object-contain"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        onError={(e) => {
                          // Fallback se a imagem não carregar
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <span>{tech}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  <FormattedMessage id="projects.viewProject" defaultMessage="View Project" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

