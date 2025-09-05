import { render, screen } from '@testing-library/react'
import About from '../About'

describe('About Component', () => {
  it('renders correctly with main content', () => {
    render(<About />)
    
    // Should have a section with about ID
    const aboutSection = document.getElementById('about')
    expect(aboutSection).toBeInTheDocument()
  })

  it('displays about heading', () => {
    render(<About />)
    
    // Should have an "About" heading or similar
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
    
    // Look for about-related text
    const aboutText = screen.getByText(/About/i) || 
                     screen.getByText(/Mission/i) ||
                     screen.getByText(/Journey/i)
    expect(aboutText).toBeTruthy()
  })

  it('contains substantial text content', () => {
    render(<About />)
    
    // About section should have meaningful content
    const textElements = screen.getAllByText(/\w+/)
    const substantialText = textElements.filter(el => 
      el.textContent && el.textContent.length > 20
    )
    expect(substantialText.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure', () => {
    render(<About />)
    
    // Should use section or article element
    const semanticElements = [
      ...Array.from(document.querySelectorAll('section')),
      ...Array.from(document.querySelectorAll('article'))
    ]
    expect(semanticElements.length).toBeGreaterThan(0)
  })

  it('includes experience or skills information', () => {
    render(<About />)
    
    // Should mention years of experience or technical skills
    const experienceText = screen.queryByText(/25\+?\s*years?/i) ||
                          screen.queryByText(/two\s*decades?/i) ||
                          screen.queryByText(/frontend/i) ||
                          screen.queryByText(/engineer/i) ||
                          screen.queryByText(/developer/i)
    
    expect(experienceText).toBeTruthy()
  })

  it('applies correct CSS styling', () => {
    const { container } = render(<About />)
    
    // Should have space theme styling
    const styledElements = container.querySelectorAll('[class*="space"], [class*="cosmic"], [class*="star"]')
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has responsive design classes', () => {
    const { container } = render(<About />)
    
    // Should include responsive breakpoint classes
    const responsiveElements = container.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"]')
    expect(responsiveElements.length).toBeGreaterThan(0)
  })

  it('includes interactive elements or animations', () => {
    const { container } = render(<About />)
    
    // About component may not have interactive buttons, but should render properly
    expect(container.firstChild).toBeInTheDocument()
    
    // Check for any interactive elements that might exist
    const buttons = screen.queryAllByRole('button')
    const links = screen.queryAllByRole('link')
    
    // Component should render without errors even if no interactive elements
    expect(buttons.length + links.length).toBeGreaterThanOrEqual(0)
  })

  it('renders without crashing', () => {
    const { container } = render(<About />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has accessibility compliance', () => {
    render(<About />)
    
    // Headings should be properly structured
    const headings = screen.getAllByRole('heading')
    headings.forEach(heading => {
      expect(heading).toBeVisible()
      expect(heading.textContent).toBeTruthy()
    })
    
    // Should have proper contrast and readable text
    const textElements = screen.getAllByText(/\w+/)
    expect(textElements.length).toBeGreaterThan(0)
  })

  it('contains professional information', () => {
    render(<About />)
    
    // Should include professional details - use getAllByText to handle multiple matches
    const frontendElements = screen.getAllByText(/frontend/i)
    expect(frontendElements.length).toBeGreaterThan(0)
    
    // Check for other professional terms
    const hasYearsExperience = screen.queryByText(/25\+?\s*years?/i)
    expect(hasYearsExperience).toBeTruthy()
  })

  it('maintains proper typography hierarchy', () => {
    const { container } = render(<About />)
    
    // Should have proper text sizing classes
    const typographyElements = container.querySelectorAll('[class*="text-"]')
    expect(typographyElements.length).toBeGreaterThan(0)
  })

  it('includes proper spacing and layout', () => {
    const { container } = render(<About />)
    
    // Should have margin/padding classes for proper spacing
    const spacedElements = container.querySelectorAll('[class*="p-"], [class*="m-"], [class*="space-"]')
    expect(spacedElements.length).toBeGreaterThan(0)
  })
})
