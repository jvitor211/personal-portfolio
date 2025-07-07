"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { AnimatedGradient } from "./ui/animated-gradient"
import { FormattedMessage } from "react-intl"

const skillGroups = [
  {
    category: "Desenvolvimento",
    skills: [
      {
        name: "TypeScript",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      },
      {
        name: "Python",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
      },
      {
        name: "C#",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
      },
      {
        name: "ASP.NET",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg",
      },
      {
        name: "Node",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "React",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
      },
    ],
  },
  {
    category: "Plataformas e Ferramentas",
    skills: [
      {
        name: "GCP",
        icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
      },
      {
        name: "AWS",
        icon: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
      },
      {
        name: "Azure",
        icon: "https://swimburger.net/media/ppnn3pcl/azure.png",
      },
      {
        name: "n8n",
        icon: "https://avatars.githubusercontent.com/u/45487711?s=200&v=4",
      },
      {
        name: "Linux/Bash",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
      },
      {
        name: "Git",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
      },
    ],
  },
  {
    category: "Banco de Dados",
    skills: [
      {
        name: "SQL Server",
        icon: "https://static-00.iconduck.com/assets.00/sql-server-icon-1919x2048-2nmnirhs.png",
      },
      {
        name: "MySQL",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
      },
      {
        name: "PostgreSQL",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "Firebase",
        icon: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
      },
    ],
  },
  {
    category: "Segurança Cibernética",
    skills: [
      {
        name: "Ethical Hacking",
        icon: "https://img.icons8.com/color/96/hacker.png",
      },
      {
        name: "Malware Research",
        icon: "https://cdn-icons-png.flaticon.com/512/9307/9307467.png",
      },
      {
        name: "Cybersecurity",
        icon: "https://img.icons8.com/color/96/cyber-security.png",
      },
      {
        name: "Pentest",
        icon: "https://img.icons8.com/color/96/security-checked.png",
      },
      {
        name: "Phishing",
        icon: "https://cdn-icons-png.flaticon.com/512/4968/4968704.png",
      },
      {
        name: "Network Security",
        icon: "https://cdn-icons-png.flaticon.com/512/3110/3110230.png",
      },
    ],
  },
  {
    category: "Outras Competências",
    skills: [
      {
        name: "Computer Forensics",
        icon: "https://img.icons8.com/color/96/detective.png",
      },
      {
        name: "Arduino",
        icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg",
      },
      {
        name: "Ghidra",
        icon: "https://img.icons8.com/color/96/software.png",
      },
      {
        name: "Wireshark",
        icon: "https://img.icons8.com/color/96/wireshark.png",
      },
      {
        name: "Kali Linux",
        icon: "https://1000logos.net/wp-content/uploads/2020/08/Kali-Linux-Logo.png",
      },
    ],
  },
]

// Função para obter cores específicas por tecnologia
const getSkillColor = (skillName: string) => {
  const colorMap: { [key: string]: string } = {
    // Desenvolvimento
    "TypeScript": "from-blue-500 to-blue-600",
    "JavaScript": "from-yellow-500 to-yellow-600",
    "Python": "from-green-500 to-green-600",
    "C#": "from-purple-500 to-purple-600",
    "ASP.NET": "from-blue-600 to-purple-600",
    "Node": "from-green-600 to-green-700",
    "React": "from-cyan-500 to-cyan-600",
    
    // Plataformas e Ferramentas
    "GCP": "from-blue-400 to-blue-500",
    "AWS": "from-orange-400 to-yellow-500",
    "Azure": "from-blue-500 to-blue-600",
    "n8n": "from-pink-500 to-red-500",
    "Linux/Bash": "from-gray-700 to-gray-800",
    "Git": "from-orange-500 to-red-500",
    
    // Banco de Dados
    "SQL Server": "from-red-600 to-red-700",
    "MySQL": "from-blue-500 to-blue-600",
    "PostgreSQL": "from-blue-600 to-blue-700",
    "Firebase": "from-yellow-500 to-orange-500",
    
    // Segurança Cibernética
    "Ethical Hacking": "from-green-500 to-emerald-600",
    "Malware Research": "from-red-500 to-red-600",
    "Cybersecurity": "from-indigo-500 to-purple-600",
    "Pentest": "from-orange-500 to-orange-600",
    "Phishing": "from-red-400 to-pink-500",
    "Network Security": "from-blue-500 to-cyan-500",
    
    // Outras Competências
    "Computer Forensics": "from-teal-500 to-teal-600",
    "Arduino": "from-teal-600 to-cyan-600",
    "Ghidra": "from-gray-600 to-gray-700",
    "Wireshark": "from-blue-600 to-indigo-600",
    "Kali Linux": "from-gray-800 to-black",
  }
  
  return colorMap[skillName] || "from-gray-500 to-gray-600"
}

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-[#0A0A0A]">
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
              <FormattedMessage id="skills.title" />
            </h2>
          </AnimatedGradient>
          <p className="text-gray-400">
            <FormattedMessage id="skills.subtitle" />
          </p>
        </motion.div>

        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={group.category}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-blue-400">{group.category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {group.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={`relative flex flex-col items-center justify-center p-4 bg-gradient-to-br ${getSkillColor(skill.name)} rounded-xl shadow-lg border border-white/10 group overflow-hidden`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background overlay for better contrast */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                  
                  <motion.div
                    className="relative w-12 h-12 mb-3"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain filter drop-shadow-lg group-hover:drop-shadow-xl transition-all"
                      onError={(e) => {
                        // Fallback to a colored circle with initials if image fails
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                      unoptimized={true}
                    />
                    <div 
                      className="w-full h-full bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white font-bold text-xs hidden border border-white/30"
                      style={{ display: 'none' }}
                    >
                      {skill.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                    </div>
                  </motion.div>
                  
                  <span className="relative text-sm text-white text-center font-semibold drop-shadow-md group-hover:text-gray-100 transition-colors">
                    {skill.name}
                  </span>
                  
                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills

