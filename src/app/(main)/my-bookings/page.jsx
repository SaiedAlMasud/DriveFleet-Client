'use client';

import { useState, useEffect } from 'react';
import { authClient } from '@/app/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaCar, FaUser, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);

        // Add minimum 1 second delay to show loading spinner
        const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const { data: session } = await authClient.getSession();
            if (!session?.user) {
                toast.error('Please login to view bookings');
                setBookings([]);
                await minimumLoadingTime;
                setLoading(false);
                return;
            }
            const tokenData = await authClient.token();
            const response = await fetch(`http://localhost:5000/api/bookings/user/${session.user.id}`, {
                headers: {
                    'Authorization': `Bearer ${tokenData.token}`
                }
            });
            const data = await response.json();
            setBookings(data);
            await minimumLoadingTime;
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to load bookings');
            setBookings([]);
            await minimumLoadingTime;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        const confirmed = window.confirm('Are you sure you want to cancel this booking?');
        if (!confirmed) return;

        setDeletingId(bookingId);

        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${tokenData.token}`
                }
            });

            if (response.ok) {
                toast.success('Booking cancelled successfully');
                setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
            } else {
                const error = await response.json();
                toast.error(error.message || 'Failed to cancel booking');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            toast.error('Something went wrong');
        } finally {
            setDeletingId(null);
        }
    };

    // Show loading spinner
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-black text-2xl">Loading my bookings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-full mx-auto px-4">
                <h1 className="text-4xl font-bold text-black mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-white space-y-4 rounded-xl shadow-lg">
                        <p className="text-black font-bold text-3xl md:text-5xl mb-6">No bookings found</p>
                        <Link
                            href="/exploreCars"
                            className="inline-block text-white bg-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Browse Cars
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    {/* Car Image */}
                                    <div className="md:w-48 h-48 relative">
                                        <img
                                            src={booking.carImage || '/car-placeholder.jpg'}
                                            alt={booking.carName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Booking Details */}
                                    <div className="flex-1 p-6">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                                {booking.carName}
                                            </h3>
                                            <button
                                                onClick={() => handleDeleteBooking(booking._id)}
                                                disabled={deletingId === booking._id}
                                                className="delete-btn transition p-2 rounded-full hover:bg-red-50 disabled:opacity-50"
                                            >
                                                {deletingId === booking._id ? (
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                                                ) : (
                                                    <FaTrash size={20} className="text-red-500" />
                                                )}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FaMapMarkerAlt className="text-blue-500" />
                                                <span className='text-lg md:text-xl'>{booking.pickupLocation}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FaCalendarAlt className="text-blue-500" />
                                                <span className='text-lg md:text-xl'>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FaCar className="text-blue-500" />
                                                <span className='text-lg md:text-xl'>Driver: {booking.driverNeeded ? 'Yes' : 'No'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FaUser className="text-blue-500" />
                                                <span className='text-lg md:text-xl'>{booking.userName}</span>
                                            </div>
                                        </div>

                                        {booking.specialNote && (
                                            <p className="text-gray-600 text-base md:text-lg mb-3">
                                                Note: {booking.specialNote}
                                            </p>
                                        )}

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-base md:text-lg text-gray-600">Total Price</span>
                                                <p className="text-2xl md:text-3xl font-bold text-blue-600">
                                                    ${booking.totalPrice}
                                                </p>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full text-base md:text-lg font-semibold ${booking.status === 'confirmed'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-yellow-500 text-white'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}