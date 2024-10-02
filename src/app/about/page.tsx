export default function About() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-2xl">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    About
                </h1>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Welcome to SportsStats, where your sports statistics are a
                    search away.
                </p>

                <hr className="w-full border-gray-300" />
                <p>
                    SportsStats is a free app that allows you to search for
                    sports statistics. We currently support the following
                    leagues:
                </p>
                <ul className="list-disc list-inside">
                    <li>MLB Baseball</li>
                </ul>
                <hr className="w-full border-gray-300" />
                <p>
                    We are a team of Computer Science students at WPI who love
                    sports. SportsStats is our way of combining our passion for
                    sports with our passion for technology. We hope you enjoy
                    using our app as much as we enjoyed building it!
                </p>
                <hr className="w-full border-gray-300" />
                <p>
                    Made by:
                    <ul className="list-disc list-inside">
                        <li>John DeLeo</li>
                        <li>Matthew Giorgio</li>
                        <li>Christopher Turner</li>
                    </ul>
                </p>
            </main>
        </div>
    )
}
