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
    id: 'cloud-app-catalog-api',
    title: 'Cloud App Catalog API',
    subtitle: 'Core Internal Shared Service',
    description: 'Built from scratch to expose risk and compliance metrics for 31k+ applications to engineering teams across Microsoft.',
    longDescription: 'Designed and implemented a shared internal API that serves risk, security, and compliance metrics for 31k+ cloud applications. Adopted by multiple engineering teams as a single source of truth, with an automated update pipeline that reduced catalog lifecycle time from 12 to 2 hours.',
    image: '/projects/catalog-api.jpg',
    technologies: [
      { name: 'Node.js', category: 'backend', icon: '🟢' },
      { name: 'TypeScript', category: 'backend', icon: '🔷' },
      { name: 'Azure Cosmos DB', category: 'platform', icon: '☁️' },
      { name: 'Redis', category: 'backend', icon: '🔴' },
      { name: 'Azure DevOps', category: 'tools', icon: '🔄' },
      { name: 'REST APIs', category: 'backend', icon: '🔗' }
    ],
    features: [
      'Risk and compliance metrics for 31k+ applications',
      'Consumed as a shared service by multiple Microsoft teams',
      'Automated catalog update pipeline via Azure DevOps',
      'Backed by Azure Cosmos DB with a Redis cache layer'
    ],
    impact: [
      { metric: 'Apps Exposed', value: '31K+' },
      { metric: 'Lifecycle Cut', value: '12h → 2h' },
      { metric: 'Cycle Reduction', value: '83%' },
      { metric: 'Consuming Teams', value: 'Multiple' }
    ],
    links: {},
    status: 'production',
    year: '2024'
  },
  {
    id: 'shadow-it-ai-copilot',
    title: 'Shadow IT AI Copilot',
    subtitle: 'LLM-Powered Security Assistant (MCP)',
    description: 'AI Copilot enabling natural language querying of SaaS security metrics, backed by high-throughput APIs and semantic caching.',
    longDescription: 'Engineered an AI Copilot for Shadow IT Discovery that integrates an LLM layer with high-throughput backend APIs, letting users query SaaS security metrics in natural language. Added a semantic caching layer using Redis Vector Search and an MCP schema-compression proxy to cut inference overhead, latency, and token usage.',
    image: '/projects/ai-copilot.jpg',
    technologies: [
      { name: 'MCP', category: 'tools', icon: '🤖' },
      { name: 'LangChain', category: 'tools', icon: '🧠' },
      { name: 'Redis Vector Search', category: 'backend', icon: '🔴' },
      { name: 'Node.js', category: 'backend', icon: '🟢' },
      { name: 'Python', category: 'backend', icon: '🐍' },
      { name: 'Azure', category: 'platform', icon: '☁️' }
    ],
    features: [
      'Natural language querying of SaaS security metrics',
      'Semantic caching with Redis Vector Search',
      'MCP schema-compression proxy and response filtering',
      'Custom MCP extensibility tools for internal workflows'
    ],
    impact: [
      { metric: 'Inference Overhead', value: '-40%' },
      { metric: 'Cache Latency', value: '<30ms' },
      { metric: 'Token Utilization', value: '-85%' },
      { metric: 'Interface', value: 'Natural Language' }
    ],
    links: {},
    status: 'production',
    year: '2025'
  },
  {
    id: 'cosmos-db-migration',
    title: 'MongoDB → Cosmos DB Migration',
    subtitle: 'Zero-Downtime Data Migration',
    description: 'Led a zero-downtime migration of 500+ GB of production data across 12 microservices with 0 data loss.',
    longDescription: 'Planned and executed the migration of 500+ GB of production data from MongoDB to Azure Cosmos DB across 12 microservices. Designed the cutover strategy to complete in under 15 minutes with zero data loss and no downtime for 45k+ daily active users.',
    image: '/projects/migration.jpg',
    technologies: [
      { name: 'Azure Cosmos DB', category: 'platform', icon: '☁️' },
      { name: 'MongoDB', category: 'backend', icon: '🍃' },
      { name: 'Node.js', category: 'backend', icon: '🟢' },
      { name: 'Azure Event Hubs', category: 'platform', icon: '📨' },
      { name: 'Microservices', category: 'tools', icon: '🧩' }
    ],
    features: [
      'Migrated 500+ GB of live production data',
      'Coordinated cutover across 12 microservices',
      'Under 15-minute cutover window',
      'No downtime for 45k+ daily active users'
    ],
    impact: [
      { metric: 'Data Migrated', value: '500GB+' },
      { metric: 'Data Loss', value: '0' },
      { metric: 'Cutover Time', value: '<15 min' },
      { metric: 'Microservices', value: '12' }
    ],
    links: {},
    status: 'production',
    year: '2024'
  },
  {
    id: 'redis-distributed-cache',
    title: 'Distributed Cache Layer',
    subtitle: 'Cache-Aside Pattern with Redis',
    description: 'Architected a Redis-based distributed cache that slashed Cosmos DB read overhead by 92% under peak loads.',
    longDescription: 'Designed and rolled out a Redis-based distributed cache using the Cache-Aside pattern for the Cloud Discovery engine. Reduced Azure Cosmos DB read overhead by 92% and optimized downstream dependency latency under peak production load, improving cost efficiency and reliability.',
    image: '/projects/cache.jpg',
    technologies: [
      { name: 'Redis', category: 'backend', icon: '🔴' },
      { name: 'Azure Cosmos DB', category: 'platform', icon: '☁️' },
      { name: 'Node.js', category: 'backend', icon: '🟢' },
      { name: 'Azure Monitor', category: 'tools', icon: '📈' }
    ],
    features: [
      'Cache-Aside caching pattern implementation',
      'Reduced Cosmos DB read overhead by 92%',
      'Optimized downstream dependency latency',
      'Improved resilience under peak load'
    ],
    impact: [
      { metric: 'Read Overhead', value: '-92%' },
      { metric: 'Pattern', value: 'Cache-Aside' },
      { metric: 'Peak Load', value: 'Optimized' },
      { metric: 'Cost', value: 'Reduced' }
    ],
    links: {},
    status: 'production',
    year: '2024'
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
            Featured Projects
          </motion.h2>
          <p className="text-lg text-asteroid-gray max-w-3xl mx-auto leading-relaxed">
            Production systems I've designed and shipped at Microsoft Defender for Cloud Apps —
            spanning high-throughput APIs, data migration, distributed caching, and AI.
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
            <h3 className="text-2xl font-display font-bold text-star-white mb-8">Impact at a Glance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-nebula-purple mb-2">45K+</div>
                <div className="text-sm text-asteroid-gray">Daily Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-solar-yellow mb-2">500GB+</div>
                <div className="text-sm text-asteroid-gray">Data Migrated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cosmic-blue mb-2">31K+</div>
                <div className="text-sm text-asteroid-gray">Apps in Catalog API</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-star-white mb-2">92%</div>
                <div className="text-sm text-asteroid-gray">Read Overhead Cut</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
