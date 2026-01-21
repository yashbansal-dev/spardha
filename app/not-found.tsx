import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
            <h2 className="text-4xl font-bold mb-4 text-neon-cyan">Not Found</h2>
            <p className="mb-6 text-gray-400">Could not find requested resource</p>
            <Link href="/" className="px-6 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all">
                Return Home
            </Link>
        </div>
    )
}
