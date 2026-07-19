export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-cosmic-blue/40 border-t border-moon-silver/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-asteroid-gray">
            © {currentYear} Pradhyuman Arora. All rights reserved.
          </p>
          <p className="text-sm text-asteroid-gray/60 mt-2">
            Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  )
}
