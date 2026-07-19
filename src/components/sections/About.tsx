'use client'

import { motion } from 'framer-motion'
import { Code, Rocket, Users, Award } from 'lucide-react'

const achievements = [
  {
    icon: Code,
    number: '2+',
    label: 'Years at Microsoft',
    description: 'Shipping production backend systems'
  },
  {
    icon: Rocket,
    number: '45K+',
    label: 'Daily Active Users',
    description: 'Served by systems I own'
  },
  {
    icon: Users,
    number: '31K+',
    label: 'Apps in Catalog API',
    description: 'Exposed as a shared service'
  },
  {
    icon: Award,
    number: '92%',
    label: 'Read Overhead Cut',
    description: 'Via a distributed cache layer'
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
            About Me
          </h2>
          <p className="text-lg text-asteroid-gray max-w-3xl mx-auto leading-relaxed">
            I'm a Software Engineer on the Shadow IT team at Microsoft Defender for Cloud Apps,
            focused on building reliable, high-throughput backend systems on Azure. I care about
            clean architecture, scale, and secure-by-default engineering.
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
                What I Do
              </h3>
              <p className="text-asteroid-gray leading-relaxed mb-4">
                At Microsoft Defender for Cloud Apps, I own backend features for the Cloud Discovery
                engine that processes real-time logs via Azure Event Hubs to power shadow IT detection
                for 45k+ daily active users. I've led a zero-downtime migration of 500+ GB of production
                data from MongoDB to Azure Cosmos DB and built the Cloud App Catalog API from scratch.
              </p>
              <p className="text-asteroid-gray leading-relaxed">
                More recently, I've been building an AI Copilot (MCP) for Shadow IT Discovery,
                integrating LLMs with high-throughput backend APIs and designing semantic caching
                with Redis Vector Search to cut inference overhead and latency.
              </p>
            </div>
            
            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold text-star-white mb-4">
                How I Work
              </h3>
              <p className="text-asteroid-gray leading-relaxed">
                I believe good systems are simple, observable, and secure by default. I optimize for
                reliability and scale, invest in strong test coverage and automation, and enforce
                least-privilege access across the services I build. Every change should be measurable
                and safe to ship.
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
                title: 'Reliability at Scale',
                description: 'Systems should stay fast and correct under peak production load'
              },
              {
                title: 'Security by Design',
                description: 'Zero-trust and least-privilege access built in from the start'
              },
              {
                title: 'Continuous Learning',
                description: 'The stack keeps evolving, and so does the way I build'
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
