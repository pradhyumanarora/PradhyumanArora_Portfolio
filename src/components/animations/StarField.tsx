'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  prevX: number
  prevY: number
  size: number
  opacity: number
  color: string
}

interface StarFieldProps {
  particleCount?: number
  className?: string
}

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981']

export default function StarField({ particleCount, className = '' }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const dimensionsRef = useRef({ width: 0, height: 0 })

  const createParticles = useCallback((count: number, width: number, height: number): Particle[] => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1000,
      prevX: 0,
      prevY: 0,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }))
  }, [])

  const updateParticles = useCallback((particles: Particle[], width: number, height: number, deltaTime: number) => {
    const speed = 0.5
    const mouseInfluence = 0.0001

    particles.forEach(particle => {
      // Store previous position for trail effect
      particle.prevX = particle.x
      particle.prevY = particle.y

      // Move particle
      particle.z -= speed * deltaTime
      
      // Mouse interaction - subtle parallax effect
      const mouseDistanceX = (mouseRef.current.x - width / 2) * mouseInfluence * (1000 - particle.z)
      const mouseDistanceY = (mouseRef.current.y - height / 2) * mouseInfluence * (1000 - particle.z)
      
      particle.x += mouseDistanceX
      particle.y += mouseDistanceY

      // Reset particle if it goes off screen or too close
      if (particle.z <= 0 || particle.x < -50 || particle.x > width + 50 || particle.y < -50 || particle.y > height + 50) {
        particle.x = Math.random() * width
        particle.y = Math.random() * height
        particle.z = 1000
        particle.size = Math.random() * 2 + 1
        particle.opacity = Math.random() * 0.8 + 0.2
        particle.color = COLORS[Math.floor(Math.random() * COLORS.length)]
      }
    })
  }, [])

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    particles.forEach(particle => {
      const scale = (1000 - particle.z) / 1000
      const x = particle.x
      const y = particle.y
      const size = particle.size * scale
      const opacity = particle.opacity * scale

      if (scale > 0.1) {
        // Draw particle glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3)
        gradient.addColorStop(0, `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw particle core
        ctx.fillStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Draw motion trail for faster particles
        if (scale > 0.5) {
          ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 0.3 * 255).toString(16).padStart(2, '0')}`
          ctx.lineWidth = size * 0.5
          ctx.beginPath()
          ctx.moveTo(particle.prevX, particle.prevY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      }
    })
  }, [])

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { width, height } = dimensionsRef.current
    
    // Clear canvas with slight trailing effect for motion blur
    ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
    ctx.fillRect(0, 0, width, height)

    // Update and draw particles
    updateParticles(particlesRef.current, width, height, 16.67) // ~60fps
    drawParticles(ctx, particlesRef.current)

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [updateParticles, drawParticles])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }, [])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { innerWidth, innerHeight } = window
    canvas.width = innerWidth
    canvas.height = innerHeight
    
    dimensionsRef.current = { width: innerWidth, height: innerHeight }

    // Recreate particles for new dimensions
    const count = particleCount || (innerWidth < 768 ? 200 : 500)
    particlesRef.current = createParticles(count, innerWidth, innerHeight)
  }, [particleCount, createParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Initialize
    handleResize()
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate)

    // Event listeners
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [animate, handleResize, handleMouseMove])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  )
}
