import { render, screen, act } from '@testing-library/react'
import React from 'react'
import Header from './header'

test('Renders header', () => {
    render(<Header currentRoute={null} />)
    const headerElement = screen.getByTestId('header')
    expect(headerElement).toBeInTheDocument()
})

test('Renders site title', () => {
    render(<Header currentRoute={null} />)
    const titleElement = screen.getByText('SportsStats')
    expect(titleElement).toBeInTheDocument()
})

test('Renders notification bell', () => {
    render(<Header currentRoute={null} />)
    const bellElement = screen.getByTestId('bell')
    expect(bellElement).toBeInTheDocument()
})

test('Renders user icon', () => {
    render(<Header currentRoute={null} />)
    const userElement = screen.getByTestId('user')
    expect(userElement).toBeInTheDocument()
})

test('Renders menu button', () => {
    render(<Header currentRoute={null} />)
    const menuElement = screen.getByTestId('menu')
    expect(menuElement).toBeInTheDocument()
})

test('Renders user menu when profile button clicked', () => {
    render(<Header currentRoute={null} />)
    const userButton = screen.getByTestId('user')
    act(() => {
        userButton.click()
    })
    const userMenu = screen.getByTestId('user-menu')
    expect(userMenu).toBeInTheDocument()
})

test('Renders menu when menu button clicked', () => {
    render(<Header currentRoute={null} />)
    const menuButton = screen.getByTestId('menu')
    act(() => {
        menuButton.click()
    })
    const mainMenu = screen.getByTestId('main-menu')
    expect(mainMenu).toBeInTheDocument()
})
