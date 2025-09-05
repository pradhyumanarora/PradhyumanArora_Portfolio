'use client'

import { motion } from 'framer-motion'

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-star-white mb-6">
            Skills Constellation
          </h2>
          <p className="text-lg text-asteroid-gray max-w-3xl mx-auto">
            An interactive constellation mapping my technical expertise
            across the frontend universe.
          </p>
        </motion.div>
        
        <div className="glass-morphism rounded-2xl p-8">
          <p className="text-asteroid-gray text-center">
            🚧 Interactive constellation under construction - stellar skills mapping coming soon!
          </p>
        </div>
      </div>
    </section>
  )
}
