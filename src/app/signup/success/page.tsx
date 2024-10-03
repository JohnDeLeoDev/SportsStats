export default function AccountCreated() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    Account Created
                </h1>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Your account has been created successfully.
                </p>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Please sign in to continue.
                </p>
                <a
                    href="/signin"
                    className="p-2 bg-blue-500 text-white rounded-lg w-full max-w-[200px] text-center"
                >
                    Sign In
                </a>
            </main>
        </div>
    )
}
