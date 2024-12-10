import React from 'react'
import {appContext} from './app'
import {style} from "@/app/style";
import searchRequest from "@/app/helpers/searchRequest";


export default function SearchBox(
    props: {
        placeholder?: string,
        type?: string,
        slug?: string
    } = {
        placeholder: 'Search for a statistic',
        type: 'general'
    }
) {
    const {
        searchQuery,
        setSearchQuery,
        searchTriggered,
        activeSearch,
        searchType,
        setActiveSearch,
        setSearchTriggered,
        searchResponse,
        setSearchResponse,
        userSession,
        setSearchDisplay,
    } = React.useContext(appContext)

    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showMessage, setShowMessage] = React.useState(false)

    const handleTextInput = React.useCallback(
        (query: string) => {
            setSearchQuery(query)
            // focus on the input field
        },
        [setSearchQuery]
    )

    function handleSearch(query: string) {
        try {
            if (userSession) {
                return searchRequest(query, searchType, userSession).then((res) => {
                    setSearchResponse(res)
                    setSearchTriggered(false)
                    setActiveSearch(false)
                })
            } else {
                return searchRequest(query, searchType).then((res) => {
                    setSearchResponse(res)
                    setSearchTriggered(false)
                    setActiveSearch(false)
                })
            }
        } catch (error) {
        }
    }

    React.useEffect(() => {
        if ((searchTriggered && !activeSearch) || (props.slug && !activeSearch)) {
            setSearchResponse(null)
            setSearchDisplay(null)
            setActiveSearch(true)
            handleSearch(searchQuery)
        }
    }, [searchTriggered, searchQuery, handleSearch, searchType, activeSearch, props.slug])

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [searchQuery])

    if (searchTriggered && !searchResponse) {
        setTimeout(() => {
            setShowMessage(true)
        }, 2000)
    }

    return (
        <>
            <div className={style.searchBoxOuter} data-testid={'search-box'}>
                <input
                    className={style.searchField}
                    data-testid="search-field"
                    placeholder={props.placeholder}
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => handleTextInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setSearchTriggered(true)
                        }
                    }}
                />
                {searchTriggered && !searchResponse ? (
                    <button
                        className={style.searchButtonActive}
                        data-testid={'searching'}
                    >
                        Searching...
                    </button>
                ) : (
                    <button
                        className={style.searchButton}
                        data-testid="search-button"
                        onClick={() => {
                            setSearchTriggered(true)
                        }}
                    >
                        Search
                    </button>
                )}
            </div>
            {showMessage && (
                <div className={style.pleaseWait} data-testid={'please-wait'}>
                    <p>Our LLM is processing your request. Please wait...</p>
                </div>
            )}
        </>
    )
}
