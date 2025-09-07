'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github, Eye, Cpu, Zap, Shield } from 'lucide-react'

interface ProjectData {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  image: string
  technologies: {
    name: string
    category: 'frontend' | 'backend' | 'tools' | 'platform'
    icon: string
  }[]
  features: string[]
  impact: {
    metric: string
    value: string
  }[]
  links: {
    live?: string
    github?: string
    demo?: string
  }
  status: 'production' | 'beta' | 'archived'
  year: string
}

interface ProjectCardProps {
  project: ProjectData
  index: number
  isVisible: boolean
}

const projects: ProjectData[] = [
  {
    id: 'nexus-platform',
    title: 'Nexus Commerce Platform',
    subtitle: 'Enterprise E-commerce Architecture',
    description: 'Scalable microservices platform serving 10M+ users with real-time inventory and AI-driven personalization',
    longDescription: 'Built from ground up using Next.js 14, featuring advanced caching strategies, real-time WebSocket connections, and integrated payment processing. Implemented comprehensive testing suite and CI/CD pipeline.',
    image: '/projects/nexus-platform.jpg',
    technologies: [
      { name: 'Next.js 14', category: 'frontend', icon: '⚛️' },
      { name: 'TypeScript', category: 'frontend', icon: '🔷' },
      { name: 'Node.js', category: 'backend', icon: '🟢' },
      { name: 'PostgreSQL', category: 'backend', icon: '🐘' },
      { name: 'Redis', category: 'backend', icon: '🔴' },
      { name: 'Docker', category: 'tools', icon: '🐳' },
      { name: 'AWS', category: 'platform', icon: '☁️' },
      { name: 'Kubernetes', category: 'platform', icon: '⚓' }
    ],
    features: [
      'Real-time inventory management',
      'AI-powered recommendation engine',
      'Multi-tenant architecture',
      'Advanced caching layer',
      'Comprehensive analytics dashboard'
    ],
    impact: [
      { metric: 'Users Served', value: '10M+' },
      { metric: 'Uptime', value: '99.9%' },
      { metric: 'Performance Score', value: '98/100' },
      { metric: 'Load Reduction', value: '65%' }
    ],
    links: {
      live: 'https://nexus-commerce.demo',
      github: 'https://github.com/pradhyumanarora/nexus-platform',
      demo: 'https://demo.nexus-commerce.io'
    },
    status: 'production',
    year: '2024'
  },
  {
    id: 'quantum-analytics',
    title: 'Quantum Analytics Dashboard',
    subtitle: 'Real-time Data Visualization',
    description: 'High-performance dashboard processing 1TB+ daily data with ML-powered insights and predictive modeling',
    longDescription: 'Advanced data visualization platform built with React and D3.js, featuring real-time WebSocket connections, custom charting components, and machine learning integration for predictive analytics.',
    image: '/projects/quantum-analytics.jpg',
    technologies: [
      { name: 'React 18', category: 'frontend', icon: '⚛️' },
      { name: 'D3.js', category: 'frontend', icon: '📊' },
      { name: 'Python', category: 'backend', icon: '🐍' },
      { name: 'FastAPI', category: 'backend', icon: '⚡' },
      { name: 'ClickHouse', category: 'backend', icon: '🏠' },
      { name: 'TensorFlow', category: 'tools', icon: '🧠' },
      { name: 'Apache Kafka', category: 'platform', icon: '📨' },
      { name: 'Grafana', category: 'tools', icon: '📈' }
    ],
    features: [
      'Real-time streaming data processing',
      'Custom D3.js visualizations',
      'ML-powered anomaly detection',
      'Interactive filtering system',
      'Exportable reporting suite'
    ],
    impact: [
      { metric: 'Data Processed', value: '1TB+/day' },
      { metric: 'Query Performance', value: '<100ms' },
      { metric: 'Accuracy Rate', value: '97.3%' },
      { metric: 'Cost Savings', value: '$2M+/year' }
    ],
    links: {
      live: 'https://quantum-analytics.demo',
      github: 'https://github.com/pradhyumanarora/quantum-analytics'
    },
    status: 'production',
    year: '2023'
  },
  {
    id: 'neural-cms',
    title: 'Neural Content Management',
    subtitle: 'AI-Enhanced CMS Platform',
    description: 'Headless CMS with AI content optimization, multi-language support, and advanced workflow automation',
    longDescription: 'Next-generation content management system featuring AI-powered content suggestions, automated SEO optimization, and sophisticated role-based permissions. Built with modern JAMstack architecture.',
    image: '/projects/neural-cms.jpg',
    technologies: [
      { name: 'Vue 3', category: 'frontend', icon: '💚' },
      { name: 'Nuxt.js', category: 'frontend', icon: '🎯' },
      { name: 'GraphQL', category: 'backend', icon: '🔗' },
      { name: 'MongoDB', category: 'backend', icon: '🍃' },
      { name: 'OpenAI', category: 'tools', icon: '🤖' },
      { name: 'Elasticsearch', category: 'backend', icon: '🔍' },
      { name: 'Netlify', category: 'platform', icon: '🌐' },
      { name: 'Stripe', category: 'tools', icon: '💳' }
    ],
    features: [
      'AI-powered content optimization',
      'Headless architecture',
      'Multi-language support',
      'Advanced workflow engine',
      'Real-time collaboration'
    ],
    impact: [
      { metric: 'Content Quality', value: '+85%' },
      { metric: 'Publishing Speed', value: '3x faster' },
      { metric: 'SEO Performance', value: '+120%' },
      { metric: 'User Adoption', value: '94%' }
    ],
    links: {
      live: 'https://neural-cms.demo',
      github: 'https://github.com/pradhyumanarora/neural-cms',
      demo: 'https://demo.neural-cms.io'
    },
    status: 'beta',
    year: '2024'
  },
  {
    id: 'spectrum-ui',
    title: 'Spectrum Design System',
    subtitle: 'Enterprise Component Library',
    description: 'Comprehensive design system with 150+ components, accessibility compliance, and multi-framework support',
    longDescription: 'Production-ready design system built with Storybook, featuring comprehensive documentation, automated testing, and support for React, Vue, and Angular frameworks.',
    image: '/projects/spectrum-ui.jpg',
    technologies: [
      { name: 'Storybook', category: 'tools', icon: '📚' },
      { name: 'Web Components', category: 'frontend', icon: '🧩' },
      { name: 'SCSS', category: 'frontend', icon: '🎨' },
      { name: 'Jest', category: 'tools', icon: '🧪' },
      { name: 'Playwright', category: 'tools', icon: '🎭' },
      { name: 'Figma API', category: 'tools', icon: '🎯' },
      { name: 'GitHub Actions', category: 'platform', icon: '🔄' },
      { name: 'npm', category: 'platform', icon: '📦' }
    ],
    features: [
      '150+ accessible components',
      'Multi-framework support',
      'Automated visual regression testing',
      'Design tokens system',
      'Comprehensive documentation'
    ],
    impact: [
      { metric: 'Components', value: '150+' },
      { metric: 'Teams Using', value: '25+' },
      { metric: 'Development Speed', value: '+200%' },
      { metric: 'Accessibility Score', value: '100%' }
    ],
    links: {
      live: 'https://spectrum-ui.design',
      github: 'https://github.com/pradhyumanarora/spectrum-ui'
    },
    status: 'production',
    year: '2023'
  }
]

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'text-nebula-purple bg-nebula-purple/20 border-nebula-purple/30'
      case 'backend': return 'text-solar-yellow bg-solar-yellow/20 border-solar-yellow/30'
      case 'tools': return 'text-asteroid-gray bg-asteroid-gray/20 border-asteroid-gray/30'
      case 'platform': return 'text-cosmic-blue bg-cosmic-blue/20 border-cosmic-blue/30'
      default: return 'text-star-white bg-star-white/20 border-star-white/30'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'production': return <div className="flex items-center gap-1 text-green-400"><Zap className="w-3 h-3" /> Live</div>
      case 'beta': return <div className="flex items-center gap-1 text-yellow-400"><Cpu className="w-3 h-3" /> Beta</div>
      case 'archived': return <div className="flex items-center gap-1 text-gray-400"><Shield className="w-3 h-3" /> Archived</div>
      default: return null
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -10 }}
        animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ 
          y: -10,
          rotateX: 5,
          rotateY: isHovered ? 5 : 0,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Holographic Border Effect */}
        <div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-nebula-purple via-solar-yellow to-cosmic-blue p-[1px] transition-all duration-300 ${
            isHovered ? 'opacity-100 animate-pulse' : 'opacity-60'
          }`}
        >
          <div className="h-full w-full rounded-2xl bg-space-black/95 backdrop-blur-xl" />
        </div>

        {/* Main Card Content */}
        <div className="relative h-full p-8 rounded-2xl bg-space-black/90 backdrop-blur-xl border border-asteroid-gray/20 overflow-hidden">
          
          {/* Background Glow Effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-nebula-purple/10 via-transparent to-cosmic-blue/10 transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} 
          />
          
          {/* Status and Year */}
          <div className="relative flex justify-between items-start mb-6">
            <div className="text-xs font-medium">
              {getStatusBadge(project.status)}
            </div>
            <div className="text-xs text-asteroid-gray">{project.year}</div>
          </div>

          {/* Project Header */}
          <div className="relative mb-6">
            <h3 className="text-2xl font-display font-bold text-star-white mb-2 group-hover:text-nebula-purple transition-colors">
              {project.title}
            </h3>
            <p className="text-solar-yellow font-medium mb-3">{project.subtitle}</p>
            <p className="text-asteroid-gray text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technology Tags */}
          <div className="relative mb-8">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map((tech) => (
                <motion.span
                  key={tech.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all ${getCategoryColor(tech.category)}`}
                >
                  <span>{tech.icon}</span>
                  {tech.name}
                </motion.span>
              ))}
              {project.technologies.length > 6 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-asteroid-gray bg-asteroid-gray/10 border border-asteroid-gray/20">
                  +{project.technologies.length - 6} more
                </span>
              )}
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="relative mb-8">
            <div className="grid grid-cols-2 gap-4">
              {project.impact.slice(0, 4).map((item) => (
                <div key={item.metric} className="text-center">
                  <div className="text-lg font-bold text-nebula-purple">{item.value}</div>
                  <div className="text-xs text-asteroid-gray">{item.metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="relative flex gap-3">
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-nebula-purple hover:bg-nebula-purple/80 text-star-white rounded-lg text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </motion.a>
            )}
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-transparent border border-asteroid-gray/30 hover:border-solar-yellow text-star-white hover:text-solar-yellow rounded-lg text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </motion.a>
            )}
            <motion.button
              onClick={() => setShowDetails(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-cosmic-blue/30 hover:border-cosmic-blue text-star-white hover:text-cosmic-blue rounded-lg text-sm font-medium transition-colors"
            >
              <Eye className="w-4 h-4" />
              Details
            </motion.button>
          </div>

          {/* Hover Glow Effect */}
          <div 
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-nebula-purple/20 via-solar-yellow/20 to-cosmic-blue/20 blur-xl transition-opacity duration-500 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: -1 }}
          />
        </div>
      </motion.div>

      {/* Detailed Modal */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-space-black border border-nebula-purple/30 rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-star-white mb-2">{project.title}</h3>
                <p className="text-solar-yellow">{project.subtitle}</p>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-asteroid-gray hover:text-star-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-nebula-purple font-semibold mb-3">Project Overview</h4>
                <p className="text-asteroid-gray leading-relaxed">{project.longDescription}</p>
              </div>

              <div>
                <h4 className="text-nebula-purple font-semibold mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-asteroid-gray">
                      <span className="text-solar-yellow mt-1">▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-nebula-purple font-semibold mb-3">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(tech.category)}`}
                    >
                      <span>{tech.icon}</span>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-nebula-purple font-semibold mb-3">Impact & Results</h4>
                <div className="grid grid-cols-2 gap-4">
                  {project.impact.map((item) => (
                    <div key={item.metric} className="text-center p-3 bg-cosmic-blue/10 rounded-lg border border-cosmic-blue/20">
                      <div className="text-xl font-bold text-cosmic-blue">{item.value}</div>
                      <div className="text-xs text-asteroid-gray">{item.metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(new Set<number>())

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-space-black via-cosmic-blue/10 to-space-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nebula-purple/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-solar-yellow/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
            className="text-4xl sm:text-5xl font-display font-bold text-star-white mb-6"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #A855F7 50%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Mission Archives
          </motion.h2>
          <p className="text-lg text-asteroid-gray max-w-3xl mx-auto leading-relaxed">
            Featured projects showcasing 25+ years of space-station level engineering,
            each card enhanced with holographic borders and 3D interaction effects.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, delay: index * 0.1 }
              }}
              viewport={{ once: true }}
              onViewportEnter={() => setVisibleProjects(prev => {
                const newSet = new Set(Array.from(prev))
                newSet.add(index)
                return newSet
              })}
            >
              <ProjectCard 
                project={project} 
                index={index}
                isVisible={visibleProjects.has(index)}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Mission Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-star-white mb-8">Mission Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-nebula-purple mb-2">25+</div>
                <div className="text-sm text-asteroid-gray">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-solar-yellow mb-2">100+</div>
                <div className="text-sm text-asteroid-gray">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cosmic-blue mb-2">50M+</div>
                <div className="text-sm text-asteroid-gray">Users Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-star-white mb-2">99.9%</div>
                <div className="text-sm text-asteroid-gray">Uptime Achieved</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
