'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { authClient } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';

const BookingModal = ({
    car,
    isOpen,
    onClose,
    needDriver,
    setNeedDriver,
    specialNote,
    setSpecialNote,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleConfirmBooking = async () => {
        setIsLoading(true);
        
        try {
            // Get current user session
            const { data: session } = await authClient.getSession();
            
            if (!session?.user) {
                toast.error('Please login to book a car');
                onClose();
                return;
            }

            // Calculate total price (you can modify this based on rental days)
            const totalPrice = car?.dailyRentPrice;

            // Prepare booking data
            const bookingData = {
                carId: car?._id,
                carName: car?.carName,
                dailyRentPrice: car?.dailyRentPrice,
                pickupLocation: car?.pickupLocation,
                carImage: car?.imageURL,
                driverNeeded: needDriver === 'yes',
                specialNote: specialNote,
                totalPrice: totalPrice,
                bookingDate: new Date(),
                userId: session.user.id,
                userName: session.user.name,
                userEmail: session.user.email,
                status: 'confirmed'
            };
            const tokenData = await authClient.token();
            const token = tokenData?.data?.token;
            // Send booking data to your API
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Booking confirmed successfully!');
                // Reset form
                setNeedDriver('no');
                setSpecialNote('');
                onClose();
            } else {
                const error = await response.json();
                toast.error(error.message || 'Booking failed');
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-[9998]"
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9998,
                }}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="fixed inset-0 flex items-center justify-center z-[9999] p-10"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-modal-title"
            >
                <div
                    className="bg-white w-full max-w-[448px] rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                        width: '100%',
                        maxWidth: '448px',
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
                    }}
                >

                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-5 border-b border-slate-200">
                        <h2 id="booking-modal-title" className="text-xl font-bold text-slate-800 mt-4">
                            Book {car?.carName}
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-slate-700 hover:text-slate-950 transition"
                            aria-label="Close booking modal"
                        >
                            <FaTimes size={22} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-4">

                        {/* Price & Location */}
                        <div className="bg-slate-100 rounded-3xl p-4 mb-5">

                            <div className="flex justify-between items-center mb-3">
                                <span className="text-slate-500 text-lg">
                                    Daily Rate
                                </span>

                                <span className="text-2xl font-bold text-slate-800">
                                    ${car?.dailyRentPrice}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-lg">
                                    Pickup Location
                                </span>

                                <span className="text-slate-800 text-lg font-semibold text-right">
                                    {car?.pickupLocation}
                                </span>
                            </div>
                        </div>

                        {/* Driver Needed */}
                        <div className="mb-5 px-4">
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">
                                Do you need a driver?
                            </h3>

                            <div className="grid grid-cols-2 gap-4">

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="yes"
                                        checked={needDriver === 'yes'}
                                        onChange={(e) =>
                                            setNeedDriver(e.target.value)
                                        }
                                        className="w-4 h-4 accent-blue-600"
                                    />
                                    <span className="text-base text-slate-800">
                                        Yes
                                    </span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="no"
                                        checked={needDriver === 'no'}
                                        onChange={(e) =>
                                            setNeedDriver(e.target.value)
                                        }
                                        className="w-4 h-4 accent-blue-600"
                                    />
                                    <span className="text-base text-slate-800">
                                        No
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="mt-4 mb-4 px-4">
                            <h3 className="text-base font-semibold text-slate-800 mb-3">
                                Special Note (Optional)
                            </h3>

                            <textarea
                                rows={5}
                                value={specialNote}
                                onChange={(e) =>
                                    setSpecialNote(e.target.value)
                                }
                                placeholder="Any special requirements or requests..."
                                className="w-full min-h-[122px] border border-slate-200 rounded-3xl p-4 text-base outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleConfirmBooking}
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-full text-xl font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FaCalendarAlt />
                                    Confirm Booking
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default BookingModal;