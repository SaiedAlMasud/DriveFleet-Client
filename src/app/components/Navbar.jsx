'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Cars', href: '/exploreCars' },
    { name: 'Add Cars', href: '/addcar' },
    { name: 'My Bookings', href: '/my-bookings' },
  ];

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="bg-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        
        {/* Logo Section */}
        <div className="flex items-center justify-start">
          <Image src='/NavbarLogo.png' alt='DriveFleet Logo' width={60} height={60} className="sm:w-[70px] sm:h-[70px] lg:w-[90px] lg:h-[60px]" />
          <h1 className='mx-2 sm:mx-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-black'>
            DriveFleet
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:block'>
          <ul className='flex space-x-6 lg:space-x-12'>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={`text-base lg:text-xl font-semibold transition ${
                    isActive(link.href) 
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                      : 'text-gray-700 hover:text-blue-500'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Login Button & Mobile Menu Toggle */}
        <div className='flex items-center gap-3 sm:gap-4'>
          <Link 
            href='/login' 
            className='text-white text-base sm:text-lg lg:text-2xl font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-blue-500 hover:bg-white hover:text-blue-500 transition'
          >
            Login
          </Link>

          {/* Mobile Menu Button using details/summary - No state required */}
          <details className='md:hidden'>
            <summary className='list-none p-2 rounded-md text-gray-700 hover:bg-gray-200 transition cursor-pointer'>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </summary>
            
            {/* Mobile Menu Dropdown */}
            <div className='absolute right-0 left-0 mt-2 bg-gray-100 border-t border-gray-200 py-4 px-4 shadow-lg'>
              <ul className='flex flex-col space-y-3'>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className={`block text-lg font-semibold transition py-2 ${
                        isActive(link.href) 
                          ? 'text-blue-600' 
                          : 'text-gray-700 hover:text-blue-500'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Navbar;