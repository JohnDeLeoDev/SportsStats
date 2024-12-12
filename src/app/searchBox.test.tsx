import React from 'react'
import {act, render, screen} from '@testing-library/react'
import SearchBox from '@/app/searchBox'

test('searchBox renders', () => {
    const mockUseContext = jest.fn(() => ({
        userSession: {},
        setSearchTriggered: jest.fn(),
        setSearchResponse: jest.fn(),
        searchQuery: 'searchQuery',
        setSearchQuery: jest.fn(),
        setSearchDisplay: jest.fn(),
        setSearchType: jest.fn(),
    }))
    React.useContext = mockUseContext

    const mockUseCallback = jest.fn((fn) => fn)

    React.useCallback = mockUseCallback

    render(<SearchBox/>)

    // check that the component renders
    expect(mockUseContext).toHaveBeenCalled()
    expect(mockUseCallback).toHaveBeenCalled()

    expect(screen.getByTestId('search-box')).toBeInTheDocument()
    expect(screen.getByTestId('search-field')).toBeInTheDocument()
    expect(screen.getByTestId('search-button')).toBeInTheDocument()
})

test('please-wait message appears when search is triggered and no response is received', async () => {
    const mockUseContext = jest.fn(() => ({
        userSession: {
            getIdToken: jest.fn(() => ({
                getJwtToken: jest.fn(() => 'mocked-jwt-token'),
            })),
        },
        searchTriggered: true,
        searchResponse: false,
        activeSearch: false,
        setActiveSearch: jest.fn(),
        setShowMessage: jest.fn(),
        setSearchTriggered: jest.fn(),
        setSearchResponse: jest.fn(),
        searchQuery: 'test query',
        setSearchQuery: jest.fn(),
        setSearchDisplay: jest.fn(),
        setSearchType: jest.fn(),
        showMessage: true,
        setTimeout: jest.fn(),
    }))
    React.useContext = mockUseContext

    const {showMessage} = mockUseContext()

    const mockUseCallback = jest.fn((fn) => fn)
    React.useCallback = mockUseCallback

    await act(async () => {
        render(<SearchBox/>)
        await new Promise((resolve) => setTimeout(resolve, 2000))
    })

    expect(showMessage).toBe(true)
    expect(screen.getByTestId('searching')).toBeInTheDocument()
})
