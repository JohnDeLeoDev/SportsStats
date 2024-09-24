export default function Profile() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    Profile
                </h1>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Welcome to your profile page.
                </p>
            </main>
        </div>
    )
}
