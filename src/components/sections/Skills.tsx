'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Star, Zap, Code, Database, Cloud, Cpu } from 'lucide-react';

interface SkillNode {
  id: string;
  label: string;
  category: 'frontend' | 'backend' | 'tools' | 'soft';
  x: number;
  y: number;
  connections: string[];
  icon: React.ComponentType<any>;
  description: string;
  proficiency: number; // 1-5 scale
  experience: string;
}

interface SkillConnection {
  from: string;
  to: string;
  strength: number; // 1-3 scale for line thickness
}

const skillsData: SkillNode[] = [
  // Languages Cluster (Stellar Purple) - Left side
  {
    id: 'python',
    label: 'Python',
    category: 'frontend',
    x: 150,
    y: 150,
    connections: ['typescript', 'django', 'langchain'],
    icon: Code,
    description: 'Primary language for backend services, tooling, and AI integrations',
    proficiency: 5,
    experience: '4+ years'
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'frontend',
    x: 240,
    y: 110,
    connections: ['nodejs', 'javascript'],
    icon: Code,
    description: 'Typed JavaScript for building reliable Node.js services',
    proficiency: 5,
    experience: '3+ years'
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    category: 'frontend',
    x: 110,
    y: 220,
    connections: ['nodejs'],
    icon: Code,
    description: 'Full-stack JavaScript across backend and web tooling',
    proficiency: 5,
    experience: '4+ years'
  },
  {
    id: 'java',
    label: 'Java',
    category: 'frontend',
    x: 250,
    y: 200,
    connections: [],
    icon: Code,
    description: 'JVM-based service development and coursework foundations',
    proficiency: 4,
    experience: '3+ years'
  },
  {
    id: 'cpp',
    label: 'C++',
    category: 'frontend',
    x: 180,
    y: 270,
    connections: [],
    icon: Code,
    description: 'Systems-level programming and performance-critical code',
    proficiency: 3,
    experience: '3+ years'
  },

  // Backend & Data Cluster (Nebula Pink) - Right side
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'backend',
    x: 500,
    y: 150,
    connections: ['typescript', 'express', 'redis', 'cosmosdb'],
    icon: Database,
    description: 'Event-driven backend runtime powering high-throughput microservices',
    proficiency: 5,
    experience: '3+ years'
  },
  {
    id: 'express',
    label: 'Express',
    category: 'backend',
    x: 610,
    y: 120,
    connections: ['nodejs'],
    icon: Database,
    description: 'REST API development and middleware for backend services',
    proficiency: 4,
    experience: '2+ years'
  },
  {
    id: 'django',
    label: 'Django',
    category: 'backend',
    x: 450,
    y: 240,
    connections: ['python'],
    icon: Database,
    description: 'Python web framework for full-stack application development',
    proficiency: 4,
    experience: '2+ years'
  },
  {
    id: 'cosmosdb',
    label: 'Azure Cosmos DB',
    category: 'backend',
    x: 610,
    y: 210,
    connections: ['nodejs', 'azure'],
    icon: Database,
    description: 'Globally distributed NoSQL database at production scale',
    proficiency: 5,
    experience: '2+ years'
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    category: 'backend',
    x: 690,
    y: 160,
    connections: ['nodejs'],
    icon: Database,
    description: 'Document database design, migration, and optimization',
    proficiency: 4,
    experience: '2+ years'
  },
  {
    id: 'redis',
    label: 'Redis',
    category: 'backend',
    x: 550,
    y: 280,
    connections: ['nodejs'],
    icon: Database,
    description: 'Distributed caching and Redis Vector Search for semantic caching',
    proficiency: 5,
    experience: '2+ years'
  },
  {
    id: 'mysql',
    label: 'MySQL',
    category: 'backend',
    x: 690,
    y: 260,
    connections: [],
    icon: Database,
    description: 'Relational database design and query optimization',
    proficiency: 3,
    experience: '3+ years'
  },

  // Cloud & DevOps Cluster (Solar Gold) - Bottom area
  {
    id: 'azure',
    label: 'Azure',
    category: 'tools',
    x: 300,
    y: 360,
    connections: ['docker', 'cosmosdb', 'monitoring'],
    icon: Cloud,
    description: 'Primary cloud platform: Event Hubs, Cosmos DB, and managed identities',
    proficiency: 5,
    experience: '2+ years'
  },
  {
    id: 'gcp',
    label: 'Google Cloud',
    category: 'tools',
    x: 180,
    y: 400,
    connections: ['kubernetes'],
    icon: Cloud,
    description: 'Cloud services and infrastructure fundamentals',
    proficiency: 3,
    experience: '1+ years'
  },
  {
    id: 'docker',
    label: 'Docker',
    category: 'tools',
    x: 400,
    y: 410,
    connections: ['kubernetes', 'azure'],
    icon: Cloud,
    description: 'Containerization of services and reproducible environments',
    proficiency: 4,
    experience: '2+ years'
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes',
    category: 'tools',
    x: 500,
    y: 390,
    connections: ['docker'],
    icon: Cloud,
    description: 'Container orchestration for cloud-native deployments',
    proficiency: 3,
    experience: '1+ years'
  },
  {
    id: 'azuredevops',
    label: 'Azure DevOps',
    category: 'tools',
    x: 610,
    y: 360,
    connections: ['docker'],
    icon: Cpu,
    description: 'CI/CD pipelines and release automation',
    proficiency: 4,
    experience: '2+ years'
  },
  {
    id: 'monitoring',
    label: 'Azure Monitor',
    category: 'tools',
    x: 700,
    y: 310,
    connections: ['azure'],
    icon: Cpu,
    description: 'Observability with Azure Monitor and Application Insights',
    proficiency: 4,
    experience: '2+ years'
  },

  // AI & Architecture Cluster (Comet Green) - Top area
  {
    id: 'microservices',
    label: 'Microservices',
    category: 'soft',
    x: 350,
    y: 150,
    connections: ['nodejs', 'eventdriven'],
    icon: Cpu,
    description: 'Designing and operating distributed microservice architectures',
    proficiency: 5,
    experience: '2+ years'
  },
  {
    id: 'eventdriven',
    label: 'Event-Driven',
    category: 'soft',
    x: 300,
    y: 70,
    connections: ['microservices'],
    icon: Zap,
    description: 'Real-time log processing with Azure Event Hubs',
    proficiency: 4,
    experience: '2+ years'
  },
  {
    id: 'langchain',
    label: 'LangChain',
    category: 'soft',
    x: 450,
    y: 60,
    connections: ['python', 'mcp'],
    icon: Cpu,
    description: 'Building LLM-powered features and agent workflows',
    proficiency: 4,
    experience: '1+ years'
  },
  {
    id: 'autogen',
    label: 'AutoGen',
    category: 'soft',
    x: 560,
    y: 70,
    connections: ['langchain'],
    icon: Cpu,
    description: 'Multi-agent orchestration for AI systems',
    proficiency: 3,
    experience: '1+ years'
  },
  {
    id: 'mcp',
    label: 'MCP',
    category: 'soft',
    x: 600,
    y: 130,
    connections: ['langchain'],
    icon: Star,
    description: 'Model Context Protocol tooling for AI copilots and extensibility',
    proficiency: 4,
    experience: '1+ years'
  }
];

const categoryColors = {
  frontend: '#6366F1', // Stellar Purple
  backend: '#EC4899',  // Nebula Pink
  tools: '#F59E0B',    // Solar Gold
  soft: '#10B981'      // Comet Green
};

const categoryLabels = {
  frontend: 'Languages',
  backend: 'Backend & Data',
  tools: 'Cloud & DevOps',
  soft: 'AI & Architecture'
};

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const connections: SkillConnection[] = [];
  skillsData.forEach(skill => {
    skill.connections.forEach(connectionId => {
      if (!connections.find(conn => 
        (conn.from === skill.id && conn.to === connectionId) ||
        (conn.from === connectionId && conn.to === skill.id)
      )) {
        connections.push({
          from: skill.id,
          to: connectionId,
          strength: 1
        });
      }
    });
  });

  const getSkillById = (id: string) => skillsData.find(skill => skill.id === id);

  const getConnectionPath = (from: string, to: string) => {
    const fromSkill = getSkillById(from);
    const toSkill = getSkillById(to);
    if (!fromSkill || !toSkill) return '';

    return `M ${fromSkill.x} ${fromSkill.y} Q ${(fromSkill.x + toSkill.x) / 2} ${(fromSkill.y + toSkill.y) / 2 - 20} ${toSkill.x} ${toSkill.y}`;
  };

  const isConnected = (skillId: string, targetId: string) => {
    return connections.some(conn => 
      (conn.from === skillId && conn.to === targetId) ||
      (conn.from === targetId && conn.to === skillId)
    );
  };

  const handleSkillClick = (skill: SkillNode) => {
    setSelectedSkill(skill);
  };

  const renderProficiencyStars = (proficiency: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < proficiency ? 'text-solar-gold fill-current' : 'text-asteroid-gray'
        }`}
      />
    ));
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space/90 to-cosmic-blue/20"></div>
      
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
            <Star className="text-stellar-purple w-8 h-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-star-white font-['Space_Grotesk']">
              Skills &amp; Technologies
            </h2>
          </div>
          <p className="text-xl text-asteroid-gray max-w-2xl mx-auto">
            An interactive map of the languages, cloud platforms, and tools I use to
            build and ship reliable backend systems at scale
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-asteroid-gray text-sm">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Constellation SVG */}
        <motion.div
          className="relative w-full max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-cosmic-blue/20 to-deep-space/40 rounded-2xl p-8 backdrop-blur-sm border border-moon-silver/10">
            <svg
              ref={svgRef}
              viewBox="0 0 800 500"
              className="w-full h-auto"
              style={{ minHeight: '500px' }}
            >
              {/* Connections */}
              {connections.map((connection, index) => {
                const fromSkill = getSkillById(connection.from);
                const toSkill = getSkillById(connection.to);
                if (!fromSkill || !toSkill) return null;

                const isHighlighted = hoveredSkill && 
                  (hoveredSkill === connection.from || hoveredSkill === connection.to);

                return (
                  <motion.path
                    key={`${connection.from}-${connection.to}`}
                    d={getConnectionPath(connection.from, connection.to)}
                    stroke={isHighlighted ? categoryColors[fromSkill.category] : '#64748B'}
                    strokeWidth={isHighlighted ? 2 : 1}
                    fill="none"
                    opacity={isHighlighted ? 0.8 : 0.2}
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: isHighlighted ? 0.8 : 0.2 
                    }}
                    transition={{ 
                      pathLength: {
                        duration: 2,
                        delay: 0.5 + index * 0.05,
                        ease: "easeInOut"
                      },
                      opacity: {
                        duration: 0.3,
                        ease: "easeInOut"
                      }
                    }}
                  />
                );
              })}

              {/* Skill Nodes */}
              {skillsData.map((skill, index) => {
                const IconComponent = skill.icon;
                const isHighlighted = hoveredSkill === skill.id;
                const isConnectedToHovered = hoveredSkill && 
                  isConnected(skill.id, hoveredSkill);
                const shouldDim = hoveredSkill && !isHighlighted && !isConnectedToHovered;

                return (
                  <g key={skill.id}>
                    {/* Pulsing Effect - Behind the main circle */}
                    {isHighlighted && (
                      <motion.circle
                        cx={skill.x}
                        cy={skill.y}
                        r={30}
                        fill={categoryColors[skill.category]}
                        opacity={0.2}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    {/* Node Circle */}
                    <motion.circle
                      cx={skill.x}
                      cy={skill.y}
                      r={isHighlighted ? 24 : 20}
                      fill={categoryColors[skill.category]}
                      opacity={shouldDim ? 0.3 : 1}
                      stroke={isHighlighted ? '#F8FAFC' : 'transparent'}
                      strokeWidth={2}
                      className="cursor-pointer"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.8 + index * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.1 }}
                      onMouseEnter={() => setHoveredSkill(skill.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => handleSkillClick(skill)}
                    />

                    {/* Skill Label */}
                    <text
                      x={skill.x}
                      y={skill.y - 28}
                      textAnchor="middle"
                      className="fill-star-white text-xs font-medium pointer-events-none"
                      opacity={shouldDim ? 0.4 : 1}
                    >
                      {skill.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Skill Details Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                className="holographic-border max-w-md w-full bg-cosmic-blue/90 backdrop-blur-space p-6 rounded-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: categoryColors[selectedSkill.category] }}
                  >
                    <selectedSkill.icon className="text-white w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-star-white font-['Space_Grotesk'] mb-1">
                      {selectedSkill.label}
                    </h3>
                    <p className="text-asteroid-gray text-sm mb-2">
                      {categoryLabels[selectedSkill.category]}
                    </p>
                    <div className="flex items-center gap-1 mb-2">
                      {renderProficiencyStars(selectedSkill.proficiency)}
                    </div>
                    <p className="text-solar-gold text-sm font-medium">
                      {selectedSkill.experience} experience
                    </p>
                  </div>
                </div>
                
                <p className="text-star-white mb-4">
                  {selectedSkill.description}
                </p>
                
                {selectedSkill.connections.length > 0 && (
                  <div>
                    <h4 className="text-star-white font-semibold mb-2">Connected Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.connections.map(connId => {
                        const connectedSkill = getSkillById(connId);
                        if (!connectedSkill) return null;
                        return (
                          <span
                            key={connId}
                            className="px-2 py-1 bg-stellar-purple/20 text-stellar-purple text-xs rounded-full border border-stellar-purple/30"
                          >
                            {connectedSkill.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="mt-6 w-full px-4 py-2 bg-stellar-purple hover:bg-stellar-purple/80 text-star-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interaction Instructions */}
        <motion.p
          className="text-center text-asteroid-gray text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Hover over skills to see connections • Click for detailed information
        </motion.p>
      </div>
    </section>
  );
}
