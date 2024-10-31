import { act, render, screen } from '@testing-library/react'
import React from 'react'
import Header from './header'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { appContext, AppProvider } from './app'

const email = 'testing@gmail.com'
const password = 'testing'
const wrongPassword = 'test'

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}

beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    })
})

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

test('User state information is displayed in the user menu - not logged in', () => {
    render(<Header currentRoute={null} />)
    const userButton = screen.getByTestId('user')
    act(() => {
        userButton.click()
    })
    const userState = screen.getByText('Sign In')
    expect(userState).toBeInTheDocument()
})

test('User state information is displayed in the user menu - logged in', () => {
    render(<Header currentRoute={null} />)
    const userButton = screen.getByTestId('user')
    act(() => {
        userButton.click()
    })
    const userState = screen.getByText('Sign In')
    expect(userState).toBeInTheDocument()
})

test('User menu has a sign in button when not logged in', () => {
    render(<Header currentRoute={null} />)
    const userButton = screen.getByTestId('user')
    act(() => {
        userButton.click()
    })
    const signinButton = screen.getByTestId('signin-button')
    expect(signinButton).toBeInTheDocument()
})

test('User menu has a sign out button when logged in', () => {
    const session: CognitoUserSession = {
        getIdToken: jest.fn(),
        getAccessToken: jest.fn(),
        getRefreshToken: jest.fn(),
        isValid: jest.fn(),
    }
    const user = {
        email: email,
        firstName: 'Test',
        lastName: 'User',
    }

    const { container } = render(
        <AppProvider>
            <appContext.Consumer>
                {(value) => {
                    act(() => {
                        value.setLocalSession(session)
                        value.setLocalUser(user)
                    })
                    return <Header currentRoute={null} />
                }}
            </appContext.Consumer>
        </AppProvider>
    )
    const userButton = screen.getByTestId('user')
    act(() => {
        userButton.click()
    })
    const signoutButton = screen.getByTestId('signout-button')
    expect(signoutButton).toBeInTheDocument()
})

test('handleSignOut function is called when sign out button is clicked', () => {
    const session: CognitoUserSession = {
        getIdToken: jest.fn(),
        getAccessToken: jest.fn(),
        getRefreshToken: jest.fn(),
        isValid: jest.fn(),
    }
    const user = {
        email: email,
        firstName: 'Test',
        lastName: 'User',
    }

    const { container } = render(
        <AppProvider>
            <appContext.Consumer>
                {(value) => {
                    act(() => {
                        value.setLocalSession(session)
                        value.setLocalUser(user)
                    })
                    return <Header currentRoute={null} />
                }}
            </appContext.Consumer>
        </AppProvider>
    )
    const userButton = screen.getByTestId('user')
    act(() => {
        userButton.click()
    })
    const signoutButton = screen.getByTestId('signout-button')
    act(() => {
        signoutButton.click()
    })
    expect(localStorageMock.removeItem).toHaveBeenCalled()
})
