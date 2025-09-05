import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import StarField from '@/components/animations/StarField'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Animated background */}
      <StarField />
      
      {/* Navigation */}
      <Header />
      
      {/* Main content */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
