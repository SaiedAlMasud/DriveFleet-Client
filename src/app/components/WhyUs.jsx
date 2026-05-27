import React from 'react';
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

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Why Choose DriveFleet
          </h2>
          <p className="text-2xl text-gray-600">
            We make car rental simple, secure, and convenient
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center bg-white px-5 py-8 rounded-lg hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-50 rounded-full">
                  {feature.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;