'use client';

import CarCard from '@/app/components/CarCard';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function ExploreCarClient({ initialCars }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All Types');
    const [cars] = useState(initialCars); // Data comes from server, no fetch needed

    const carTypes = ['All Types', 'SUV', 'Sedan', 'Hatchback', 'Luxury'];

    const filteredCars = cars.filter((car) => {
        const matchesSearch = car.carName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All Types' || car.carType === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <>
            <div className="py-16 bg-gray-50 mb-10">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3">
                        Explore Our Fleet
                    </h2>
                    <p className="text-xl text-gray-600">
                        Discover the perfect vehicle for your next adventure
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by car name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                        </div>

                        <div className="md:w-48">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                            >
                                {carTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <p className="text-gray-600">
                        Found <span className="font-semibold text-blue-600">{filteredCars.length}</span> cars
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-8 mb-15">
                {filteredCars.map((car) => (
                    <CarCard key={car._id} car={car} />
                ))}
            </div>

            {filteredCars.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No cars found matching your criteria</p>
                </div>
            )}
        </>
    );
}