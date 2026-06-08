'use client';

import { motion } from 'framer-motion';
import CarCard from '@/app/components/CarCard';
import { useEffect, useState } from 'react';

const FeaturedSection = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch('http://localhost:5000/cars');
                const data = await res.json();
                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header Section with Animation */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className='text-center my-15'
            >
                <h1 className="text-5xl font-bold text-gray-800 mb-6">Featured Vehicles</h1>
                <p className="text-gray-600 text-2xl">Browse our handpicked selection of premium vehicles available for rent</p>
            </motion.div>

            {/* Cars Grid with Staggered Animation */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                            delayChildren: 0.3
                        }
                    }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 gap-10 p-6"
            >
                {cars.slice(0, 3).map((car, index) => (
                    <motion.div
                        key={car._id}
                        variants={{
                            hidden: { opacity: 0, y: 50, scale: 0.9 },
                            visible: { 
                                opacity: 1, 
                                y: 0, 
                                scale: 1,
                                transition: { 
                                    duration: 0.5,
                                    ease: "easeOut"
                                }
                            }
                        }}
                        whileHover={{ 
                            y: -10,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <CarCard car={car} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default FeaturedSection;