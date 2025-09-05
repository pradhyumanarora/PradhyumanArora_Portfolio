import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer Component', () => {
  it('renders correctly with all required elements', () => {
    render(<Footer />)
    
    // Check for copyright text
    expect(screen.getByText(/© \d{4}/)).toBeInTheDocument()
    
    // Check for portfolio title/name
    expect(screen.getByText(/Space Portfolio|Portfolio/)).toBeInTheDocument()
  })

  it('displays current year in copyright', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    const { container } = render(<Footer />)
    
    // Check for footer element
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<Footer />)
    
    // Check for background styling - updated to match actual component
    const footerElement = container.querySelector('footer')
    expect(footerElement).toHaveClass('bg-cosmic-blue/40')
  })

  it('contains social links if present', () => {
    render(<Footer />)
    
    // Check for any social media links (may not be present in basic footer)
    const links = screen.queryAllByRole('link')
    
    // Social links should have proper attributes if they exist
    links.forEach(link => {
      if (link.getAttribute('target') === '_blank') {
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
      }
    })
  })

  it('has accessibility features', () => {
    render(<Footer />)
    
    // Footer should be accessible
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = render(<Footer />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('contains appropriate text content', () => {
    render(<Footer />)
    
    // Should contain some meaningful text
    const textContent = screen.getByRole('contentinfo').textContent
    expect(textContent).toBeTruthy()
    expect(textContent!.length).toBeGreaterThan(10) // Should have substantial content
  })

  it('applies consistent spacing and layout classes', () => {
    const { container } = render(<Footer />)
    
    const footer = container.querySelector('footer')
    // Should have padding/spacing classes
    expect(footer?.className).toMatch(/p[xy]?-\d+/)
  })

  it('maintains space theme consistency', () => {
    const { container } = render(<Footer />)
    
    const footer = container.querySelector('footer')
    // Should have space-themed colors - updated to match actual classes
    expect(footer?.className).toMatch(/(cosmic-blue|border-moon-silver|asteroid-gray)/)
  })
})
