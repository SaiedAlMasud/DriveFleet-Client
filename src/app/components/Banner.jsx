import Link from 'next/link';

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-800 text-white py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 px-2">
          DriveFleet — Rent Your Dream Car
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Experience premium vehicles at affordable prices. Book in minutes, drive in hours. Your perfect ride awaits.
        </p>
        <Link
          href="#"
          className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-300 hover:-translate-y-3 transition duration-300 shadow-lg"
        >
          Explore Cars
        </Link>
      </div>
    </div>
  );
};

export default Banner;