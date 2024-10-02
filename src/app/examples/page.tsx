export default function Examples() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    SportsStats
                </h1>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Welcome to SportsStats, where your sports statistics are a
                    search away.
                </p>
                <div className="border-t border-gray-300 w-full"></div>
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    Example Queries for SportsStats
                </h1>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Here are some example queries you can try:
                </p>
                <ul className="text-lg sm:text-xl text-center sm:text-left list-disc list-inside">
                    <li>
                        What is the average number of points scored in an NBA
                        game?
                    </li>
                    <li>
                        How many goals did Lionel Messi score in the 2020/2021
                        season?
                    </li>
                    <li>
                        What is the average number of home runs hit in a MLB
                        game?
                    </li>
                    <li>
                        How many touchdowns did Tom Brady throw in the 2020/2021
                        season?
                    </li>
                </ul>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Enter a query in the search bar below to get started.
                </p>
                <div className="border-t border-gray-300 w-full"></div>
                <div className="flex flex-row gap-4 items-center sm:items-start w-full">
                    <input
                        className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                        placeholder="Search for a statistic"
                    />
                    <button className="p-2 bg-blue-500 text-white rounded-lg">
                        Search
                    </button>
                </div>
            </main>
        </div>
    )
}
