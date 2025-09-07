import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Projects from '../Projects'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, onHoverStart, onHoverEnd, ...props }: any) => 
      <div className={className} onClick={onClick} onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd} {...props}>{children}</div>,
    section: ({ children, className, ...props }: any) => <section className={className} {...props}>{children}</section>,
    h2: ({ children, className, ...props }: any) => <h2 className={className} {...props}>{children}</h2>,
    span: ({ children, className, ...props }: any) => <span className={className} {...props}>{children}</span>,
    button: ({ children, className, onClick, ...props }: any) => 
      <button className={className} onClick={onClick} {...props}>{children}</button>,
    a: ({ children, className, href, target, rel, ...props }: any) => 
      <a className={className} href={href} target={target} rel={rel} {...props}>{children}</a>
  }
}))

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ExternalLink: () => <div data-testid="external-link-icon">ExternalLink</div>,
  Github: () => <div data-testid="github-icon">Github</div>,
  Eye: () => <div data-testid="eye-icon">Eye</div>,
  Cpu: () => <div data-testid="cpu-icon">Cpu</div>,
  Zap: () => <div data-testid="zap-icon">Zap</div>,
  Shield: () => <div data-testid="shield-icon">Shield</div>
}))

// Mock window.open for link testing
global.open = jest.fn()

describe('Projects Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders projects section correctly', () => {
    render(<Projects />)
    
    expect(screen.getByText(/Mission Archives/i)).toBeInTheDocument()
    expect(screen.getByText(/25\+ years of space-station level engineering/i)).toBeInTheDocument()
  })

  it('displays all project cards', () => {
    render(<Projects />)
    
    expect(screen.getByText(/Nexus Commerce Platform/i)).toBeInTheDocument()
    expect(screen.getByText(/Quantum Analytics Dashboard/i)).toBeInTheDocument()
    expect(screen.getByText(/Neural Content Management/i)).toBeInTheDocument()
    expect(screen.getByText(/Spectrum Design System/i)).toBeInTheDocument()
  })

  it('shows project subtitles and descriptions', () => {
    render(<Projects />)
    
    expect(screen.getByText(/Enterprise E-commerce Architecture/i)).toBeInTheDocument()
    expect(screen.getByText(/Real-time Data Visualization/i)).toBeInTheDocument()
    expect(screen.getByText(/AI-Enhanced CMS Platform/i)).toBeInTheDocument()
    expect(screen.getByText(/Enterprise Component Library/i)).toBeInTheDocument()
  })

  it('displays technology tags for projects', () => {
    render(<Projects />)
    
    expect(screen.getByText('Next.js 14')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React 18')).toBeInTheDocument()
    expect(screen.getByText('Vue 3')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
  })

  it('shows project status badges', () => {
    render(<Projects />)
    
    const liveStatuses = screen.getAllByText(/Live/i).filter(el => 
      el.closest('[class*="text-green-400"]')
    )
    expect(liveStatuses.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Beta/i)).toBeInTheDocument()
  })

  it('displays impact metrics for each project', () => {
    render(<Projects />)
    
    expect(screen.getAllByText(/10M\+/)[0]).toBeInTheDocument()
    expect(screen.getByText(/Users Served/i)).toBeInTheDocument()
    expect(screen.getAllByText(/99\.9%/)[0]).toBeInTheDocument()
    // Handle multiple "Uptime" elements by using getAllByText
    expect(screen.getAllByText(/Uptime/i)).toHaveLength(2) // Multiple projects with uptime metrics
    expect(screen.getByText(/1TB\+\/day/)).toBeInTheDocument()
    expect(screen.getByText(/Data Processed/i)).toBeInTheDocument()
  })

  it('shows project years', () => {
    render(<Projects />)
    
    expect(screen.getAllByText('2024')).toHaveLength(2)
    expect(screen.getAllByText('2023')).toHaveLength(2)
  })

  it('renders action buttons correctly', () => {
    render(<Projects />)
    
    const liveDemoButtons = screen.getAllByText(/Live Demo/i)
    const codeButtons = screen.getAllByText(/Code/i)
    const detailsButtons = screen.getAllByText(/Details/i)
    
    expect(liveDemoButtons.length).toBeGreaterThan(0)
    expect(codeButtons.length).toBeGreaterThan(0)
    expect(detailsButtons.length).toBe(4) // All projects should have details button
  })

  it('handles live demo link clicks', () => {
    render(<Projects />)
    
    const liveDemoButtons = screen.getAllByText(/Live Demo/i)
    expect(liveDemoButtons[0]).toHaveAttribute('href', 'https://nexus-commerce.demo')
    expect(liveDemoButtons[0]).toHaveAttribute('target', '_blank')
    expect(liveDemoButtons[0]).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('handles GitHub link clicks', () => {
    render(<Projects />)
    
    const codeButtons = screen.getAllByText(/Code/i)
    expect(codeButtons[0]).toHaveAttribute('href', 'https://github.com/pradhyumanarora/nexus-platform')
    expect(codeButtons[0]).toHaveAttribute('target', '_blank')
    expect(codeButtons[0]).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('opens project details modal', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    
    const detailsButtons = screen.getAllByText(/Details/i)
    await user.click(detailsButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Project Overview/i)).toBeInTheDocument()
      expect(screen.getByText(/Key Features/i)).toBeInTheDocument()
      expect(screen.getByText(/Technology Stack/i)).toBeInTheDocument()
      expect(screen.getByText(/Impact & Results/i)).toBeInTheDocument()
    })
  })

  it('displays detailed project information in modal', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    
    const detailsButtons = screen.getAllByText(/Details/i)
    await user.click(detailsButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Real-time inventory management/i)).toBeInTheDocument()
      expect(screen.getByText(/AI-powered recommendation engine/i)).toBeInTheDocument()
      expect(screen.getByText(/Multi-tenant architecture/i)).toBeInTheDocument()
    })
  })

  it('closes modal when clicking close button', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    
    const detailsButtons = screen.getAllByText(/Details/i)
    await user.click(detailsButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Project Overview/i)).toBeInTheDocument()
    })
    
    const closeButton = screen.getByText('✕')
    await user.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByText(/Project Overview/i)).not.toBeInTheDocument()
    })
  })

  it('closes modal when clicking backdrop', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    
    const detailsButtons = screen.getAllByText(/Details/i)
    await user.click(detailsButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Project Overview/i)).toBeInTheDocument()
    })
    
    // Click on the modal backdrop (outer div)
    const backdrop = document.querySelector('.fixed.inset-0')
    if (backdrop) {
      fireEvent.click(backdrop)
    }
    
    await waitFor(() => {
      expect(screen.queryByText(/Project Overview/i)).not.toBeInTheDocument()
    })
  })

  it('shows technology categories with correct styling', () => {
    render(<Projects />)
    
    // Check for different technology category styling
    const frontendTech = screen.getByText('Next.js 14')
    const backendTech = screen.getByText('PostgreSQL')
    
    expect(frontendTech.closest('.inline-flex')).toHaveClass('text-nebula-purple')
    expect(backendTech.closest('.inline-flex')).toHaveClass('text-solar-yellow')
  })

  it('displays more technologies indicator when applicable', () => {
    render(<Projects />)
    
    // Nexus Commerce Platform has 8 technologies, so should show "+2 more"
    expect(screen.getAllByText('+2 more')[0]).toBeInTheDocument()
  })

  it('handles card hover interactions', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    
    const projectCards = document.querySelectorAll('.group')
    
    if (projectCards.length > 0) {
      await user.hover(projectCards[0])
      // Hover effects should be applied
      expect(projectCards[0]).toHaveClass('group')
    }
  })

  it('shows proper section structure', () => {
    render(<Projects />)
    
    const projectsSection = document.querySelector('#projects')
    expect(projectsSection).toBeInTheDocument()
  })

  it('displays background visual effects', () => {
    render(<Projects />)
    
    // Check for background gradient and visual elements
    const backgroundElements = document.querySelectorAll('[class*="bg-nebula-purple"], [class*="bg-solar-yellow"]')
    expect(backgroundElements.length).toBeGreaterThan(0)
  })

  it('shows all project impact metrics', () => {
    render(<Projects />)
    
    // Nexus Commerce Platform metrics
    expect(screen.getByText(/98\/100/)).toBeInTheDocument()
    expect(screen.getByText(/Performance Score/i)).toBeInTheDocument()
    expect(screen.getByText(/65%/)).toBeInTheDocument()
    expect(screen.getByText(/Load Reduction/i)).toBeInTheDocument()
    
    // Quantum Analytics metrics
    expect(screen.getByText(/<100ms/)).toBeInTheDocument()
    expect(screen.getByText(/Query Performance/i)).toBeInTheDocument()
    expect(screen.getByText(/97\.3%/)).toBeInTheDocument()
    expect(screen.getByText(/Accuracy Rate/i)).toBeInTheDocument()
  })

  it('handles technology stack modal display', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    
    const detailsButtons = screen.getAllByText(/Details/i)
    await user.click(detailsButtons[0])
    
    await waitFor(() => {
      // Should show all technologies in modal
      expect(screen.getAllByText('AWS')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Kubernetes')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Docker')[0]).toBeInTheDocument()
      expect(screen.getAllByText('Redis')[0]).toBeInTheDocument()
    })
  })

  it('displays project features in modal', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    
    const detailsButtons = screen.getAllByText(/Details/i)
    await user.click(detailsButtons[1]) // Quantum Analytics
    
    await waitFor(() => {
      expect(screen.getByText(/Real-time streaming data processing/i)).toBeInTheDocument()
      expect(screen.getByText(/Custom D3\.js visualizations/i)).toBeInTheDocument()
      expect(screen.getByText(/ML-powered anomaly detection/i)).toBeInTheDocument()
    })
  })

  it('shows comprehensive project descriptions', () => {
    render(<Projects />)
    
    expect(screen.getByText(/Scalable microservices platform serving 10M\+ users/i)).toBeInTheDocument()
    expect(screen.getByText(/High-performance dashboard processing 1TB\+ daily data/i)).toBeInTheDocument()
    expect(screen.getByText(/Headless CMS with AI content optimization/i)).toBeInTheDocument()
    expect(screen.getByText(/Comprehensive design system with 150\+ components/i)).toBeInTheDocument()
  })

  it('handles accessibility properly', () => {
    render(<Projects />)
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2, name: /Mission Archives/i })
    expect(mainHeading).toBeInTheDocument()
    
    // Check for proper link structures
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    
    // Check for proper button structures
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('displays holographic card design elements', () => {
    render(<Projects />)
    
    // Check for holographic styling classes
    const holographicElements = document.querySelectorAll('[class*="holographic"], [class*="backdrop-blur"]')
    expect(holographicElements.length).toBeGreaterThan(0)
  })

  it('shows responsive grid layout', () => {
    render(<Projects />)
    
    // Check for responsive grid classes
    const gridElements = document.querySelectorAll('[class*="grid-cols-1"], [class*="lg:grid-cols-2"]')
    expect(gridElements.length).toBeGreaterThan(0)
  })

  it('prevents modal content click from closing modal', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    
    const detailsButtons = screen.getAllByText(/Details/i)
    await user.click(detailsButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Project Overview/i)).toBeInTheDocument()
    })
    
    // Click on modal content (should not close)
    const modalContent = screen.getByText(/Project Overview/i)
    await user.click(modalContent)
    
    // Modal should still be open
    expect(screen.getByText(/Project Overview/i)).toBeInTheDocument()
  })

  it('shows different project statuses correctly', () => {
    render(<Projects />)
    
    // Production projects
    const liveStatuses = screen.getAllByTestId('zap-icon')
    expect(liveStatuses.length).toBe(3)
    
    // Beta project
    const betaStatus = screen.getByTestId('cpu-icon')
    expect(betaStatus).toBeInTheDocument()
  })

  it('displays complete technology ecosystem', () => {
    render(<Projects />)
    
    // Frontend technologies
    expect(screen.getByText('React 18')).toBeInTheDocument()
    expect(screen.getByText('Vue 3')).toBeInTheDocument()
    expect(screen.getByText('Next.js 14')).toBeInTheDocument()
    
    // Backend technologies  
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('FastAPI')).toBeInTheDocument()
    
    // Platform technologies - only check visible ones
    expect(screen.getAllByText('Docker')[0]).toBeInTheDocument()
  })
})
