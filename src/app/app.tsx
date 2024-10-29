'use client'

import React from 'react'
import Header from './header'
import Footer from './footer'
import { User } from './types/user'
import { SearchResponse } from './types/response'
import { Player } from './types/player'
import {CognitoIdToken, CognitoUserSession, CognitoAccessToken, CognitoRefreshToken} from "amazon-cognito-identity-js";


export const appContext = React.createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: null as User | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (user: User | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLocalUser: (user: User | null) => {},
    searchQuery: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchQuery: (query: string) => {},
    localQuery: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLocalQuery: (query: string) => {},
    searchTriggered: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchTriggered: (triggered: boolean) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchResponse: null as SearchResponse | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchResponse: (response: SearchResponse | null) => {},
    playerQuery: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPlayerQuery: (query: string) => {},
    playerResponse: null as SearchResponse | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPlayerResponse: (response: SearchResponse | null) => {},
    playerResult: [] as Player[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPlayerResult: (result: Player[]) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLocalSession: (token: CognitoUserSession | null ) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userSession: null as CognitoUserSession  | null,
})

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = React.useState<User | null>(() => {
        if (typeof localStorage === 'undefined') {
            return null
        }
        const userStorage = localStorage.getItem('user')
        if (userStorage) {
            return JSON.parse(userStorage)
        } else {
            return null
        }
    })
    const [userSession] = React.useState<CognitoUserSession | null>(() => {
        if (typeof localStorage === 'undefined') {
            return null
        }
        const sessionStorage = localStorage.getItem('session')
        if (sessionStorage) {
            const session = JSON.parse(sessionStorage)
            const idToken = new CognitoIdToken({ IdToken: session.idToken.jwtToken })
            const accessToken = new CognitoAccessToken({ AccessToken: session.accessToken.jwtToken })
            const refreshToken = new CognitoRefreshToken({ RefreshToken: session.refreshToken.token })
            return new CognitoUserSession({
                IdToken: idToken,
                AccessToken: accessToken,
                RefreshToken: refreshToken
            })
        }
        return null
    })

    const [searchQuery, setSearchQuery] = React.useState<string>(() => {
        if (typeof localStorage === 'undefined') {
            return ''
        }
        const queryStorage = localStorage.getItem('query')
        if (queryStorage) {
            localStorage.removeItem('query')
            return JSON.parse(queryStorage)
        } else {
            return ''
        }
    })
    const [searchTriggered, setSearchTriggered] = React.useState(false)
    const [localQuery] = React.useState<string>('')
    const [playerQuery, setPlayerQuery] = React.useState<string>('')
    const [searchResponse, setSearchResponse] =
        React.useState<SearchResponse | null>(null)

    const [playerResponse, setPlayerResponse] =
        React.useState<SearchResponse | null>(null)

    const [playerResult, setPlayerResult] = React.useState<Player[]>([])

    const setLocalUser = (user: User | null) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
        setUser(user)
    }

    const setLocalSession = (session: CognitoUserSession | null) => {
        if (session) {
            localStorage.setItem('session', JSON.stringify(session))
        } else {
            localStorage.removeItem('session')
        }
    }

    const setLocalQuery = (query: string) => {
        localStorage.setItem('query', JSON.stringify(query))
        setSearchQuery(query)
    }

    return (
        <appContext.Provider
            value={{
                localQuery,
                playerQuery,
                playerResponse,
                playerResult,
                searchQuery,
                searchResponse,
                searchTriggered,
                setLocalQuery,
                setLocalSession: setLocalSession,
                setLocalUser,
                setPlayerQuery,
                setPlayerResponse,
                setPlayerResult,
                setSearchQuery,
                setSearchResponse,
                setSearchTriggered,
                setUser,
                user,
                userSession: userSession,
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default function App(props: {
    children: React.ReactNode
    currentRoute: string | null
}) {
    const { currentRoute } = props

    return (
        <AppProvider>
            <Header currentRoute={currentRoute} />
            {props.children}
            <Footer />
        </AppProvider>
    )
}
