'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCar, FaHome } from 'react-icons/fa';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
                {/* Animated Car Icon */}
                <div className="mb-8 animate-pulse">
                    <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                        <FaCar className="w-16 h-16 text-blue-600" />
                    </div>
                </div>

                {/* Error Number */}
                <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4">404</h1>

                {/* Friendly Error Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h2>

                <p className="text-base md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Button Group */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold transition"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition"
                    >
                        <FaHome className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-gray-500 mb-4">Here are some helpful links:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                        <Link href="/exploreCars" className="text-blue-600 hover:underline">Explore Cars</Link>
                        <Link href="/addcar" className="text-blue-600 hover:underline">Add Car</Link>
                        <Link href="/my-bookings" className="text-blue-600 hover:underline">My Bookings</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}