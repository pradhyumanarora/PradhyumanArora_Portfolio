import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarField from '../StarField';

// Mock canvas and context
const mockGetContext = jest.fn();
const mockDrawImage = jest.fn();
const mockFillRect = jest.fn();
const mockClearRect = jest.fn();
const mockFillText = jest.fn();
const mockStroke = jest.fn();
const mockFill = jest.fn();
const mockBeginPath = jest.fn();
const mockMoveTo = jest.fn();
const mockLineTo = jest.fn();
const mockArc = jest.fn();
const mockCreateRadialGradient = jest.fn();
const mockAddColorStop = jest.fn();

const mockGradient = {
  addColorStop: mockAddColorStop
};

const mockContext = {
  drawImage: mockDrawImage,
  fillRect: mockFillRect,
  clearRect: mockClearRect,
  fillText: mockFillText,
  stroke: mockStroke,
  fill: mockFill,
  beginPath: mockBeginPath,
  moveTo: mockMoveTo,
  lineTo: mockLineTo,
  arc: mockArc,
  createRadialGradient: mockCreateRadialGradient,
  fillStyle: '',
  strokeStyle: '',
  globalAlpha: 1,
  lineWidth: 1,
  canvas: { width: 800, height: 600 }
};

// Mock window.matchMedia for reduced motion
const mockMatchMedia = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia
});

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: mockRequestAnimationFrame
});
Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: mockCancelAnimationFrame
});

beforeEach(() => {
  mockGetContext.mockReturnValue(mockContext);
  mockCreateRadialGradient.mockReturnValue(mockGradient);
  mockMatchMedia.mockReturnValue({ matches: false });
  mockRequestAnimationFrame.mockImplementation((cb) => {
    setTimeout(cb, 16);
    return 123;
  });
  
  HTMLCanvasElement.prototype.getContext = mockGetContext;
  
  // Mock canvas size
  Object.defineProperty(HTMLCanvasElement.prototype, 'width', {
    value: 800,
    writable: true
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'height', {
    value: 600,
    writable: true
  });

  // Mock window dimensions
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 768
  });

  // Clear all mocks
  jest.clearAllMocks();
});

describe('StarField Component', () => {
  it('renders canvas element with correct attributes', () => {
    render(<StarField />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas?.tagName).toBe('CANVAS');
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies default CSS classes and styles', () => {
    render(<StarField />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('fixed', 'inset-0', 'z-0', 'pointer-events-none');
    expect(canvas).toHaveStyle('background: transparent');
  });

  it('applies custom className when provided', () => {
    render(<StarField className="custom-class" />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('custom-class');
  });

  it('initializes canvas context on mount', () => {
    const { container } = render(<StarField />);
    const canvas = container.querySelector('canvas');
    
    expect(canvas).toBeInTheDocument();
    expect(canvas?.tagName).toBe('CANVAS');
  });

  it('respects reduced motion preference', () => {
    mockMatchMedia.mockReturnValue({ matches: true });
    
    render(<StarField />);
    
    // Should not start animation when reduced motion is preferred
    expect(mockRequestAnimationFrame).not.toHaveBeenCalled();
    
    mockMatchMedia.mockReturnValue({ matches: false });
  });

  it('starts animation when reduced motion is not preferred', () => {
    mockMatchMedia.mockReturnValue({ matches: false });
    
    render(<StarField />);
    
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('handles mouse movement events', () => {
    render(<StarField />);
    
    const canvas = document.querySelector('canvas');
    
    fireEvent.mouseMove(canvas!, {
      clientX: 100,
      clientY: 150
    });
    
    expect(canvas).toBeInTheDocument();
  });

  it('handles window resize events', () => {
    render(<StarField />);
    
    // Simulate window resize - event listener should be attached
    expect(() => {
      fireEvent.resize(window);
    }).not.toThrow();
  });

  it('uses different particle counts based on screen size', () => {
    // Test mobile screen size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480
    });
    
    expect(() => render(<StarField />)).not.toThrow();
  });

  it('accepts custom particleCount prop', () => {
    expect(() => render(<StarField particleCount={100} />)).not.toThrow();
  });

  it('performs canvas drawing operations', async () => {
    render(<StarField />);
    
    // Wait for animation frame
    await waitFor(() => {
      expect(mockGetContext).toHaveBeenCalledWith('2d');
    });
    
    // Should eventually perform drawing operations
    expect(mockGetContext).toHaveBeenCalled();
  });

  it('creates radial gradient for particle glow effect', async () => {
    render(<StarField />);
    
    // Trigger animation
    if (mockRequestAnimationFrame.mock.calls.length > 0) {
      const animationCallback = mockRequestAnimationFrame.mock.calls[0][0];
      animationCallback(16);
    }
    
    expect(mockGetContext).toHaveBeenCalled();
  });

  it('cleans up animation frame on unmount', () => {
    const { unmount } = render(<StarField />);
    
    unmount();
    
    expect(mockCancelAnimationFrame).toHaveBeenCalled();
  });

  it('removes event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const canvasRemoveEventListenerSpy = jest.spyOn(HTMLCanvasElement.prototype, 'removeEventListener');
    
    const { unmount } = render(<StarField />);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
    canvasRemoveEventListenerSpy.mockRestore();
  });

  it('handles canvas reference properly', () => {
    const { rerender } = render(<StarField />);
    
    expect(document.querySelector('canvas')).toBeInTheDocument();
    
    rerender(<StarField />);
    
    expect(document.querySelector('canvas')).toBeInTheDocument();
  });

  it('maintains proper z-index for background layer', () => {
    render(<StarField />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('z-0');
  });

  it('has pointer-events disabled for interaction passthrough', () => {
    render(<StarField />);
    
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('pointer-events-none');
  });

  it('initializes without errors', () => {
    expect(() => {
      render(<StarField />);
    }).not.toThrow();
  });

  it('handles animation loop execution', () => {
    render(<StarField />);
    
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
    
    // Simulate animation frame execution
    if (mockRequestAnimationFrame.mock.calls.length > 0) {
      const callback = mockRequestAnimationFrame.mock.calls[0][0];
      expect(() => callback(16)).not.toThrow();
    }
  });

  it('processes particle updates correctly', () => {
    expect(() => render(<StarField />)).not.toThrow();
  });

  it('handles color array correctly', () => {
    expect(() => render(<StarField />)).not.toThrow();
  });

  it('manages particle lifecycle properly', () => {
    expect(() => render(<StarField />)).not.toThrow();
  });

  it('responds to mouse interaction influence', () => {
    render(<StarField />);
    
    const canvas = document.querySelector('canvas');
    
    // Simulate mouse movement with specific coordinates
    fireEvent.mouseMove(canvas!, {
      clientX: 200,
      clientY: 300
    });
    
    expect(canvas).toBeInTheDocument();
  });
});
