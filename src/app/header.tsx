import React from 'react'
import {appContext} from './app'
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems,} from '@headlessui/react'

import {Bars3Icon, UserIcon} from '@heroicons/react/24/outline'
import {style} from "@/app/style";


const navigation = [
    {name: 'SearchStats', href: '/', current: false},
    {name: 'Examples', href: '/examples', current: false},
    {name: 'About', href: '/about', current: false},
]

const appMenu = [
    {name: 'Home', href: '/'},
    {name: 'About', href: '/about'},
    {name: 'Search for a Player', href: '/searchPlayer'},
    {name: 'Search for a Team', href: '/searchTeam'},
]

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}

interface HeaderProps {
    currentRoute: string | null
}

export default function Header({currentRoute}: HeaderProps) {
    const {user, setLocalUser, setLocalSession} = React.useContext(appContext)

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
            {name: 'Sign In', href: '/signin', dataTestID: 'signin-button'},
        ]
    }

    async function handleSignOut() {
        setLocalUser(null)
        setLocalSession(null)
        window.location.href = '/signin'
    }

    return (
        <header
            data-testid="header"
            className={style.header}
        >
            <Disclosure
                as="nav"
                className={style.headerDisclosure}
            >
                <div className={style.headerDisclosureInner}>
                    <div className={style.headerMobile}>
                        {/* Mobile menu button*/}
                        <DisclosureButton
                            className={style.headerMobileButton}>
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block h-6 w-6 group-data-[open]:hidden"
                            />
                        </DisclosureButton>
                    </div>
                    <div className={style.headerNavArea}>
                        <div className={style.headerMenu}>
                            <Menu
                                as="div"
                                className={style.headerMenuButton}
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
                                    className={style.headerMenuItems}
                                    data-testid="main-menu"
                                >
                                    {appMenu.map((item) => (
                                        <MenuItem key={item.name}>
                                            <a
                                                href={item.href}
                                                className={style.headerMenuItem}

                                            >
                                                {item.name}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                        <div data-testid="site-title"
                             className={style.siteTitleContainer}>
                            <div className={style.siteTitleDiv}>
                                <a
                                    href="/"
                                    className={style.siteTitle}
                                >
                                    <h1 className={style.siteTitleFont}>
                                        SportsStats
                                    </h1>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={style.profileAreaDiv}>
                        {/* Profile dropdown */}
                        <Menu as="div" className={style.profileMenuDiv}>
                            <div>
                                <MenuButton
                                    className={style.profileButton}
                                    data-testid="user"
                                >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                    <UserIcon
                                        aria-hidden="true"
                                        className={style.profileIcon}
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className={style.profileMenuItems}
                                data-testid="user-menu"
                            >
                                {profileMenu.map((item) => (
                                    <MenuItem key={item.name}>
                                        <a
                                            href={item.href}
                                            className={style.profileMenuItem}
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
