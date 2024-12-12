'use client'
import React from 'react'
import {style} from '@/app/style'
import SearchBox from '@/app/searchBox'
import SearchResults from '@/app/searchResults'
import {appContext} from '@/app/app'

export default function SearchPage({params}: { params: { slug: string } }) {
    const {searchDisplay, setSearchQuery} = React.useContext(appContext)
    const {slug} = params

    React.useEffect(() => {
        setSearchQuery(slug)
    }, [slug, setSearchQuery])

    return (
        <div className={style.pageCard}>
            <div
                className=" m-auto
                    p-10
                    w-full
                    h-full
                "
            >
                <SearchBox slug={slug}/>
                {searchDisplay ? <SearchResults/> : null}
            </div>
        </div>
    )
}
