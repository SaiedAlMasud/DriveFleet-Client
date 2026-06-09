'use client';

import { useState, useEffect } from 'react';
import { authClient } from '@/app/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaUser, FaCar, FaDollarSign, FaChair } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function MyAddedCarsPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const fetchMyCars = async () => {
        try {
            const { data: session } = await authClient.getSession();
            if (!session?.user) {
                toast.error('Please login to view your cars');
                setLoading(false);
                return;
            }

            // Fix: Use getToken() instead of token()
            const tokenData = await authClient.token();
            // console.log('Auth token:', tokenData?.data?.token); // Debugging log

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/my-cars/${session.user.id}`, {
                headers: {
                    'Authorization': `Bearer ${tokenData?.data?.token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCars(data);


        } catch (error) {
            console.error('Error fetching cars:', error);
            toast.error('Failed to load your cars');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyCars();
    }, []);

    const handleDeleteCar = async (carId) => {
        const confirmed = window.confirm('Are you sure you want to delete this car? This action cannot be undone.');
        if (!confirmed) return;

        setDeletingId(carId);

        try {
            const tokenData = await authClient.token();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenData?.data?.token}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('Car deleted successfully');
                setCars(cars.filter(car => car._id !== carId));
            } else {
                const error = await response.json();
                toast.error(error.message || 'Failed to delete car');
            }
        } catch (error) {
            console.error('Error deleting car:', error);
            toast.error('Something went wrong');
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">My Added Cars</h1>
                    <Link
                        href="/addcar"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                        + Add New Car
                    </Link>
                </div>

                {cars.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                        <p className="text-black text-5xl font-bold mb-12">You haven't added any cars yet</p>
                        <Link href="/addcar" className="text-white bg-blue-600 text-lg hover:bg-blue-700 px-6 py-4 rounded-full font-semibold transition">
                            Add Your First Car
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.map((car) => (
                            <div key={car._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {/* Car Image */}
                                <div className="relative h-48 w-full">
                                    <img
                                        src={car.imageURL || '/car-placeholder.jpg'}
                                        alt={car.carName}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${car.available === true
                                        ? 'bg-green-500 text-white'
                                        : 'bg-red-500 text-white'
                                        }`}>
                                        {car.available === true ? 'Available' : 'Not Available'}
                                    </span>
                                </div>

                                {/* Car Details */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {car.carName}
                                        </h3>
                                        <div className="flex justify-center items-center gap-4">
                                            <Link
                                                href={`/update-car/${car._id}`}
                                                className="text-blue-500 hover:text-blue-700 transition p-1"
                                            >
                                                <FaEdit size={24} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteCar(car._id)}
                                                disabled={deletingId === car._id}
                                                className="text-red-400 hover:text-red-700 transition p-1 disabled:opacity-50"
                                            >
                                                {deletingId === car._id ? (
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                                                ) : (
                                                    <FaTrash size={24} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Car Type Badge */}
                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                                            {car.carType}
                                        </span>
                                    </div>

                                    {/* Car Specs */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaDollarSign className="text-blue-500" />
                                            <span className="text-lg font-semibold text-blue-600">
                                                ${car.dailyRentPrice}
                                            </span>
                                            <span className="text-sm text-gray-500">/day</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaChair className="text-blue-500" />
                                            <span>{car.seatCapacity} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FaMapMarkerAlt className="text-blue-500" />
                                            <span>{car.pickupLocation}</span>
                                        </div>
                                    </div>

                                    {/* Description Preview */}
                                    {car.description && (
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                            {car.description}
                                        </p>
                                    )}

                                    {/* View Details Button */}
                                    <Link
                                        href={`/details/${car._id}`}
                                        className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}