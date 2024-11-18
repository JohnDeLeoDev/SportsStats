'use client'
import React from 'react'
import SearchResults from './searchResults'
import { appContext } from './app'
import SearchBox from '@/app/searchBox'

export default function Home() {
    const { searchTriggered, searchResponse, searchDisplay } =
        React.useContext(appContext)

    function HomePage() {
        return (
            <div
                className="
                m-auto
                mt-20

            "
            >
                <div className="">
                    <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                        SportsStats
                    </h1>
                    <p className="mt-4 mb-4 text-lg sm:text-xl text-center sm:text-left transition-all duration-2000 ease-in-out transform">
                        Welcome to SportsStats, where your sports statistics are
                        a search away.
                    </p>
                    <SearchBox />
                </div>
            </div>
        )
    }

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8 pb-20 sm:p-5">
            {!searchTriggered && !searchDisplay ? <HomePage /> : null}
            {searchDisplay || searchTriggered ? (
                <div
                    className=" m-auto
                mt-10
                w-8/12
                "
                >
                    <SearchBox />
                    {searchDisplay ? <SearchResults /> : null}
                </div>
            ) : null}
        </main>
    )
}
