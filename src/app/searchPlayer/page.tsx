'use client'
import React from 'react'
import SearchResults from '../searchResults'
import {appContext} from '../app'
import SearchBox from '@/app/searchBox'
import {style} from "@/app/style";

export default function SearchPlayerPage() {
    const {searchTriggered, searchDisplay, searchType, setSearchType} =
        React.useContext(appContext)

    React.useEffect(() => {
            searchType !== 'player' && setSearchType('player')
        }
    ), [searchType, setSearchType]


    function SearchPlayer() {
        return (
            <div className={style.innerCard}>
                <h1 className={style.h1}>
                    SportsStats
                </h1>
                <p className={style.p}>
                    Welcome to SportsStats, where your sports statistics are a
                    search away.
                </p>
                <SearchBox placeholder={'Search for an MLB player'}/>
            </div>
        )
    }

    return (
        <main
            className={style.pageCard}>
            {!searchTriggered && !searchDisplay ? <SearchPlayer/> : null}
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
