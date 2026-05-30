import Image from 'next/image';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';
import { IoPeople } from 'react-icons/io5';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      
      {/* Availability Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className='px-3 py-1 rounded-full text-sm font-semibold  
            bg-orange-500 text-white' 
            >{car.carType}
        </span>
      </div>

      {/* Car Image */}
      <div className="relative h-80 w-full">
        <Image
          src={car.imageURL || '/car-placeholder.jpg'}
          alt={car.carName}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Car Details */}
      <div className="p-4">
        {/* Car Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {car.carName}
        </h3>
        
        {/* Seats & Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <IoPeople className='text-blue-500' />
            <span>{car.seatCapacity} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaLocationDot className='text-blue-500' />
            <span>{car.pickupLocation}</span>
          </div>
        </div>
        
        {/* Price & Button */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">$ {car.dailyRentPrice}</span>
            <span className="text-gray-500"> /day</span>
          </div>
          <Link
            href={`/details/${car._id}`}
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