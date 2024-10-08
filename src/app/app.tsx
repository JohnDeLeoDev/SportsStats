'use client'

import React from 'react'
import Header from './header'
import Footer from './footer'
import { User } from './types/user'
import { SearchResponse } from './types/response'

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
    searchTriggered: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchTriggered: (triggered: boolean) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchResponse: null as SearchResponse | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchResponse: (response: SearchResponse | null) => {},
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
    const [searchQuery, setSearchQuery] = React.useState('')
    const [searchTriggered, setSearchTriggered] = React.useState(false)
    React.useState(false)
    const [searchResponse, setSearchResponse] =
        React.useState<SearchResponse | null>(null)

    const setLocalUser = (user: User | null) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
        setUser(user)
    }

    return (
        <appContext.Provider
            value={{
                user,
                setUser,
                setLocalUser,
                searchQuery,
                setSearchQuery,
                searchTriggered,
                setSearchTriggered,
                searchResponse,
                setSearchResponse,
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
