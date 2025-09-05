'use client'

import { motion } from 'framer-motion'

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-cosmic-blue/20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-star-white mb-6">
            Mission Timeline
          </h2>
          <p className="text-lg text-asteroid-gray max-w-3xl mx-auto">
            A chronological journey through space missions (career positions)
            that shaped my expertise in frontend engineering.
          </p>
        </motion.div>
        
        <div className="glass-morphism rounded-2xl p-8">
          <p className="text-asteroid-gray text-center">
            🚧 Interactive timeline under construction - 25+ years of missions coming soon!
          </p>
        </div>
      </div>
    </section>
  )
}
