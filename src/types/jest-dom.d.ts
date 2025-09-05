import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(...classNames: string[]): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveAccessibleName(name?: string): R
      toHaveAccessibleDescription(description?: string): R
    }
  }
}

export {}
