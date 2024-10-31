import App, { appContext, AppProvider } from './app'
import { act, render } from '@testing-library/react'

import React from 'react'
import {
    CognitoAccessToken,
    CognitoIdToken,
    CognitoRefreshToken,
    CognitoUserSession,
} from 'amazon-cognito-identity-js' // mock local storage

// mock local storage
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

describe('AppProvider', () => {
    it('should provide the app context', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.user).toBeNull()
                        expect(value.setUser).toBeInstanceOf(Function)
                        expect(value.setLocalUser).toBeInstanceOf(Function)
                        expect(value.searchQuery).toBe('')
                        expect(value.setSearchQuery).toBeInstanceOf(Function)
                        expect(value.localQuery).toBe('')
                        expect(value.setLocalQuery).toBeInstanceOf(Function)
                        expect(value.searchTriggered).toBe(false)
                        expect(value.setSearchTriggered).toBeInstanceOf(
                            Function
                        )
                        expect(value.searchResponse).toBeNull()
                        expect(value.setSearchResponse).toBeInstanceOf(Function)
                        expect(value.playerQuery).toBe('')
                        expect(value.setPlayerQuery).toBeInstanceOf(Function)
                        expect(value.playerResponse).toBeNull()
                        expect(value.setPlayerResponse).toBeInstanceOf(Function)
                        expect(value.playerResult).toEqual([])
                        expect(value.setPlayerResult).toBeInstanceOf(Function)
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })
    it('should have no user set', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.user).toBeNull()
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should have no searchQuery set', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.searchQuery).toBe('')
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should have no localQuery set', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.localQuery).toBe('')
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should have searchTriggered set to false', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.searchTriggered).toBe(false)
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should have no searchResponse set', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.searchResponse).toBeNull()
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should have no playerQuery set', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.playerQuery).toBe('')
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should have no playerResponse set', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.playerResponse).toBeNull()
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should have no playerResult set', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.playerResult).toEqual([])
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('user null when localStorage is undefined', () => {
        Object.defineProperty(window, 'localStorage', {
            value: undefined,
        })
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        expect(value.user).toBeNull()
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should set and remove user in localStorage', () => {
        const session: CognitoUserSession = {
            getIdToken: jest.fn(),
            getAccessToken: jest.fn(),
            getRefreshToken: jest.fn(),
            isValid: jest.fn(),
        }

        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        act(() => {
                            value.setLocalSession(session)
                        })
                        expect(localStorageMock.setItem).toHaveBeenCalledTimes(
                            1
                        )
                        expect(localStorageMock.setItem).toHaveBeenCalledWith(
                            'session',
                            JSON.stringify(session)
                        )
                        act(() => {
                            value.setLocalSession(null)
                        })
                        expect(
                            localStorageMock.removeItem
                        ).toHaveBeenCalledTimes(1)
                        expect(
                            localStorageMock.removeItem
                        ).toHaveBeenCalledWith('session')
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should pull userSession from localStorage', () => {
        const session = {
            idToken: { jwtToken: 'idToken' },
            accessToken: { jwtToken: 'accessToken' },
            refreshToken: { token: 'refreshToken' },
        }

        localStorageMock.getItem.mockReturnValue(JSON.stringify(session))
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        const expectedSession = new CognitoUserSession({
                            IdToken: new CognitoIdToken({ IdToken: 'idToken' }),
                            AccessToken: new CognitoAccessToken({
                                AccessToken: 'accessToken',
                            }),
                            RefreshToken: new CognitoRefreshToken({
                                RefreshToken: 'refreshToken',
                            }),
                        })
                        expect(value.userSession).toEqual(expectedSession)
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should set a user in localStorage', () => {
        const user = {
            email: 'testing@gmail.com',
            firstName: 'test',
            lastName: 'test',
        }
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        act(() => {
                            value.setLocalUser(user)
                        })
                        expect(localStorageMock.setItem).toHaveBeenCalledWith(
                            'user',
                            JSON.stringify(user)
                        )
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should remove user from localStorage if passed null', () => {
        const session = {
            idToken: { jwtToken: 'idToken' },
            accessToken: { jwtToken: 'accessToken' },
            refreshToken: { token: 'refreshToken' },
        }

        localStorageMock.getItem.mockReturnValue(JSON.stringify(session))

        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        act(() => {
                            value.setLocalUser(null)
                        })
                        expect(
                            localStorageMock.removeItem
                        ).toHaveBeenCalledWith('user')
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should set and remove searchQuery in localStorage', () => {
        const { container } = render(
            <AppProvider>
                <appContext.Consumer>
                    {(value) => {
                        act(() => {
                            value.setLocalQuery('searchQuery')
                        })
                        expect(localStorageMock.setItem).toHaveBeenCalledTimes(
                            1
                        )
                        expect(localStorageMock.setItem).toHaveBeenCalledWith(
                            'query',
                            JSON.stringify('searchQuery')
                        )
                        act(() => {
                            value.setLocalQuery('')
                        })
                        expect(
                            localStorageMock.removeItem
                        ).toHaveBeenCalledTimes(1)
                        expect(
                            localStorageMock.removeItem
                        ).toHaveBeenCalledWith('query')
                        return null
                    }}
                </appContext.Consumer>
            </AppProvider>
        )
        expect(container).toMatchSnapshot()
    })

    it('should render the App component with Header, children, and Footer', () => {
        const { container } = render(
            <App currentRoute="/home">
                <div>Test Child</div>
            </App>
        )

        // Check if Header is rendered
        expect(container.querySelector('header')).toBeInTheDocument()

        // Check if children are rendered
        expect(container.querySelector('div')).toBeInTheDocument()

        // Check if Footer is rendered
        expect(container.querySelector('footer')).toBeInTheDocument()

        expect(container).toMatchSnapshot()
    })
})
