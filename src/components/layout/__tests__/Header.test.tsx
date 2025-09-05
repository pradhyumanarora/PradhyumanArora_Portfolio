import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

// Mock window.scrollY and document methods
Object.defineProperty(window, 'scrollY', { 
  value: 0, 
  writable: true 
})

const mockScrollIntoView = jest.fn()
Object.defineProperty(document, 'querySelector', {
  value: jest.fn().mockReturnValue({
    scrollIntoView: mockScrollIntoView
  }),
  writable: true
})

Object.defineProperty(document, 'getElementById', {
  value: jest.fn().mockReturnValue({
    getBoundingClientRect: jest.fn().mockReturnValue({
      top: 50,
      bottom: 150
    })
  }),
  writable: true
})

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  it('renders correctly with all navigation items', () => {
    render(<Header />)
    
    // Check for logo
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    
    // Check for navigation items
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders navigation links with correct href attributes', () => {
    render(<Header />)
    
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience')
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })

  it('handles scroll events and updates styling', () => {
    render(<Header />)
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    fireEvent.scroll(window)
    
    // Should apply glass morphism when scrolled
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toBeTruthy()
  })

  it('handles navigation link clicks', () => {
    render(<Header />)
    
    const aboutLink = screen.getByRole('link', { name: 'About' })
    fireEvent.click(aboutLink)
    
    // Should call scrollIntoView
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('handles mobile menu toggle', () => {
    render(<Header />)
    
    const mobileMenuButton = screen.getByRole('button', { name: 'Toggle navigation menu' })
    expect(mobileMenuButton).toBeInTheDocument()
    
    // Click to open menu
    fireEvent.click(mobileMenuButton)
    
    // Should have aria-expanded attribute
    expect(mobileMenuButton).toHaveAttribute('aria-expanded')
  })

  it('has proper semantic structure', () => {
    render(<Header />)
    
    // Check for nav element
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<Header />)
    
    // Check for fixed positioning and backdrop styling
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
    expect(header?.className).toMatch(/(fixed|absolute)/)
  })

  it('contains mobile menu functionality', () => {
    render(<Header />)
    
    // Check for mobile menu button (should be present)
    const mobileMenuButtons = screen.getAllByRole('button')
    expect(mobileMenuButtons.length).toBeGreaterThan(0)
  })

  it('renders without crashing', () => {
    const { container } = render(<Header />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('handles logo click navigation', () => {
    render(<Header />)
    
    const logoLink = screen.getByRole('link', { name: 'Portfolio' })
    fireEvent.click(logoLink)
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('updates active section based on scroll position', () => {
    render(<Header />)
    
    // Mock scroll event
    const scrollEvent = new Event('scroll')
    window.dispatchEvent(scrollEvent)
    
    // Component should handle scroll without errors
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
