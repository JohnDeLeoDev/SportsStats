import React from 'react'
import {act, fireEvent, render, screen} from '@testing-library/react'
import SampleQueries from '@/app/sampleQueries'
import searchRequest from '@/app/helpers/searchRequest'

jest.mock('@/app/helpers/searchRequest')

function setupContext(user: boolean) {
    let mockUseContext

    if (user) {
        mockUseContext = jest.fn(() => ({
            userSession: {},
            setSearchTriggered: jest.fn(),
            setSearchResponse: jest.fn(),
            searchQuery: 'searchQuery',
            setSearchQuery: jest.fn(),
            setSearchDisplay: jest.fn(),
            setSearchType: jest.fn(),
        }))
    } else {
        mockUseContext = jest.fn(() => ({
            userSession: null,
            setSearchTriggered: jest.fn(),
            setSearchResponse: jest.fn(),
            searchQuery: 'searchQuery',
            setSearchQuery: jest.fn(),
            setSearchDisplay: jest.fn(),
            setSearchType: jest.fn(),
        }))
    }

    React.useContext = mockUseContext

    const mockUseCallback = jest.fn((fn) => fn)
    React.useCallback = mockUseCallback

    const sampleQueries = [
        'Who led the American League in home runs in 2020?',
        'Who had the most hits in the National League in 1990?',
        'What pitcher had the most strikeouts in the American League in 2000?',
        'What pitcher had the most wins in the American League in 1920?',
    ]

    return {
        mockUseContext,
        mockUseCallback,
        sampleQueries,
    }
}

test('if userSession is set, searchRequest is called with userSession', async () => {
    const {mockUseContext, mockUseCallback, sampleQueries} =
        setupContext(true)

    await act(async () => {
        render(<SampleQueries similarQueries={sampleQueries}/>)
    })

    // check that the component renders
    expect(mockUseContext).toHaveBeenCalled()
    expect(mockUseCallback).toHaveBeenCalled()

    // simulate a click event on the first button
    const queryButton = screen.getAllByTestId('sample-query')[0]
    const queryText = queryButton.textContent
    await act(async () => {
        fireEvent.click(queryButton)
    })

    expect(searchRequest).toHaveBeenCalledWith(queryText, 'general', {})
})

test('if userSession not is set, searchRequest is called without userSession', async () => {
    const {mockUseContext, mockUseCallback, sampleQueries} =
        setupContext(false)

    await act(async () => {
        render(<SampleQueries similarQueries={sampleQueries}/>)
    })

    // check that the component renders
    expect(mockUseContext).toHaveBeenCalled()
    expect(mockUseCallback).toHaveBeenCalled()

    // simulate a click event on the first button
    const queryButton = screen.getAllByTestId('sample-query')[0]
    const queryText = queryButton.textContent
    await act(async () => {
        fireEvent.click(queryButton)
    })

    expect(searchRequest).toHaveBeenCalledWith(queryText, 'general')
})
