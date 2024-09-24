export default function Footer() {
    return (
        <footer className="flex items-center justify-between w-screen p-4 bg-gray-100 fixed bottom-0 z-10">
            <p className="text-sm">© 2024 SportsStats</p>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}
