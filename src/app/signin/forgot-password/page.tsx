'use client'

export default function ForgotPasswordPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl sm:text-5xl text-center sm:text-left font-bold">
                    Forgot Password
                </h1>
                <p className="text-lg sm:text-xl text-center sm:text-left">
                    Enter your email address to reset your password.
                </p>

                <div className="flex flex-column gap-4 items-center sm:items-start w-full flex-wrap max-w-[600px]">
                    <div className="flex flex-row gap-4 items-center sm:items-start w-full mt-3 ">
                        <input
                            className="w-full p-2 text-lg border-2 border-gray-300 rounded-lg"
                            placeholder="Email Address"
                        />
                        <button className="p-2 bg-blue-500 text-white rounded-lg">
                            Reset Password
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
