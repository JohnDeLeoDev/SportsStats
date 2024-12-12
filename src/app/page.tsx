'use client'
import React from 'react'
import SearchResults from './searchResults'
import {appContext} from './app'
import SearchBox from '@/app/searchBox'
import SampleQueries from '@/app/sampleQueries'
import {style} from '@/app/style'
import SearchHistory from '@/app/searchHistory'

export default function Home() {
    const {user, searchTriggered, searchDisplay} =
        React.useContext(appContext)

    function HomePage() {
        return (
            <div className={style.innerCard}>
                <h1 className={style.h1}>SportsStats</h1>
                <p className={style.p}>
                    Welcome to SportsStats, where your sports statistics are a
                    search away.
                </p>
                <SearchBox placeholder={'Search for a statistic...'}/>
                <SampleQueries/>
                {user ? <SearchHistory/> : null}
            </div>
        )
    }

    return (
        <main className={style.pageCard}>
            {!searchTriggered && !searchDisplay ? <HomePage/> : null}
            {searchDisplay || searchTriggered ? (
                <div
                    className=" m-auto
                    p-10
                    w-full
                    h-full
                "
                >
                    <SearchBox/>
                    {searchDisplay ? <SearchResults/> : null}
                </div>
            ) : null}
        </main>
    )
}
