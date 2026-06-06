'use client';

import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import BookingModal from './BookingModal';

export default function BookNowButton({ car }) {
    const [isOpen, setIsOpen] = useState(false);
    const [needDriver, setNeedDriver] = useState('no');
    const [specialNote, setSpecialNote] = useState('');

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="mt-12 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full text-xl lg:text-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl w-full"
            >
                <FaCalendarAlt />
                Book Now
            </button>

            <BookingModal
                car={car}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                needDriver={needDriver}
                setNeedDriver={setNeedDriver}
                specialNote={specialNote}
                setSpecialNote={setSpecialNote}
            />
        </>
    );
}
