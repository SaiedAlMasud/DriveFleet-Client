import CarCard from '@/app/components/CarCard';
import Link from 'next/link';


const FeaturedSection = async () => {
    const cars = await fetch('http://localhost:5000/cars').then(res => res.json());
    return (
        <div>
            <div className='text-center my-15'>
                <h1 className="text-5xl font-bold text-gray-800 mb-6">Featured Vehicles</h1>
                <p className="text-gray-600 text-2xl">Browse our handpicked selection of premium vehicles available for rent</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
                {cars.map((car) => (
                    <CarCard key={car._id} car={car} />
                ))}
            </div>
            <div className="text-center my-10">
                <Link
                    href="#"
                    className="px-6 py-3 bg-blue-600 text-white text-2xl rounded-xl hover:bg-blue-700 transition duration-300 font-semibold"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default FeaturedSection;