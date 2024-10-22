// src/setupTests.ts

// Import custom matchers from jest-dom to test DOM elements
import '@testing-library/jest-dom'

// Optional: Extend Jest's timeout if you have tests that may take longer to run
jest.setTimeout(30000) // Increase timeout if needed

// Mock global objects like window or document if necessary
// Example of mocking window.matchMedia (which may be needed for certain UI libraries)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

// Mock ResizeObserver for tests
class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = ResizeObserver
