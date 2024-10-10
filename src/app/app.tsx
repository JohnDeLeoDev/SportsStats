'use client'

import React from 'react'
import Header from './header'
import Footer from './footer'
import { User } from './types/user'
import { SearchResponse } from './types/response'
import { Player } from './types/player'

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
})

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, setUser] = React.useState<User | null>(() => {
        const userStorage = localStorage.getItem('user')
        if (userStorage) {
            return JSON.parse(userStorage)
        } else {
            return null
        }
    })
    const [searchQuery, setSearchQuery] = React.useState<string>(() => {
        const queryStorage = localStorage.getItem('query')
        console.log('queryStorage', queryStorage)
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

    const setLocalQuery = (query: string) => {
        localStorage.setItem('query', JSON.stringify(query))
        setSearchQuery(query)
    }

    return (
        <appContext.Provider
            value={{
                user,
                setUser,
                setLocalUser,
                searchQuery,
                setSearchQuery,
                localQuery,
                setLocalQuery,
                searchTriggered,
                setSearchTriggered,
                searchResponse,
                setSearchResponse,
                playerQuery,
                setPlayerQuery,
                playerResponse,
                setPlayerResponse,
                playerResult,
                setPlayerResult,
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
