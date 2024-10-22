import { render, screen } from '@testing-library/react'
import Home from './page'
import React from 'react'

jest.mock('@headlessui/react', () => {
    return {
        Disclosure: ({ children }: { children: React.ReactNode }) => (
            <div>{children}</div>
        ),
        DisclosureButton: ({ children }: { children: React.ReactNode }) => (
            <button>{children}</button>
        ),
        DisclosurePanel: ({ children }: { children: React.ReactNode }) => (
            <div>{children}</div>
        ),
    }
})

test('Renders Main element', () => {
    render(<Home />)
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
})

test('Renders center site title', () => {
    render(<Home />)
    const titleElement = screen.getByText('SportsStats')
    expect(titleElement).toBeInTheDocument()
})

test('Renders site description', () => {
    render(<Home />)
    const descriptionElement = screen.getByText(
        'Welcome to SportsStats, where your sports statistics are a search away.'
    )
    expect(descriptionElement).toBeInTheDocument()
})

test('Renders search input field', () => {
    render(<Home />)
    const searchElement = screen.getByPlaceholderText('Search for a statistic')
    expect(searchElement).toBeInTheDocument()
})

test('Renders search button', () => {
    render(<Home />)
    const searchButton = screen.getByText('Search')
    expect(searchButton).toBeInTheDocument()
})
