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
    id: 'senior-architect',
    title: 'Senior Frontend Architect',
    company: 'TechCorp Industries',
    location: 'San Francisco, CA',
    duration: '2020 - Present',
    period: '4+ years',
    description: [
      'Led digital transformation initiatives for enterprise applications serving 10M+ users',
      'Architected scalable frontend systems using React, Next.js, and modern build tools',
      'Mentored 15+ engineers and established engineering best practices across teams',
      'Reduced page load times by 40% through performance optimization strategies'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'AWS', 'Docker', 'Jest'],
    achievements: [
      'Launched 3 major products generating $50M+ revenue',
      'Improved team velocity by 60% through automation',
      'Established design system used across 12 product teams'
    ]
  },
  {
    id: 'tech-lead',
    title: 'Technical Lead - Frontend',
    company: 'InnovateLabs',
    location: 'Austin, TX',
    duration: '2017 - 2020',
    period: '3 years',
    description: [
      'Built and led high-performance frontend team of 8 engineers',
      'Spearheaded migration from legacy Angular to modern React architecture',
      'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
      'Collaborated with product and design teams on user experience optimization'
    ],
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'Jenkins', 'Kubernetes', 'Sass'],
    achievements: [
      'Successfully migrated 12 legacy applications to modern stack',
      'Achieved 99.9% uptime for critical customer-facing applications',
      'Reduced bug reports by 75% through automated testing implementation'
    ]
  },
  {
    id: 'senior-dev',
    title: 'Senior Frontend Developer',
    company: 'DigitalSolutions Co',
    location: 'Seattle, WA',
    duration: '2014 - 2017',
    period: '3 years',
    description: [
      'Developed responsive web applications for Fortune 500 clients',
      'Optimized application performance achieving 95+ Lighthouse scores',
      'Collaborated with UX team to implement pixel-perfect designs',
      'Mentored junior developers in modern JavaScript and best practices'
    ],
    technologies: ['JavaScript', 'jQuery', 'Gulp', 'Sass', 'PHP', 'MySQL', 'Git'],
    achievements: [
      'Delivered 25+ client projects on time and within budget',
      'Improved client satisfaction scores by 40%',
      'Developed reusable component library saving 200+ dev hours'
    ]
  },
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Developer',
    company: 'StartupVenture',
    location: 'Boulder, CO',
    duration: '2010 - 2014',
    period: '4 years',
    description: [
      'Built complete web applications from concept to deployment',
      'Developed RESTful APIs and integrated third-party services',
      'Implemented responsive designs before it became industry standard',
      'Participated in all phases of product development lifecycle'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Ruby on Rails', 'PostgreSQL', 'Heroku'],
    achievements: [
      'Launched 5 successful web products used by 50K+ users',
      'Achieved 300% user growth through performance optimizations',
      'Established development workflows still used by the company'
    ]
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    company: 'CreativeAgency',
    location: 'Denver, CO',
    duration: '2000 - 2010',
    period: '10 years',
    description: [
      'Created websites and web applications for diverse client portfolio',
      'Pioneered early adoption of web standards and accessibility practices',
      'Developed custom CMS solutions before WordPress became mainstream',
      'Led transition from table-based layouts to semantic CSS designs'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Flash', 'Photoshop'],
    achievements: [
      'Built 100+ websites for clients across various industries',
      'Won 3 industry awards for innovative web design',
      'Trained 20+ designers in web development fundamentals'
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
              Space Missions
            </h2>
          </div>
          <p className="text-xl text-asteroid-gray max-w-2xl mx-auto">
            A chronological journey through 25+ years of frontend engineering excellence, 
            from the early web frontier to modern space-age applications
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
            { label: 'Years of Experience', value: '25+', icon: Calendar },
            { label: 'Projects Delivered', value: '150+', icon: Rocket },
            { label: 'Teams Led', value: '12', icon: Award },
            { label: 'Technologies Mastered', value: '30+', icon: MapPin }
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
