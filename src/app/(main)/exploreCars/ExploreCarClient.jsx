'use client';

import CarCard from '@/app/components/CarCard';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { authClient } from '@/app/lib/auth-client';

export default function ExploreCarClient({ initialCars, initialSearch = '', initialType = 'All Types' }) {
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [selectedType, setSelectedType] = useState(initialType);
    const [isLoading, setIsLoading] = useState(false);
    const [cars, setCars] = useState(initialCars);
    const router = useRouter();
    const pathname = usePathname();

    const carTypes = ['All Types', 'SUV', 'Sedan', 'Hatchback', 'Luxury'];

    // Fetch cars when searchTerm or selectedType changes
    useEffect(() => {
        const fetchCars = async () => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchTerm && searchTerm.trim() !== '') {
                    params.append('search', searchTerm);
                }
                if (selectedType && selectedType !== 'All Types') {
                    params.append('type', selectedType);
                }
                const tokenData = await authClient.token();

                const url = `http://localhost:5000/cars${params.toString() ? `?${params.toString()}` : ''}`;
                const response = await fetch(url, {
                    method: "GET",
                });
                const data = await response.json();
                setCars(data);

                // Update URL without page reload
                const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
                router.replace(newUrl, { scroll: false });
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, [searchTerm, selectedType, pathname, router]);

    const handleSearch = () => {
        // Trigger re-fetch by updating state
        // The useEffect will handle the actual fetch
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Loading spinner
    if (isLoading && cars.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                <p className="mt-4 text-gray-600 text-lg">Loading cars...</p>
            </div>
        );
    }

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
                                onKeyPress={handleKeyPress}
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
                        Found <span className="font-semibold text-blue-600">{cars.length}</span> cars
                    </p>
                </div>
            </div>

            {isLoading && cars.length > 0 && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-600"></div>
                    <p className="ml-2 text-gray-500">Updating results...</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-8 mb-15">
                {cars.map((car) => (
                    <CarCard key={car._id} car={car} />
                ))}
            </div>

            {cars.length === 0 && !isLoading && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No cars found matching your criteria</p>
                </div>
            )}
        </>
    );
}