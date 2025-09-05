'use client'

import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'
import { 
  Send, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  MapPin, 
  Phone,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Zap,
  Radio
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: 'medium'
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Commander name required for identification'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Communication channel required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid communication frequency'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mission briefing cannot be empty'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Mission briefing requires minimum 20 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        priority: 'medium'
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-400 border-green-400'
      case 'medium': return 'text-yellow-400 border-yellow-400'
      case 'high': return 'text-orange-400 border-orange-400'
      case 'urgent': return 'text-red-400 border-red-400'
      default: return 'text-yellow-400 border-yellow-400'
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com',
      color: 'text-star-white hover:text-nebula-purple',
      description: 'Code Repository'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com',
      color: 'text-star-white hover:text-cosmic-blue',
      description: 'Professional Network'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com',
      color: 'text-star-white hover:text-solar-yellow',
      description: 'Communication Stream'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:commander@spacestation.dev',
      color: 'text-star-white hover:text-green-400',
      description: 'Direct Channel'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-space-black via-cosmic-blue/5 to-space-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-nebula-purple/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-solar-yellow/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Radar Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, transparent 20%, rgba(168, 85, 247, 0.1) 21%, rgba(168, 85, 247, 0.1) 22%, transparent 23%),
              linear-gradient(0deg, transparent 24%, rgba(168, 85, 247, 0.05) 25%, rgba(168, 85, 247, 0.05) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, 0.05) 75%, rgba(168, 85, 247, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(168, 85, 247, 0.05) 25%, rgba(168, 85, 247, 0.05) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, 0.05) 75%, rgba(168, 85, 247, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-display font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #A855F7 50%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Mission Control Center
          </motion.h2>
          <p className="text-lg text-asteroid-gray max-w-3xl mx-auto leading-relaxed">
            Initiate contact protocol through the space command center interface.
            All communications are encrypted and transmitted via quantum channels.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Command Console (Contact Form) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative">
              {/* Holographic Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-nebula-purple via-solar-yellow to-cosmic-blue p-[1px] rounded-2xl">
                <div className="h-full w-full rounded-2xl bg-space-black/95 backdrop-blur-xl" />
              </div>
              
              <div className="relative p-8 rounded-2xl bg-space-black/90 backdrop-blur-xl border border-nebula-purple/20">
                {/* Console Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-asteroid-gray/20">
                  <div className="flex items-center gap-3">
                    <Radio className="w-6 h-6 text-nebula-purple animate-pulse" />
                    <h3 className="text-2xl font-display font-bold text-star-white">Command Console</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    ONLINE
                  </div>
                </div>

                {/* Status Display */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-400/10 border border-green-400/30 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Mission briefing received! Response incoming via quantum channel.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-400/10 border border-red-400/30 rounded-lg flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">Communication error. Please retry transmission.</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-star-white flex items-center gap-2">
                        <Zap className="w-4 h-4 text-nebula-purple" />
                        Commander Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 bg-cosmic-blue/5 border ${
                            errors.name 
                              ? 'border-red-400 focus:border-red-400' 
                              : focusedField === 'name' 
                                ? 'border-nebula-purple focus:border-nebula-purple' 
                                : 'border-asteroid-gray/30 focus:border-cosmic-blue'
                          } rounded-lg text-star-white placeholder-asteroid-gray/60 focus:outline-none focus:ring-2 focus:ring-current/20 transition-all`}
                          placeholder="Enter your identification..."
                        />
                        {focusedField === 'name' && (
                          <div className="absolute inset-0 rounded-lg bg-nebula-purple/10 pointer-events-none animate-pulse" />
                        )}
                      </div>
                      {errors.name && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-star-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-cosmic-blue" />
                        Communication Channel
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-4 py-3 bg-cosmic-blue/5 border ${
                            errors.email 
                              ? 'border-red-400 focus:border-red-400' 
                              : focusedField === 'email' 
                                ? 'border-cosmic-blue focus:border-cosmic-blue' 
                                : 'border-asteroid-gray/30 focus:border-cosmic-blue'
                          } rounded-lg text-star-white placeholder-asteroid-gray/60 focus:outline-none focus:ring-2 focus:ring-current/20 transition-all`}
                          placeholder="commander@starship.space"
                        />
                        {focusedField === 'email' && (
                          <div className="absolute inset-0 rounded-lg bg-cosmic-blue/10 pointer-events-none animate-pulse" />
                        )}
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-star-white">Organization</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-cosmic-blue/5 border border-asteroid-gray/30 focus:border-solar-yellow rounded-lg text-star-white placeholder-asteroid-gray/60 focus:outline-none focus:ring-2 focus:ring-solar-yellow/20 transition-all"
                        placeholder="Starfleet Command (optional)"
                      />
                    </div>

                    {/* Priority Level */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-star-white">Priority Level</label>
                      <select
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className={`w-full px-4 py-3 bg-cosmic-blue/5 border rounded-lg text-star-white focus:outline-none focus:ring-2 focus:ring-current/20 transition-all ${getPriorityColor(formData.priority)}`}
                      >
                        <option value="low" className="bg-space-black">🟢 Low Priority</option>
                        <option value="medium" className="bg-space-black">🟡 Medium Priority</option>
                        <option value="high" className="bg-space-black">🟠 High Priority</option>
                        <option value="urgent" className="bg-space-black">🔴 Urgent</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-star-white">Mission Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-3 bg-cosmic-blue/5 border border-asteroid-gray/30 focus:border-solar-yellow rounded-lg text-star-white placeholder-asteroid-gray/60 focus:outline-none focus:ring-2 focus:ring-solar-yellow/20 transition-all"
                      placeholder="Brief mission title..."
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-star-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-solar-yellow" />
                      Mission Briefing
                    </label>
                    <div className="relative">
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={6}
                        className={`w-full px-4 py-3 bg-cosmic-blue/5 border ${
                          errors.message 
                            ? 'border-red-400 focus:border-red-400' 
                            : focusedField === 'message' 
                              ? 'border-solar-yellow focus:border-solar-yellow' 
                              : 'border-asteroid-gray/30 focus:border-cosmic-blue'
                        } rounded-lg text-star-white placeholder-asteroid-gray/60 focus:outline-none focus:ring-2 focus:ring-current/20 transition-all resize-none`}
                        placeholder="Transmit your mission details, project requirements, or collaboration proposals..."
                      />
                      {focusedField === 'message' && (
                        <div className="absolute inset-0 rounded-lg bg-solar-yellow/10 pointer-events-none animate-pulse" />
                      )}
                    </div>
                    {errors.message && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                    <div className="text-xs text-asteroid-gray text-right">
                      {formData.message.length} characters
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-nebula-purple to-cosmic-blue hover:from-nebula-purple/80 hover:to-cosmic-blue/80 text-star-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-star-white/30 border-t-star-white rounded-full animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Initiate Transmission
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Mission Control Panel (Contact Info & Social) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="glass-morphism rounded-2xl p-6 border border-cosmic-blue/20">
              <h3 className="text-xl font-display font-bold text-star-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cosmic-blue" />
                Command Center Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-asteroid-gray">
                  <Mail className="w-4 h-4 text-nebula-purple" />
                  <span className="text-sm">commander@spacestation.dev</span>
                </div>
                <div className="flex items-center gap-3 text-asteroid-gray">
                  <Phone className="w-4 h-4 text-solar-yellow" />
                  <span className="text-sm">+1 (555) SPACE-DEV</span>
                </div>
                <div className="flex items-center gap-3 text-asteroid-gray">
                  <MapPin className="w-4 h-4 text-cosmic-blue" />
                  <span className="text-sm">Earth Orbit • Remote Operations</span>
                </div>
              </div>
            </div>

            {/* Orbital Social Links */}
            <div className="glass-morphism rounded-2xl p-6 border border-nebula-purple/20">
              <h3 className="text-xl font-display font-bold text-star-white mb-6">Orbital Network</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className={`flex items-center justify-between p-3 rounded-lg bg-cosmic-blue/5 border border-asteroid-gray/20 hover:border-current transition-all group ${social.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <social.icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium text-star-white group-hover:text-current">
                          {social.name}
                        </div>
                        <div className="text-xs text-asteroid-gray">
                          {social.description}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-morphism rounded-2xl p-6 border border-solar-yellow/20">
              <h3 className="text-xl font-display font-bold text-star-white mb-4 flex items-center gap-2">
                <Radio className="w-5 h-5 text-solar-yellow animate-pulse" />
                Response Protocol
              </h3>
              <div className="space-y-3 text-sm text-asteroid-gray">
                <div className="flex justify-between">
                  <span>Standard Missions:</span>
                  <span className="text-star-white">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority Missions:</span>
                  <span className="text-solar-yellow">8-12 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Urgent Missions:</span>
                  <span className="text-red-400">2-4 hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
