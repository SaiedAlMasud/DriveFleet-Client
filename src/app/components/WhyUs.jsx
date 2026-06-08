'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaShieldAlt, FaHeadset, FaCar } from 'react-icons/fa';

const WhyUs = () => {
  const features = [
    {
      icon: <FaCalendarCheck className="w-8 h-8 text-blue-600" />,
      title: 'Easy Booking',
      description: 'Book your car in just a few clicks with our streamlined process'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-blue-600" />,
      title: 'Secure Payment',
      description: 'Your transactions are protected with industry-standard encryption'
    },
    {
      icon: <FaHeadset className="w-8 h-8 text-blue-600" />,
      title: '24/7 Support',
      description: 'Our team is always ready to help you with any questions'
    },
    {
      icon: <FaCar className="w-8 h-8 text-blue-600" />,
      title: 'Premium Fleet',
      description: 'Choose from a wide selection of well-maintained vehicles'
    }
  ];

  // Container variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Child item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-16 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            Why Choose DriveFleet
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl text-gray-600"
          >
            We make car rental simple, secure, and convenient
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="text-center bg-white px-5 py-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon with bounce animation */}
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="p-4 bg-blue-50 rounded-full">
                  {feature.icon}
                </div>
              </motion.div>
              
              {/* Title */}
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {feature.title}
              </motion.h3>
              
              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;