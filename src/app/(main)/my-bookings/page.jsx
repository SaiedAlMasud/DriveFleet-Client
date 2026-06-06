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
        try {
            const { data: session } = await authClient.getSession();
            if (!session?.user) {
                toast.error('Please login to view bookings');
                return;
            }

            const response = await fetch(`http://localhost:5000/api/bookings/user/${session.user.id}`);
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to load bookings');
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
            });

            if (response.ok) {
                toast.success('Booking cancelled successfully');
                // Remove the deleted booking from the list
                setBookings(bookings.filter(booking => booking._id !== bookingId));
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-full mx-auto px-4">
                <h1 className="text-4xl font-bold text-black mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-white space-y-2 rounded-xl shadow-lg">
                        <p className="text-black font-bold text-5xl mb-12">No bookings found</p>
                        <Link href="/exploreCars" className="text-blue-600 mt-2 py-2 px-4 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition">
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
                                            <h3 className="text-4xl font-bold text-gray-900 mb-2">
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

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 space-y-1">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FaMapMarkerAlt className="text-blue-500" />
                                                <span className='text-xl'>{booking.pickupLocation}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FaCalendarAlt className="text-blue-500" />
                                                <span className='text-xl'>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FaCar className="text-blue-500" />
                                                <span className='text-xl'>Driver: {booking.driverNeeded ? 'Yes' : 'No'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <FaUser className="text-blue-500" />
                                                <span className='text-xl'>{booking.userName}</span>
                                            </div>
                                        </div>

                                        {booking.specialNote && (
                                            <p className="text-gray-600 text-md mb-3">
                                                Note: {booking.specialNote}
                                            </p>
                                        )}

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-lg text-gray-600">Total Price</span>
                                                <p className="text-2xl font-bold text-blue-600">
                                                    ${booking.totalPrice}
                                                </p>
                                            </div>
                                            <span className={`badge px-3 py-1 rounded-full text-lg font-semibold ${booking.status === 'confirmed'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
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