'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-800 text-white py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 text-center">
        
        {/* Heading with fade-in and slide-down animation */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 px-2"
        >
          DriveFleet — Rent Your Dream Car
        </motion.h1>
        
        {/* Description with fade-in and slide-up animation */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
        >
          Experience premium vehicles at affordable prices. Book in minutes, drive in hours. Your perfect ride awaits.
        </motion.p>
        
        {/* Button with scale and bounce animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/exploreCars"
            className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 hover:-translate-y-2 transition duration-300 shadow-lg"
          >
            Explore Cars
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;