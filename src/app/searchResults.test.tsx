import React from 'react';
import {act, render, screen} from '@testing-library/react';
import SearchResults from './searchResults';
import {appContext} from './app';
import {CognitoUserSession} from 'amazon-cognito-identity-js';
import {logMessages, sqlAttempt} from "@/app/types/response";

function setupContext(searchDisplay: {
    errorMessage?: string;
    message?: string;
    dbResult?: { rows: { playerID: string; teamID: string; yearID: string }[] };
    similarQueries?: string[];
    attemptedSQL?: sqlAttempt;
    logMessage?: logMessages;
    prompts?: Record<string, string>; // Removed optional undefined type to enforce alignment
    llmAnswer?: string;
    query?: string;
}, userSession: CognitoUserSession | null, searchType: string) {
    const setSearchQuery = jest.fn();
    const setSearchTriggered = jest.fn();
    const setSearchResponse = jest.fn();
    const setSearchDisplay = jest.fn();
    const setSearchType = jest.fn();
    const pastQueries = [
        {id: '1', query: 'query1', created_at: '2021-01-01'},
        {id: '2', query: 'query2', created_at: '2021-01-02'},
    ];


    return {
        userSession,
        setSearchQuery,
        setSearchTriggered,
        setSearchResponse,
        setSearchDisplay,
        setSearchType,
        pastQueries,
        user: null,
        setUser: jest.fn(),
        setLocalUser: jest.fn(),
        searchQuery: "",
        localQuery: "",
        setLocalQuery: jest.fn(),
        searchTriggered: false,
        searchResponse: null,
        playerQuery: "",
        setPlayerQuery: jest.fn(),
        playerResponse: null,
        setPlayerResponse: jest.fn(),
        playerResult: [],
        setPlayerResult: jest.fn(),
        setLocalSession: jest.fn(),
        activeSearch: false,
        setActiveSearch: jest.fn(),
        searchDisplay: {
            ...searchDisplay,
            attemptedSQL: searchDisplay?.attemptedSQL ?? ({} as sqlAttempt),
            dbResult: searchDisplay?.dbResult ?? {
                rows: [] as Array<{
                    playerID: string;
                    teamID: string;
                    yearID: string
                }>
            },
            logMessage: searchDisplay?.logMessage ?? ({} as logMessages),
            prompts: searchDisplay?.prompts ?? {}, // Default to empty object
        },
        searchType: searchType ?? "",

    };
}

test('renders search results with error message', async () => {
    const searchDisplay = {errorMessage: 'Error occurred'};
    const contextValue = setupContext(searchDisplay, null, '');

    await act(async () => {
        // @ts-expect-error: Context value contains mocked functions for testing
        render(
            <appContext.Provider value={contextValue}>
                <SearchResults/>
            </appContext.Provider>
        );
    });

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('An error occurred while fetching the search results.')).toBeInTheDocument();
    expect(screen.getByText('Message: Error occurred')).toBeInTheDocument();
});

test('renders search results with message', async () => {
    const searchDisplay = {message: 'Some message'};
    const contextValue = setupContext(searchDisplay, null, '');

    await act(async () => {
        render(
            <appContext.Provider value={contextValue}>
                <SearchResults/>
            </appContext.Provider>
        );
    });

    expect(screen.getByText('An error occurred while fetching the search results.')).toBeInTheDocument();
    expect(screen.getByText('Message: Some message')).toBeInTheDocument();
});

test('renders search results with dbResult', async () => {
    const searchDisplay = {dbResult: {rows: [{playerID: '1', teamID: '2', yearID: '2020'}]}};
    const contextValue = setupContext(searchDisplay, null, '');

    await act(async () => {
        render(
            <appContext.Provider value={contextValue}>
                <SearchResults/>
            </appContext.Provider>
        );
    });

    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('Player')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
});

test('renders no search results found', async () => {
    const searchDisplay = {dbResult: {rows: []}};
    const contextValue = setupContext(searchDisplay, null, '');

    await act(async () => {
        render(
            <appContext.Provider value={contextValue}>
                <SearchResults/>
            </appContext.Provider>
        );
    });

    expect(screen.getByText('No search results found.')).toBeInTheDocument();
    expect(screen.getByText('Please try a different search query.')).toBeInTheDocument();
});

test('renders SampleQueries component', async () => {
    const searchDisplay = {similarQueries: ['query1', 'query2']};
    const contextValue = setupContext(searchDisplay, null, 'general');

    await act(async () => {
        render(
            <appContext.Provider value={contextValue}>
                <SearchResults/>
            </appContext.Provider>
        );
    });

    expect(screen.getByTestId('sample-queries')).toBeInTheDocument();
});

