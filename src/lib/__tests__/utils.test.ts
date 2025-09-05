import { cn, formatDate, calculateYearsExperience, debounce, throttle } from '../utils'

// Mock timers for debounce and throttle tests
jest.useFakeTimers()

describe('Utils', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
  })

  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-white', 'bg-blue-500')
      expect(result).toBe('text-white bg-blue-500')
    })

    it('should handle undefined and null values', () => {
      const result = cn('text-white', undefined, null, 'bg-blue-500')
      expect(result).toBe('text-white bg-blue-500')
    })

    it('should handle conditional class names', () => {
      const isActive = true
      const result = cn('text-white', isActive && 'bg-blue-500')
      expect(result).toBe('text-white bg-blue-500')
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle arrays of class names', () => {
      const result = cn(['text-white', 'bg-blue-500'])
      expect(result).toBe('text-white bg-blue-500')
    })

    it('should handle boolean conditions in objects', () => {
      const result = cn('base', { 'active': true, 'disabled': false })
      expect(result).toContain('base')
      expect(result).toContain('active')
      expect(result).not.toContain('disabled')
    })

    it('should merge conflicting Tailwind classes', () => {
      // twMerge should handle conflicting classes
      const result = cn('p-2 m-4', 'p-4 text-red-500')
      expect(result).toContain('p-4')
      expect(result).toContain('m-4')
      expect(result).toContain('text-red-500')
      // p-2 should be replaced by p-4
      expect(result).not.toMatch(/p-2(?!\d)/)
    })

    it('should handle complex mixed arguments', () => {
      const condition = true
      const result = cn(
        'base-class',
        condition && 'conditional-class',
        ['array-class1', 'array-class2'],
        {
          'object-active': true,
          'object-disabled': false
        },
        undefined,
        null,
        'final-class'
      )
      
      expect(result).toContain('base-class')
      expect(result).toContain('conditional-class')
      expect(result).toContain('array-class1')
      expect(result).toContain('array-class2')
      expect(result).toContain('object-active')
      expect(result).toContain('final-class')
      expect(result).not.toContain('object-disabled')
    })

    it('should handle nested arrays and objects', () => {
      const result = cn(
        'base',
        [
          'nested-array-class',
          {
            'nested-object-active': true,
            'nested-object-inactive': false
          }
        ]
      )
      
      expect(result).toContain('base')
      expect(result).toContain('nested-array-class')
      expect(result).toContain('nested-object-active')
      expect(result).not.toContain('nested-object-inactive')
    })

    it('should handle space theme classes', () => {
      const result = cn(
        'text-star-white',
        'bg-deep-space',
        'border-stellar-purple'
      )
      
      expect(result).toBe('text-star-white bg-deep-space border-stellar-purple')
    })

    it('should work with responsive classes', () => {
      const result = cn(
        'text-sm',
        'sm:text-base',
        'md:text-lg',
        'lg:text-xl'
      )
      
      expect(result).toContain('text-sm')
      expect(result).toContain('sm:text-base')
      expect(result).toContain('md:text-lg')
      expect(result).toContain('lg:text-xl')
    })

    it('should handle hover and state classes', () => {
      const result = cn(
        'hover:bg-stellar-purple',
        'focus:ring-2',
        'active:scale-95',
        'disabled:opacity-50'
      )
      
      expect(result).toContain('hover:bg-stellar-purple')
      expect(result).toContain('focus:ring-2')
      expect(result).toContain('active:scale-95')
      expect(result).toContain('disabled:opacity-50')
    })

    it('should handle function return', () => {
      const getClasses = () => 'dynamic-class'
      const result = cn('base', getClasses())
      
      expect(result).toContain('base')
      expect(result).toContain('dynamic-class')
    })

    it('should be performant with many classes', () => {
      const manyClasses = Array.from({ length: 50 }, (_, i) => `class-${i}`)
      const start = performance.now()
      const result = cn(...manyClasses)
      const end = performance.now()
      
      expect(end - start).toBeLessThan(10) // Should complete in less than 10ms
      expect(result).toContain('class-0')
      expect(result).toContain('class-49')
    })
  })

  describe('formatDate function', () => {
    it('should format date correctly', () => {
      const result = formatDate('2023-12-15')
      expect(result).toBe('December 2023')
    })

    it('should handle different date formats', () => {
      const result = formatDate('2023-01-01')
      expect(result).toBe('January 2023')
    })

    it('should handle invalid dates gracefully', () => {
      const result = formatDate('invalid-date')
      expect(result).toBe('Invalid Date')
    })

    it('should format dates from different years', () => {
      const result = formatDate('2022-06-15')
      expect(result).toBe('June 2022')
    })

    it('should handle all months correctly', () => {
      const months = [
        { date: '2023-01-01', expected: 'January 2023' },
        { date: '2023-02-01', expected: 'February 2023' },
        { date: '2023-03-01', expected: 'March 2023' },
        { date: '2023-04-01', expected: 'April 2023' },
        { date: '2023-05-01', expected: 'May 2023' },
        { date: '2023-06-01', expected: 'June 2023' },
        { date: '2023-07-01', expected: 'July 2023' },
        { date: '2023-08-01', expected: 'August 2023' },
        { date: '2023-09-01', expected: 'September 2023' },
        { date: '2023-10-01', expected: 'October 2023' },
        { date: '2023-11-01', expected: 'November 2023' },
        { date: '2023-12-01', expected: 'December 2023' }
      ]
      
      months.forEach(({ date, expected }) => {
        expect(formatDate(date)).toBe(expected)
      })
    })

    it('should handle edge case dates', () => {
      expect(formatDate('2000-01-01')).toBe('January 2000')
      expect(formatDate('1999-12-31')).toBe('December 1999')
    })
  })

  describe('calculateYearsExperience function', () => {
    it('should calculate years correctly for different dates', () => {
      // Test with current year assumption - dynamic test based on actual current date
      const currentYear = new Date().getFullYear()
      
      const result2020 = calculateYearsExperience('2020-01-01')
      expect(result2020).toBe(currentYear - 2020)
      
      const result2023 = calculateYearsExperience('2023-06-15')
      expect(result2023).toBe(currentYear - 2023)
    })

    it('should handle same year as current', () => {
      const currentYear = new Date().getFullYear()
      const result = calculateYearsExperience(`${currentYear}-01-01`)
      expect(result).toBe(0)
    })

    it('should handle far past dates', () => {
      const currentYear = new Date().getFullYear()
      const result = calculateYearsExperience('1999-01-01')
      expect(result).toBe(currentYear - 1999)
    })

    it('should handle partial year correctly', () => {
      const currentYear = new Date().getFullYear()
      const lastYear = currentYear - 1
      const result = calculateYearsExperience(`${lastYear}-12-31`)
      expect(result).toBe(1)
    })
  })

  describe('debounce function', () => {
    it('should debounce function calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      // Should not be called immediately
      expect(mockFn).not.toHaveBeenCalled()

      // Fast-forward time
      jest.advanceTimersByTime(100)

      // Should be called once after delay
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should pass arguments to debounced function', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('arg1', 'arg2')
      jest.advanceTimersByTime(100)

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })

    it('should cancel previous timeouts', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn()
      jest.advanceTimersByTime(50)
      debouncedFn() // This should cancel the previous timeout

      jest.advanceTimersByTime(50) // Only 50ms more, not 100ms total
      expect(mockFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(50) // Now 100ms from second call
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should work with zero delay', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 0)

      debouncedFn()
      jest.advanceTimersByTime(0)

      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle function', () => {
    it('should throttle function calls', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn()
      throttledFn()
      throttledFn()

      // Should be called immediately once
      expect(mockFn).toHaveBeenCalledTimes(1)

      // Fast-forward time
      jest.advanceTimersByTime(100)

      // Should be able to call again
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    it('should pass arguments to throttled function', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn('arg1', 'arg2')

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })

    it('should ignore calls during throttle period', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(1)

      // These calls should be ignored
      throttledFn()
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(1)

      // After throttle period
      jest.advanceTimersByTime(100)
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    it('should work with zero limit', () => {
      const mockFn = jest.fn()
      const throttledFn = throttle(mockFn, 0)

      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(1)

      jest.advanceTimersByTime(0)
      throttledFn()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })
  })
})
