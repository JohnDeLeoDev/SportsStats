'use client'

import React from 'react'
import Header from './header'
import Footer from './footer'
import { User } from './types/user'

export const appContext = React.createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: null as User | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (user: User | null) => {},
    setLocalUser: (user: User | null) => {},
    searchQuery: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchQuery: (query: string) => {},
    searchTriggered: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchTriggered: (triggered: boolean) => {},
    searchResponseReceived: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchResponseReceived: (received: boolean) => {},
})

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
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
    const [searchResponseReceived, setSearchResponseReceived] =
        React.useState(false)

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
                searchResponseReceived,
                setSearchResponseReceived,
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
