'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';

const BookingModal = ({
    car,
    isOpen,
    onClose,
    needDriver,
    setNeedDriver,
    specialNote,
    setSpecialNote,
}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
                <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-3xl font-bold text-slate-800">
                            Book {car?.carName}
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-800 transition"
                        >
                            <FaTimes size={22} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-8">

                        {/* Price & Location */}
                        <div className="bg-slate-100 rounded-3xl p-6 mb-8">

                            <div className="flex justify-between items-center mb-4">
                                <span className="text-slate-500 text-xl">
                                    Daily Rate
                                </span>

                                <span className="text-4xl font-bold text-slate-800">
                                    ${car?.dailyRentPrice}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-xl">
                                    Pickup Location
                                </span>

                                <span className="text-slate-800 text-xl font-medium">
                                    {car?.pickupLocation}
                                </span>
                            </div>
                        </div>

                        {/* Driver Needed */}
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold text-slate-800 mb-4">
                                Do you need a driver?
                            </h3>

                            <div className="flex gap-16">

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="yes"
                                        checked={needDriver === 'yes'}
                                        onChange={(e) =>
                                            setNeedDriver(e.target.value)
                                        }
                                        className="w-5 h-5"
                                    />
                                    <span className="text-2xl text-slate-800">
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
                                        className="w-5 h-5"
                                    />
                                    <span className="text-2xl text-slate-800">
                                        No
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="mb-8">
                            <h3 className="text-3xl font-semibold text-slate-800 mb-4">
                                Special Note (Optional)
                            </h3>

                            <textarea
                                rows={5}
                                value={specialNote}
                                onChange={(e) =>
                                    setSpecialNote(e.target.value)
                                }
                                placeholder="Any special requirements or requests..."
                                className="w-full border border-slate-200 rounded-3xl p-5 text-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        {/* Button */}
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-5 rounded-full text-2xl font-semibold flex items-center justify-center gap-3"
                        >
                            <FaCalendarAlt />
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default BookingModal;