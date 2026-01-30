'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white p-4">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong!</h2>
            <p className="mb-4 text-gray-400 max-w-md text-center">{error.message}</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
