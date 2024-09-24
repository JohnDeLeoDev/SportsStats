import React from 'react'

interface MenuProps {
    menu: boolean
    setMenu: (value: boolean) => void
}

export default function Menu({ menu, setMenu }: MenuProps) {
    return (
        <div className="menu">
            <button
                className="text-2xl font-bold"
                onClick={() => setMenu(!menu)}
            >
                ☰
            </button>
        </div>
    )
}
