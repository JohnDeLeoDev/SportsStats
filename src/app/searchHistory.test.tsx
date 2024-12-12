import SearchHistory from './searchHistory'
import {act, render, screen} from '@testing-library/react'
import {appContext} from './app'
import {getQueries} from './helpers/getQueries'
import searchRequest from './helpers/searchRequest'
import {CognitoAccessToken, CognitoIdToken, CognitoRefreshToken, CognitoUserSession,} from 'amazon-cognito-identity-js'
import {Query} from '@/app/types/query'
import {Player} from '@/app/types/player'
import {SearchResponse} from '@/app/types/response'
import {User} from '@/app/types/user'

jest.mock('./helpers/getQueries')
jest.mock('./helpers/searchRequest')

function setupContext(user: boolean) {
    const userSession: CognitoUserSession = {
        getIdToken: () => {
            return {} as CognitoIdToken
        },
        getAccessToken: () => {
            return {} as CognitoAccessToken
        },
        getRefreshToken: () => {
            return {} as CognitoRefreshToken
        },
        isValid: () => {
            return true
        },
    }

    const pastQueries: Query[] = [
            {
                id: '1',
                query: 'mockQuery',
                created_at: 'mockDate',
            },
            {
                id: '2',
                query: 'mockQuery2',
                created_at: 'mockDate2',
            },
        ]

    ;(getQueries as jest.Mock).mockResolvedValue(pastQueries)
    ;(searchRequest as jest.Mock).mockResolvedValue('mockResponse')

    const setSearchQuery = jest.fn()
    const setSearchTriggered = jest.fn()
    const setSearchResponse = jest.fn()
    const setSearchDisplay = jest.fn()
    const setLocalUser = jest.fn()

    const appContext = {
        user: user ? ({} as User) : null,
        setUser: jest.fn(),
        setLocalUser,
        userSession: user ? userSession : null,
        searchQuery: '',
        setSearchQuery,
        pastQueries: pastQueries,
        localQuery: '',
        setLocalQuery: jest.fn(),
        setSearchDisplay,
        setSearchResponse,
        setSearchTriggered,
        searchResponse: null,
        searchType: '',
        setSearchType: jest.fn(),
        searchTriggered: false,
        playerQuery: '',
        setPlayerQuery: jest.fn(),
        setPastQueries: jest.fn(),
        playerResponse: null,
        playerResult: [] as Player[],
        setPlayerResult: jest.fn(),
        setLocalSession: jest.fn(),
        searchDisplay: null as SearchResponse | null,
        setPlayerResponse: jest.fn(),
        activeSearch: false,
        setActiveSearch: jest.fn(),
    }

    return appContext
}

test('SearchHistory component renders', async () => {
    const value = setupContext(true)

    await act(async () => {
        render(
            <appContext.Provider value={value}>
                <SearchHistory/>
            </appContext.Provider>
        )
    })

    expect(getQueries).toHaveBeenCalled()
    expect(screen.getByTestId('search-history-list')).toBeInTheDocument()
})

test('Click on search history item triggers search', async () => {
    const context = setupContext(true)

    await act(async () => {
        render(
            <appContext.Provider value={context}>
                <SearchHistory/>
            </appContext.Provider>
        )
    })

    const {setSearchQuery, setSearchTriggered} = context

    expect(getQueries).toHaveBeenCalled()
    expect(screen.getByTestId('search-history-list')).toBeInTheDocument()

    const searchHistoryItem = screen.getByTestId('search-history-item-0')
    await act(async () => {
        searchHistoryItem.click()
    })
    expect(setSearchQuery).toHaveBeenCalledWith('mockQuery2')
    expect(setSearchTriggered).toHaveBeenCalledWith(true)
})
