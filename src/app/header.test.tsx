import {act, render, screen} from '@testing-library/react';
import React from 'react';
import Header from './header';
import {appContext} from './app';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    });
});

test('Renders header', async () => {
    await act(async () => {
        render(<Header currentRoute={null}/>);
    });
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
});

test('Renders site title', async () => {
    await act(async () => {
        render(<Header currentRoute={null}/>);
    });
    const titleElement = screen.getByText('SportsStats');
    expect(titleElement).toBeInTheDocument();
});

test('Renders user icon', async () => {
    await act(async () => {
        render(<Header currentRoute={null}/>);
    });
    const userElement = screen.getByTestId('user');
    expect(userElement).toBeInTheDocument();
});

test('Renders menu button', async () => {
    await act(async () => {
        render(<Header currentRoute={null}/>);
    });
    const menuElement = screen.getByTestId('menu');
    expect(menuElement).toBeInTheDocument();
});

test('Renders user menu when profile button clicked', async () => {
    await act(async () => {
        render(<Header currentRoute={null}/>);
    });
    const userButton = screen.getByTestId('user');
    await act(async () => {
        userButton.click();
    });
    const userMenu = screen.getByTestId('user-menu');
    expect(userMenu).toBeInTheDocument();
});

test('Renders menu when menu button clicked', async () => {
    await act(async () => {
        render(<Header currentRoute={null}/>);
    });
    const menuButton = screen.getByTestId('menu');
    await act(async () => {
        menuButton.click();
    });
    const mainMenu = screen.getByTestId('main-menu');
    expect(mainMenu).toBeInTheDocument();
});

test('User state information is displayed in the user menu - not logged in', async () => {
    await act(async () => {
        render(<Header currentRoute={null}/>);
    });
    const userButton = screen.getByTestId('user');
    await act(async () => {
        userButton.click();
    });
    const userState = screen.getByText('Sign In');
    expect(userState).toBeInTheDocument();
});

test('User state information is displayed in the user menu - logged in', async () => {
    await act(async () => {
        render(<Header currentRoute={null}/>);
    });
    const userButton = screen.getByTestId('user');
    await act(async () => {
        userButton.click();
    });
    const userState = screen.getByText('Sign In');
    expect(userState).toBeInTheDocument();
});

test('Site title is displayed', async () => {
    await act(async () => {
        render(<Header currentRoute={null}/>);
    });
    const titleElement = screen.getByTestId('site-title');
    expect(titleElement).toBeInTheDocument();
});

test('Renders welcome message when user is logged in', async () => {
    const user = {firstName: 'John', email: 'john@example.com', lastName: 'Doe'};
    const setLocalUser = jest.fn();
    const setLocalSession = jest.fn();
    const setUser = jest.fn();
    const setSearchQuery = jest.fn();
    const setSearchType = jest.fn();
    const searchQuery = '';
    const localQuery = '';
    const searchType = '';

    await act(async () => {
        render(
            <appContext.Provider value={{
                user,
                setLocalUser,
                setLocalSession,
                setUser,
                setSearchQuery,
                setSearchType,
                searchQuery,
                localQuery,
                searchType,
                setLocalQuery: jest.fn(),
                searchTriggered: false,
                setSearchTriggered: jest.fn(),
                searchResponse: null,
                setSearchResponse: jest.fn(),
                playerQuery: '',
                setPlayerQuery: jest.fn(),
                playerResponse: null,
                setPlayerResponse: jest.fn(),
                playerResult: [],
                setPlayerResult: jest.fn(),
                userSession: null,
                setSearchDisplay: jest.fn(),
                searchDisplay: null,
                activeSearch: false,
                setActiveSearch: jest.fn(),
            }}>
                <Header currentRoute={null}/>
            </appContext.Provider>
        );
    });

    const userButton = screen.getByTestId('user');
    await act(async () => {
        userButton.click();
    });

    const welcomeElement = screen.getByTestId('welcome');
    expect(welcomeElement).toBeInTheDocument();
});

test('handleSignOut function is called when sign out button is clicked', async () => {
    const user = {firstName: 'John', email: 'john@example.com', lastName: 'Doe'};
    const setLocalUser = jest.fn();
    const setLocalSession = jest.fn();
    const setUser = jest.fn();
    const setSearchQuery = jest.fn();
    const setSearchType = jest.fn();
    const searchQuery = '';
    const localQuery = '';
    const searchType = '';

    await act(async () => {
        render(
            <appContext.Provider value={{
                user,
                setLocalUser,
                setLocalSession,
                setUser,
                setSearchQuery,
                setSearchType,
                searchQuery,
                localQuery,
                searchType,
                setLocalQuery: jest.fn(),
                searchTriggered: false,
                setSearchTriggered: jest.fn(),
                searchResponse: null,
                setSearchResponse: jest.fn(),
                playerQuery: '',
                setPlayerQuery: jest.fn(),
                playerResponse: null,
                setPlayerResponse: jest.fn(),
                playerResult: [],
                setPlayerResult: jest.fn(),
                userSession: null,
                setSearchDisplay: jest.fn(),
                searchDisplay: null,
                activeSearch: false,
                setActiveSearch: jest.fn(),
            }}>
                <Header currentRoute={null}/>
            </appContext.Provider>
        );
    });

    const userButton = screen.getByTestId('user');
    await act(async () => {
        userButton.click();
    });

    const signOutButton = screen.getByTestId('signout-button');
    await act(async () => {
        signOutButton.click();
    });
    expect(setLocalUser).toHaveBeenCalledWith(null);
    expect(setLocalSession).toHaveBeenCalledWith(null);
});