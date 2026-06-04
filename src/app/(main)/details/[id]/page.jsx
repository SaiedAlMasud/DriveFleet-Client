import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaBolt, FaMusic, FaSun, FaCalendarAlt } from 'react-icons/fa';

// Loading Component
function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
    );
}

// Car Details Component
async function CarContent({ id }) {
    const response = await fetch(`http://localhost:5000/cars/${id}`, {
        cache: 'no-store' // Don't cache, always fetch fresh data
    });
    
    if (!response.ok) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Failed to load car details
                </h2>
                <Link href="/exploreCars" className="text-blue-600 hover:underline">
                    Back to Explore Cars
                </Link>
            </div>
        );
    }
    
    const car = await response.json();
    
    if (!car) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">
                    Car not found
                </h2>
                <Link href="/exploreCars" className="text-blue-600 hover:underline">
                    Back to Explore Cars
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Back Button */}
            <Link
                href="/exploreCars"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
            >
                <FaArrowLeft />
                <span className="text-lg">Back</span>
            </Link>

            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                <div className="grid lg:grid-cols-2">
                    
                    {/* Left Side - Image */}
                    <div className="relative h-[350px] lg:h-[750px]">
                        <Image
                            src={car.imageURL}
                            alt={car.carName}
                            fill
                            className=""
                            priority
                        />
                    </div>

                    {/* Right Side - Details */}
                    <div className="p-8 lg:p-15 flex flex-col justify-between">
                        <div>
                            {/* Car Name */}
                            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                                {car.carName}
                            </h1>

                            {/* Price */}
                            <div className="mb-10">
                                <span className="text-orange-500 text-3xl lg:text-4xl mr-2">$</span>
                                <span className="text-3xl lg:text-4xl font-bold text-slate-900">
                                    {car.dailyRentPrice}
                                </span>
                                <span className="text-xl lg:text-2xl text-slate-500 ml-2"> per day</span>
                            </div>

                            {/* Info Section */}
                            <div className="space-y-6 mb-10">
                                {/* Seat Capacity */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                        <FaUser className="text-blue-600 text-xl" />
                                    </div>
                                    <span className="text-lg lg:text-xl text-slate-700">
                                        {car.seatCapacity} Seats Capacity
                                    </span>
                                </div>

                                {/* Pickup Location */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-blue-600 text-xl" />
                                    </div>
                                    <span className="text-lg lg:text-xl text-slate-700">
                                        {car.pickupLocation}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-10">
                                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                                    Description
                                </h3>
                                <p className="text-slate-600 text-lg lg:text-xl leading-relaxed">
                                    {car.description}
                                </p>
                            </div>
                        </div>

                        {/* Book Now Button */}
                        <button className="mt-12  bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-xl lg:text-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <FaCalendarAlt />
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main Page Component with Suspense for loading state
export default async function CarDetails({ params }) {
    const { id } = await params;

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <CarContent id={id} />
        </Suspense>
    );
}