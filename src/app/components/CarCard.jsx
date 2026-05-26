import Image from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';
import { IoPeople } from 'react-icons/io5';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Car Image */}
      <div className="relative h-48 w-full">
        <Image
          src={car.image || '/car-placeholder.jpg'}
          alt={car.name}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Car Details */}
      <div className="p-4">
        {/* Car Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {car.name}
        </h3>
        
        {/* Seats & Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <IoPeople className='text-blue-500' />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaLocationDot className='text-blue-500' />
            <span>{car.location}</span>
          </div>
        </div>
        
        {/* Price & Button */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">$ {car.price}</span>
            <span className="text-gray-500"> /day</span>
          </div>
          <Link
            href={`/car/${car.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-sm font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;