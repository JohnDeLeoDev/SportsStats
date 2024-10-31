import React from 'react'
import { appContext } from './app'
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'

import { Bars3Icon, BellIcon, UserIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'SearchStats', href: '/', current: false },
    { name: 'Examples', href: '/examples', current: false },
    { name: 'About', href: '/about', current: false },
]

const appMenu = [
    { name: 'SearchStats', href: '/' },
    { name: 'Examples', href: '/examples' },
    { name: 'About', href: '/about' },
]

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}

interface HeaderProps {
    currentRoute: string | null
}

export default function Header({ currentRoute }: HeaderProps) {
    const { user, setLocalUser, setLocalSession } = React.useContext(appContext)

    navigation.forEach((item) => {
        item.current = item.href === currentRoute
    })

    let profileMenu = []

    if (user) {
        profileMenu = [
            {
                name: `Welcome, ${user.firstName}`,
                href: '/dashboard',
                dataTestID: 'welcome',
            },
            {
                name: 'Dashboard',
                href: '/dashboard',
                dataTestID: 'dashboard',
            },
            {
                name: 'Settings',
                href: '/settings',
                dataTestID: 'settings',
            },
            {
                name: 'Sign Out',
                onclick: handleSignOut,
                dataTestID: 'signout-button',
            },
        ]
    } else {
        profileMenu = [
            {
                name: 'Create Account',
                href: '/signup',
                dataTestID: 'create-account',
            },
            { name: 'Sign In', href: '/signin', dataTestID: 'signin-button' },
        ]
    }

    async function handleSignOut() {
        setLocalUser(null)
        setLocalSession(null)
    }

    return (
        <header data-testid="header" className="grid grid-cols-3 w-full gap-4">
            <Disclosure
                as="nav"
                className="bg-red-800 bg-opacity-90 text-white
                fixed w-screen z-10 top-0"
            >
                <div className="mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon
                                    aria-hidden="true"
                                    className="block h-6 w-6 group-data-[open]:hidden"
                                />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Menu
                                    as="div"
                                    className="
                                    relative flex flex-col
                                    "
                                >
                                    <MenuButton
                                        className="
                                    
                                    "
                                        data-testid="menu"
                                    >
                                        <Bars3Icon
                                            aria-hidden="true"
                                            className="h-7 w-7  text-white transition-colors duration-100 ease-in-out hover:text-black"
                                        />
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        data-testid="main-menu"
                                    >
                                        {appMenu.map((item) => (
                                            <MenuItem key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                >
                                                    {item.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a
                                        href="/"
                                        className="text-white hover:bg-red-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        <h1 className="text-2xl font-bold font-[family-name:var(--font-geist-sans)]">
                                            SportsStats
                                        </h1>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="relative rounded-full p-1 
                                hover:outline-black hover:bg-red-900 transition-colors duration-100 ease-in-out
                                "
                                data-testid="bell"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">
                                    View notifications
                                </span>
                                <BellIcon
                                    aria-hidden="true"
                                    className="text-white h-6 w-6 transition-colors duration-100 ease-in-out hover:text-black"
                                />
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton
                                        className="relative rounded-full p-1
                                hover:outline-black hover:bg-red-900 transition-colors duration-100 ease-in-out
                                "
                                        data-testid="user"
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <UserIcon
                                            aria-hidden="true"
                                            className="text-white h-6 w-6 transition-colors duration-100 ease-in-out hover:text-white"
                                        />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    data-testid="user-menu"
                                >
                                    {profileMenu.map((item) => (
                                        <MenuItem key={item.name}>
                                            <a
                                                href={item.href}
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                                onClick={item.onclick}
                                                data-testid={item.dataTestID}
                                            >
                                                {item.name}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </header>
    )
}
