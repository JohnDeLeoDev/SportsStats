'use client'
import React from 'react'
import SearchResults from '../searchResults'
import {appContext} from '../app'
import SearchBox from '@/app/searchBox'
import {style} from '@/app/style'

class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
    state = {hasError: false}

    static getDerivedStateFromError() {
        return {hasError: true}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>
        }

        return this.props.children
    }
}

export default function SearchTeamPage() {
    const {searchTriggered, searchDisplay, searchType, setSearchType} =
        React.useContext(appContext)

    React.useEffect(() => {
        searchType !== 'team' && setSearchType('team')
    }),
        [searchType, setSearchType]

    function SearchTeam() {
        return (
            <div className={style.innerCard}>
                <h1 className={style.h1}>SportsStats</h1>
                <p className={style.p}>
                    Welcome to SportsStats, where your sports statistics are a
                    search away.
                </p>
                <SearchBox placeholder={'Search for an MLB team'}/>
            </div>
        )
    }

    return (
        <main className={style.pageCard}>
            {!searchTriggered && !searchDisplay ? <SearchTeam/> : null}
            {searchDisplay || searchTriggered ? (
                <div
                    className=" m-auto
                    p-10
                    w-full
                    h-full
                "
                >
                    <SearchBox/>
                    <ErrorBoundary>
                        {searchDisplay ? <SearchResults/> : null}
                    </ErrorBoundary>
                </div>
            ) : null}
        </main>
    )
}
