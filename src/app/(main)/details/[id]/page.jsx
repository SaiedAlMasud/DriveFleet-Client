'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    FaArrowLeft,
    FaUser,
    FaMapMarkerAlt,
    FaBolt,
    FaMusic,
    FaSun,
    FaCalendarAlt
} from 'react-icons/fa';

import BookingModal from '@/app/components/BookingModal';

const CarDetails = ({ params }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    const [needDriver, setNeedDriver] = useState('yes');
    const [specialNote, setSpecialNote] = useState('');

    useEffect(() => {
        async function getParams() {
            const resolvedParams = await params;

            fetch(`http://localhost:3000/cars/${resolvedParams.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setCar(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }

        getParams();
    }, [params]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-700">
                    Car not found
                </h2>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Back Button */}
                <Link
                    href="/exploreCars"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
                >
                    <FaArrowLeft />
                    <span>Back</span>
                </Link>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">

                    <div className="grid lg:grid-cols-2">

                        {/* Left Side */}
                        <div className="relative h-[350px] lg:h-[720px]">

                            <div className="absolute top-6 left-6 z-10">
                                <span className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow">
                                    {car.carType}
                                </span>
                            </div>

                            <Image
                                src={car.imageURL}
                                alt={car.carName}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Right Side */}
                        <div className="p-8 lg:p-10 flex flex-col justify-between">

                            <div>

                                <h1 className="text-5xl font-bold text-slate-900 mb-6">
                                    {car.carName}
                                </h1>

                                {/* Price */}
                                <div className="mb-10">
                                    <span className="text-orange-500 text-4xl mr-3">
                                        $
                                    </span>

                                    <span className="text-6xl font-bold text-slate-900">
                                        {car.dailyRentPrice}
                                    </span>

                                    <span className="text-2xl text-slate-500 ml-2">
                                        per day
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="space-y-6 mb-10">

                                    <div className="flex items-center gap-4">
                                        <FaUser className="text-blue-600 text-2xl" />

                                        <span className="text-2xl text-slate-700">
                                            {car.seatCapacity} Seats Capacity
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <FaMapMarkerAlt className="text-blue-600 text-2xl" />

                                        <span className="text-2xl text-slate-700">
                                            {car.pickupLocation}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-10">
                                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                                        Description
                                    </h3>

                                    <p className="text-slate-600 text-xl leading-relaxed">
                                        {car.description}
                                    </p>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-6">
                                        Features
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">

                                        <div className="flex items-center gap-3 text-xl text-slate-700">
                                            <FaBolt />
                                            <span>Autopilot</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-xl text-slate-700">
                                            <FaBolt />
                                            <span>Electric</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-xl text-slate-700">
                                            <FaSun />
                                            <span>Panoramic Roof</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-xl text-slate-700">
                                            <FaMusic />
                                            <span>Premium Audio</span>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            {/* Book Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-12 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-full text-2xl font-semibold flex items-center justify-center gap-3 transition"
                            >
                                <FaCalendarAlt />
                                Book Now
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                car={car}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                needDriver={needDriver}
                setNeedDriver={setNeedDriver}
                specialNote={specialNote}
                setSpecialNote={setSpecialNote}
            />
        </>
    );
};

export default CarDetails;