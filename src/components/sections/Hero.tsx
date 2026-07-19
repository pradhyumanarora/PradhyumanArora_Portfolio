'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

const TYPEWRITER_TEXTS = [
  'Software Engineer',
  'Cloud Infrastructure',
  'Distributed Systems',
  'Backend & APIs',
  'AI Systems'
]

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typeSpeed, setTypeSpeed] = useState(100)

  useEffect(() => {
    const handleType = () => {
      const fullText = TYPEWRITER_TEXTS[currentTextIndex]
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        setTypeSpeed(50)
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        setTypeSpeed(100)
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % TYPEWRITER_TEXTS.length)
      }
    }

    const timer = setTimeout(handleType, typeSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentTextIndex, typeSpeed])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-hero font-display font-bold text-star-white mb-6">
              <span className="block">Pradhyuman Arora</span>
              <span className="block text-glow text-3xl sm:text-4xl lg:text-5xl mt-2">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-lg sm:text-xl lg:text-2xl text-asteroid-gray max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Software Engineer at{' '}
            <span className="text-stellar-purple font-semibold">Microsoft Defender for Cloud Apps</span>,
            building high-throughput cloud infrastructure, distributed systems, and secure
            backend services at scale.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-stellar-purple to-nebula-pink text-star-white font-semibold rounded-lg shadow-lg hover:shadow-glow-purple transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stellar-purple focus:ring-offset-2 focus:ring-offset-deep-space"
            >
              View My Work
            </motion.button>

            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-stellar-purple text-stellar-purple font-semibold rounded-lg hover:bg-stellar-purple hover:text-star-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stellar-purple focus:ring-offset-2 focus:ring-offset-deep-space"
            >
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
            className="flex justify-center space-x-6 mb-12"
          >
            {[
              { Icon: Github, href: 'https://github.com/pradhyumanarora', label: 'GitHub' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/pradhyumanarora/', label: 'LinkedIn' },
              { Icon: Mail, href: 'mailto:pradhyumanarora@gmail.com', label: 'Email' }
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360,
                  color: '#6366f1'
                }}
                whileTap={{ scale: 0.9 }}
                className="text-asteroid-gray hover:text-stellar-purple transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-stellar-purple rounded-full p-1"
                aria-label={label}
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-20 left-10 w-4 h-4 bg-stellar-purple rounded-full opacity-60"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-40 right-20 w-6 h-6 bg-nebula-pink rounded-full opacity-40"
      />
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-40 left-20 w-8 h-8 bg-solar-gold rounded-full opacity-30"
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-asteroid-gray hover:text-stellar-purple transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-stellar-purple rounded-full p-2"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </section>
  )
}
