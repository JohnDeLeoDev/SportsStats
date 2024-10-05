export default function SearchResults() {
    return (
        <div
            className="flex flex-col gap-8 row-start-2 items-start transition-all duration-2000 ease-in-out transform w-full p-20
            justify-items-center text-center 
        h-full align-middle justify-items-center text-center
        
        "
        >
            <h1 className="text-4xl sm:text-5xl text-left sm:text-left font-bold">
                Search Results
            </h1>
            <p className="text-lg sm:text-xl text-center sm:text-left">
                Welcome to the search results page.
            </p>
            <div className="flex flex-row gap-4 items-center sm:items-start w-full flex-wrap">
                <ul className="flex flex-col gap-4 items-left sm:items-start w-full">
                    <li className="flex flex-row gap-4 items-center sm:items-start w-full">
                        <p className="text-lg sm:text-xl text-center sm:text-left">
                            Search result 1
                        </p>
                    </li>
                    <li className="flex flex-row gap-4 items-center sm:items-start w-full">
                        <p className="text-lg sm:text-xl text-center sm:text-left">
                            Search result 2
                        </p>
                    </li>
                    <li className="flex flex-row gap-4 items-center sm:items-start w-full">
                        <p className="text-lg sm:text-xl text-center sm:text-left">
                            Search result 3
                        </p>
                    </li>
                    <li className="flex flex-row gap-4 items-center sm:items-start w-full">
                        <p className="text-lg sm:text-xl text-center sm:text-left">
                            Search result 4
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
