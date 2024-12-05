'use client'
import React from 'react'
import SearchResults from './searchResults'
import { appContext } from './app'
import SearchBox from '@/app/searchBox'
import SampleQueries from '@/app/sampleQueries'
import SearchHistory from '@/app/searchHistory'

export default function Home() {
    const { userSession, searchTriggered, searchDisplay } =
        React.useContext(appContext)

    console.log(userSession)

    function HomePage() {
        return (
            <div className="m-auto p-10 ">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    SportsStats
                </h1>
                <p className="mt-4 mb-4 text-lg sm:text-xl text-center sm:text-left transition-all duration-2000 ease-in-out transform">
                    Welcome to SportsStats, where your sports statistics are a
                    search away.
                </p>
                <SearchBox />
                <SampleQueries />
                {userSession ? <SearchHistory /> : null}
            </div>
        )
    }

    return (
        <main className="mt-40 ml-auto mr-auto  items-center  justify-center max-w-3xl max-h-xl bg-white shadow rounded-lg  flex flex-col mb-40 ">
            {!searchTriggered && !searchDisplay ? <HomePage /> : null}
            {searchDisplay || searchTriggered ? (
                <div
                    className=" m-auto
                    p-10
                    w-full
                    h-full
                "
                >
                    <SearchBox />
                    {searchDisplay ? <SearchResults /> : null}
                </div>
            ) : null}
        </main>
    )
}
