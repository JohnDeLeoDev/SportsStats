'use client'

import React from 'react'
import Header from './header'
import Footer from './footer'
import { User } from './types/user'

export const appContext = React.createContext({
    user: null as User | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (user: User | null) => {},
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

export default function App(props: {
    children: React.ReactNode
    currentRoute: string | null
}) {
    const [user, setUser] = React.useState(null as User | null)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [searchTriggered, setSearchTriggered] = React.useState(false)
    const [searchResponseReceived, setSearchResponseReceived] =
        React.useState(false)

    const { currentRoute } = props

    React.useEffect(() => {
        console.log('User:', user)
        // set the user in local storage
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        }
    }, [user])

    return (
        <appContext.Provider
            value={{
                user,
                setUser,
                searchQuery,
                setSearchQuery,
                searchTriggered,
                setSearchTriggered,
                searchResponseReceived,
                setSearchResponseReceived,
            }}
        >
            <Header currentRoute={currentRoute} />
            {props.children}
            <Footer />
        </appContext.Provider>
    )
}
