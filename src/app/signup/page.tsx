export default function Signup() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    Sign Up
                </h1>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Welcome to the sign up page.
                </p>
                <div className="flex flex-row gap-4 items-center sm:items-start w-full flex-wrap max-w-[600px]">
                    <div className="flex flex-row gap-4 items-center sm:items-start w-full mt-3 mb-3">
                        <input
                            className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                            placeholder="First Name"
                        />
                        <input
                            className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                            placeholder="Last Name"
                        />
                    </div>

                    <div className="flex flex-row gap-4 items-center sm:items-start w-full flex-wrap mt-3 mb-3">
                        <input
                            className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                            placeholder="Email Address"
                        />
                        <input
                            className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                            placeholder="Password"
                        />
                        <input
                            className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <button className="w-full p-3 bg-blue-500 text-white rounded-lg">
                        Sign Up
                    </button>
                </div>
            </main>
        </div>
    )
}
