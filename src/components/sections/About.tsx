'use client'

import { motion } from 'framer-motion'
import { Code, Rocket, Users, Award } from 'lucide-react'

const achievements = [
  {
    icon: Code,
    number: '25+',
    label: 'Years of Experience',
    description: 'Navigating the frontend universe'
  },
  {
    icon: Rocket,
    number: '100+',
    label: 'Projects Launched',
    description: 'Successful mission deployments'
  },
  {
    icon: Users,
    number: '50+',
    label: 'Team Members Led',
    description: 'Guiding crews to success'
  },
  {
    icon: Award,
    number: '15+',
    label: 'Technologies Mastered',
    description: 'Tools in the arsenal'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-star-white mb-6">
            About the Mission Commander
          </h2>
          <p className="text-lg text-asteroid-gray max-w-3xl mx-auto leading-relaxed">
            With over 25 years navigating the ever-evolving landscape of frontend engineering,
            I've witnessed and led the transformation from static HTML pages to dynamic,
            interactive web applications that power modern digital experiences.
          </p>
        </motion.div>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold text-star-white mb-4">
                The Journey Through Space & Time
              </h3>
              <p className="text-asteroid-gray leading-relaxed mb-4">
                From the early days of table-based layouts and jQuery magic to the modern era 
                of React ecosystems and serverless architectures, I've been at the forefront 
                of frontend innovation. My journey spans the evolution of web standards, 
                performance optimization techniques, and user experience paradigms.
              </p>
              <p className="text-asteroid-gray leading-relaxed">
                As a senior engineer and team leader, I've successfully launched over 100 
                projects, mentored 50+ developers, and consistently delivered high-performance 
                applications that serve millions of users across the digital cosmos.
              </p>
            </div>
            
            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold text-star-white mb-4">
                Mission Philosophy
              </h3>
              <p className="text-asteroid-gray leading-relaxed">
                I believe in crafting code that's not just functional, but elegant—like the 
                precise orbital mechanics that keep satellites in perfect harmony. Every line 
                of code should serve a purpose, every component should be reusable, and every 
                user interaction should feel as smooth as gliding through zero gravity.
              </p>
            </div>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
                  }}
                  className="holographic-border p-6 text-center"
                >
                  <div className="bg-stellar-purple/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-stellar-purple" />
                  </div>
                  <div className="text-2xl font-display font-bold text-star-white mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm font-semibold text-stellar-purple mb-1">
                    {achievement.label}
                  </div>
                  <div className="text-xs text-asteroid-gray">
                    {achievement.description}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-morphism rounded-2xl p-8"
        >
          <h3 className="text-2xl font-display font-semibold text-star-white mb-6 text-center">
            Core Values & Principles
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Performance First',
                description: 'Every millisecond counts in the user experience journey'
              },
              {
                title: 'Accessibility Always',
                description: 'Inclusive design ensures no user is left behind in space'
              },
              {
                title: 'Continuous Learning',
                description: 'The tech universe expands daily, and so must our knowledge'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h4 className="text-lg font-semibold text-stellar-purple mb-2">
                  {value.title}
                </h4>
                <p className="text-asteroid-gray text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
