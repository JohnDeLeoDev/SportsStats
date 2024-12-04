'use client'
import React from 'react'
import SearchResults from './searchResults'
import { appContext } from './app'
import SearchBox from '@/app/searchBox'
import SampleQueries from '@/app/sampleQueries'

export default function Home() {
    const { searchTriggered, searchDisplay } = React.useContext(appContext)

    function HomePage() {
        return (
            <div
                className="
                m-auto
                bg-white
                p-12
                w-11/12


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
                    <SampleQueries />
                </div>
            </div>
        )
    }

    return (
        <main className="flex flex-col m-auto gap-8 row-start-2 items-center sm:items-start p-8 sm:p-5 mt-20  w-11/12 bg-white shadow rounded-lg ">
            {!searchTriggered && !searchDisplay ? <HomePage /> : null}
            {searchDisplay || searchTriggered ? (
                <div
                    className=" m-auto
                    p-10
                    w-full
                "
                >
                    <SearchBox />
                    {searchDisplay ? <SearchResults /> : null}
                </div>
            ) : null}
        </main>
    )
}
