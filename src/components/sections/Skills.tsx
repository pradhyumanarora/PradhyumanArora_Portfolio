'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Star, Zap, Code, Palette, Database, Cloud, Cpu, Users } from 'lucide-react';

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
  // Frontend Cluster (Stellar Purple) - Left side, well-spaced
  {
    id: 'react',
    label: 'React',
    category: 'frontend',
    x: 150,
    y: 150,
    connections: ['nextjs', 'typescript'],
    icon: Code,
    description: 'Expert in React ecosystem building complex applications',
    proficiency: 5,
    experience: '2+ years'
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    category: 'frontend',
    x: 250,
    y: 100,
    connections: ['react', 'typescript', 'vercel'],
    icon: Zap,
    description: 'Full-stack React framework specialist with App Router expertise',
    proficiency: 5,
    experience: '2+ years'
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'frontend',
    x: 200,
    y: 200,
    connections: ['react', 'nodejs'],
    icon: Code,
    description: 'Advanced TypeScript developer with strong type system design',
    proficiency: 5,
    experience: '2+ years'
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    category: 'frontend',
    x: 100,
    y: 200,
    connections: ['react'],
    icon: Palette,
    description: 'Expert in utility-first CSS with custom design system creation',
    proficiency: 5,
    experience: '2+ years'
  },

  // Backend Cluster (Nebula Pink) - Right side
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'backend',
    x: 500,
    y: 200,
    connections: ['typescript', 'mongodb', 'postgresql'],
    icon: Database,
    description: 'Full-stack JavaScript runtime with microservices architecture',
    proficiency: 4,
    experience: '7+ years'
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    category: 'backend',
    x: 600,
    y: 150,
    connections: ['nodejs'],
    icon: Database,
    description: 'NoSQL database design and optimization specialist',
    proficiency: 4,
    experience: '5+ years'
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    category: 'backend',
    x: 550,
    y: 280,
    connections: ['nodejs'],
    icon: Database,
    description: 'Relational database expert with complex query optimization',
    proficiency: 4,
    experience: '8+ years'
  },
  {
    id: 'python',
    label: 'Python',
    category: 'backend',
    x: 450,
    y: 180,
    connections: ['ai'],
    icon: Code,
    description: 'Backend development and automation scripting',
    proficiency: 3,
    experience: '4+ years'
  },

  // Tools Cluster (Solar Gold) - Bottom area, spread out
  {
    id: 'git',
    label: 'Git',
    category: 'tools',
    x: 150,
    y: 350,
    connections: ['github'],
    icon: Code,
    description: 'Advanced Git workflows and version control strategies',
    proficiency: 5,
    experience: '15+ years'
  },
  {
    id: 'github',
    label: 'GitHub',
    category: 'tools',
    x: 250,
    y: 380,
    connections: ['git', 'ci-cd', 'vercel'],
    icon: Code,
    description: 'GitHub Actions, project management, and collaboration expert',
    proficiency: 5,
    experience: '10+ years'
  },
  {
    id: 'docker',
    label: 'Docker',
    category: 'tools',
    x: 350,
    y: 400,
    connections: ['kubernetes', 'ci-cd'],
    icon: Cloud,
    description: 'Containerization and development environment optimization',
    proficiency: 4,
    experience: '5+ years'
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes',
    category: 'tools',
    x: 450,
    y: 380,
    connections: ['docker', 'azure'],
    icon: Cloud,
    description: 'Container orchestration and cloud-native deployments',
    proficiency: 3,
    experience: '3+ years'
  },
  {
    id: 'azure',
    label: 'Azure',
    category: 'tools',
    x: 550,
    y: 350,
    connections: ['kubernetes'],
    icon: Cloud,
    description: 'Microsoft Azure cloud infrastructure and AI services',
    proficiency: 4,
    experience: '3+ years'
  },
  {
    id: 'gcp',
    label: 'Google Cloud',
    category: 'tools',
    x: 650,
    y: 380,
    connections: ['kubernetes'],
    icon: Cloud,
    description: 'Google Cloud Platform services and machine learning tools',
    proficiency: 3,
    experience: '2+ years'
  },
  {
    id: 'vercel',
    label: 'Vercel',
    category: 'tools',
    x: 450,
    y: 320,
    connections: ['github', 'ci-cd'],
    icon: Zap,
    description: 'Modern deployment platform with edge computing',
    proficiency: 5,
    experience: '3+ years'
  },
  {
    id: 'ci-cd',
    label: 'CI/CD',
    category: 'tools',
    x: 350,
    y: 320,
    connections: ['github', 'vercel', 'docker'],
    icon: Cpu,
    description: 'Automated testing and deployment pipeline expert',
    proficiency: 4,
    experience: '8+ years'
  },

  // Soft Skills Cluster (Comet Green) - Top area
  {
    id: 'leadership',
    label: 'Leadership',
    category: 'soft',
    x: 600,
    y: 80,
    connections: ['mentoring'],
    icon: Users,
    description: 'Leading engineering teams and driving technical vision',
    proficiency: 5,
    experience: '10+ years'
  },
  {
    id: 'mentoring',
    label: 'Mentoring',
    category: 'soft',
    x: 500,
    y: 50,
    connections: ['leadership', 'communication'],
    icon: Users,
    description: 'Mentored 10+ college students in software development and career growth',
    proficiency: 5,
    experience: '12+ years'
  },
  {
    id: 'communication',
    label: 'Communication',
    category: 'soft',
    x: 400,
    y: 80,
    connections: ['mentoring'],
    icon: Users,
    description: 'Cross-functional collaboration and technical presentations',
    proficiency: 5,
    experience: '15+ years'
  },
  {
    id: 'design',
    label: 'Design Systems',
    category: 'soft',
    x: 300,
    y: 50,
    connections: ['tailwind'],
    icon: Palette,
    description: 'UX/UI collaboration and systematic design thinking',
    proficiency: 4,
    experience: '8+ years'
  },
  {
    id: 'ai',
    label: 'AI Integration',
    category: 'soft',
    x: 450,
    y: 100,
    connections: ['python'],
    icon: Cpu,
    description: 'AI-powered development tools and modern workflows',
    proficiency: 3,
    experience: '2+ years'
  },
  {
    id: 'innovation',
    label: 'Innovation',
    category: 'soft',
    x: 350,
    y: 150,
    connections: ['ai'],
    icon: Star,
    description: 'Driving technical innovation and emerging tech adoption',
    proficiency: 5,
    experience: '15+ years'
  }
];

const categoryColors = {
  frontend: '#6366F1', // Stellar Purple
  backend: '#EC4899',  // Nebula Pink
  tools: '#F59E0B',    // Solar Gold
  soft: '#10B981'      // Comet Green
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & DevOps',
  soft: 'Leadership & Soft Skills'
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
            <h2 className="text-4xl md:text-5xl font-bold text-star-white font-['Orbitron']">
              Skills Constellation
            </h2>
          </div>
          <p className="text-xl text-asteroid-gray max-w-2xl mx-auto">
            An interactive map of technical expertise and leadership skills,
            organized like constellations in the digital cosmos
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
                    opacity={isHighlighted ? 0.8 : 0.3}
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      duration: 2,
                      delay: 0.5 + index * 0.1,
                      ease: "easeInOut"
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

                return (
                  <g key={skill.id}>
                    {/* Node Circle */}
                    <motion.circle
                      cx={skill.x}
                      cy={skill.y}
                      r={isHighlighted ? 24 : 20}
                      fill={categoryColors[skill.category]}
                      opacity={hoveredSkill && !isHighlighted && !isConnectedToHovered ? 0.3 : 1}
                      stroke={isHighlighted ? '#F8FAFC' : 'transparent'}
                      strokeWidth={2}
                      className="cursor-pointer"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.8 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.2 }}
                      onHoverStart={() => setHoveredSkill(skill.id)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      onClick={() => handleSkillClick(skill)}
                    />
                    
                    {/* Pulsing Effect */}
                    {isHighlighted && (
                      <motion.circle
                        cx={skill.x}
                        cy={skill.y}
                        r={24}
                        fill={categoryColors[skill.category]}
                        opacity={0.4}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.5 }}
                        transition={{ 
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    )}

                    {/* Skill Label */}
                    <text
                      x={skill.x}
                      y={skill.y - 28}
                      textAnchor="middle"
                      className="fill-star-white text-xs font-medium"
                      opacity={hoveredSkill && !isHighlighted && !isConnectedToHovered ? 0.5 : 1}
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
                    <h3 className="text-2xl font-bold text-star-white font-['Orbitron'] mb-1">
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
