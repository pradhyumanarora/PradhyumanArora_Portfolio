'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Rocket, Award } from 'lucide-react';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  period: string;
  description: string[];
  technologies: string[];
  achievements: string[];
  logo?: string;
}

const experienceData: ExperienceItem[] = [
  {
    id: 'microsoft-swe-intern',
    title: 'Summer SWE Intern',
    company: 'Microsoft',
    location: 'Redmond, WA',
    duration: 'May 2023 - June 2023',
    period: '2 months',
    description: [
      'Integrated AI capabilities in Microsoft Defender using advanced GPT models',
      'Collaborated across multiple teams to enhance security threat detection',
      'Deployed production-ready code for Microsoft employees worldwide',
      'Reduced system failure rate through intelligent AI model implementation'
    ],
    technologies: ['AI/ML', 'GPT Models', 'Microsoft Defender', 'Python', 'Azure', 'Security APIs'],
    achievements: [
      'Reduced AI model failure rate to 10% through optimization',
      'Deployed code reaching 200K+ Microsoft employees',
      'Enhanced threat detection capabilities using 2 GPT models'
    ]
  },
  {
    id: 'microsoft-engage-mentee',
    title: 'Engage Mentee',
    company: 'Microsoft',
    location: 'Remote',
    duration: 'May 2022',
    period: '1 month',
    description: [
      'Engineered ML-based music recommendation system with intelligent categorization',
      'Developed facial expression detection system using computer vision',
      'Built full-stack application with ReactJS frontend and Django backend',
      'Implemented real-time video analysis with machine learning algorithms'
    ],
    technologies: ['ReactJS', 'Django', 'Machine Learning', 'Computer Vision', 'Python', 'TensorFlow'],
    achievements: [
      'Built music recommendation system with 5 category video suggestions',
      'Achieved 85% accuracy in facial expression detection',
      'Successfully integrated ML models with web application'
    ]
  },
  {
    id: 'vit-research-intern',
    title: 'Research Intern',
    company: 'Vellore Institute of Technology, Chennai',
    location: 'Chennai, India',
    duration: 'June 2022 - July 2022',
    period: '2 months',
    description: [
      'Designed innovative Graphical Password Authentication system for accessibility',
      'Implemented multi-level authentication system for enhanced security',
      'Conducted research on accessibility solutions for color blind users',
      'Developed Django-based secure authentication framework'
    ],
    technologies: ['Django', 'Python', 'Authentication Systems', 'Accessibility', 'Security', 'Research'],
    achievements: [
      'Designed Graphical Password Authentication for Color Blind users',
      'Implemented 3 Level Authentication system',
      'Enhanced security protocols for accessible applications'
    ]
  },
  {
    id: 'talakunchi-cybersecurity',
    title: 'Industrial Program on Cyber Security',
    company: 'TalaKunchi Networks Pvt Ltd',
    location: 'India',
    duration: 'Feb 2022 - Apr 2022',
    period: '3 months',
    description: [
      'Conducted comprehensive penetration testing on web applications',
      'Utilized industry-standard security testing tools and frameworks',
      'Performed vulnerability assessments and security audits',
      'Mastered advanced penetration testing methodologies'
    ],
    technologies: ['Nmap', 'Burp Suite', 'OWASP ZAP', 'Metasploit', 'Penetration Testing', 'Security Auditing'],
    achievements: [
      'Performed penetration testing on 10+ websites',
      'Mastered Nmap and Metasploit Framework effectively',
      'Successfully exploited server vulnerabilities for security assessment'
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: 50,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
      duration: 0.6
    }
  }
};

const orbitVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-cosmic-blue/20 to-deep-space"></div>
      
      {/* Orbital Background Animation */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10"
        variants={orbitVariants}
        animate="animate"
      >
        <div className="w-full h-full border border-stellar-purple/30 rounded-full"></div>
        <div className="absolute top-8 left-8 w-80 h-80 border border-nebula-pink/20 rounded-full"></div>
        <div className="absolute top-16 left-16 w-64 h-64 border border-solar-gold/20 rounded-full"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="text-stellar-purple w-8 h-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-star-white font-['Orbitron']">
              Professional Journey
            </h2>
          </div>
          <p className="text-xl text-asteroid-gray max-w-2xl mx-auto">
            From AI integration at Microsoft to cybersecurity research, showcasing expertise 
            in software engineering, machine learning, and security technologies
          </p>
        </motion.div>

        {/* Timeline Container */}
        <motion.div 
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-stellar-purple via-nebula-pink to-solar-gold transform md:-translate-x-1/2"></div>

          {/* Experience Items */}
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Node */}
              <div className={`absolute left-8 md:left-1/2 w-4 h-4 bg-stellar-purple rounded-full transform -translate-x-1/2 z-10 ${
                index % 2 === 0 ? 'md:-translate-x-1/2' : 'md:-translate-x-1/2'
              }`}>
                <div className="absolute inset-0 bg-stellar-purple rounded-full animate-ping opacity-75"></div>
              </div>

              {/* Mission Card */}
              <motion.div
                className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="holographic-border p-6 bg-cosmic-blue/60 backdrop-blur-space border border-moon-silver/20 rounded-xl">
                  {/* Mission Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="text-solar-gold w-4 h-4" />
                        <span className="text-solar-gold text-sm font-medium">{item.duration}</span>
                        <span className="text-asteroid-gray text-sm">({item.period})</span>
                      </div>
                      <h3 className="text-xl font-bold text-star-white font-['Orbitron'] mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-stellar-purple">
                        <span className="font-semibold">{item.company}</span>
                      </div>
                      <div className="flex items-center gap-1 text-asteroid-gray text-sm mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    
                    {/* Mission Badge */}
                    <div className="w-16 h-16 bg-gradient-to-br from-stellar-purple to-nebula-pink rounded-full flex items-center justify-center ml-4">
                      <Rocket className="text-star-white w-8 h-8" />
                    </div>
                  </div>

                  {/* Mission Objectives */}
                  <div className="mb-4">
                    <h4 className="text-star-white font-semibold mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-comet-green" />
                      Mission Objectives
                    </h4>
                    <ul className="space-y-1">
                      {item.description.map((desc, idx) => (
                        <li key={idx} className="text-asteroid-gray text-sm flex items-start gap-2">
                          <div className="w-1 h-1 bg-stellar-purple rounded-full mt-2 flex-shrink-0"></div>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mission Achievements */}
                  <div className="mb-4">
                    <h4 className="text-star-white font-semibold mb-2">Mission Success</h4>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-comet-green text-sm flex items-start gap-2">
                          <div className="w-1 h-1 bg-comet-green rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Equipment */}
                  <div>
                    <h4 className="text-star-white font-semibold mb-2">Mission Equipment</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 bg-stellar-purple/20 text-stellar-purple text-xs rounded-full border border-stellar-purple/30"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: 'rgba(99, 102, 241, 0.3)' 
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Microsoft Roles', value: '2', icon: Calendar },
            { label: 'AI Models Integrated', value: '2', icon: Rocket },
            { label: 'Users Reached', value: '200K+', icon: Award },
            { label: 'Websites Tested', value: '10+', icon: MapPin }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 glass-morphism border border-moon-silver/20 rounded-xl"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <stat.icon className="text-stellar-purple w-8 h-8 mx-auto mb-3" />
              <div className="text-3xl font-bold text-star-white font-['Orbitron'] mb-1">
                {stat.value}
              </div>
              <div className="text-asteroid-gray text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
