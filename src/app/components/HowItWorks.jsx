import React from 'react';
import { FaSearch, FaCreditCard, FaRoad } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: <FaSearch className="w-8 h-8 text-blue-600" />,
      title: 'Browse & Select',
      description: 'Choose your perfect vehicle from our extensive collection of cars'
    },
    {
      number: 2,
      icon: <FaCreditCard className="w-8 h-8 text-blue-600" />,
      title: 'Book Online',
      description: 'Complete your booking with our secure and easy payment system'
    },
    {
      number: 3,
      icon: <FaRoad className="w-8 h-8 text-blue-600" />,
      title: 'Hit the Road',
      description: 'Pick up your car and enjoy your journey with complete peace of mind'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-2xl text-gray-600">
            Get on the road in three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center"
            >
              {/* Step Number Circle */}
              <div className="flex justify-center mb-10">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
              </div>

              {/* Connecting Line (between steps) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-0.5 bg-gray-300">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="p-3 bg-blue-50 rounded-full">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;