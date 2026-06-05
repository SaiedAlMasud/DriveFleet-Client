'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '../lib/auth-client';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get session using a direct function call (runs on every render but sets state only once)
  if (loading) {
    authClient.getSession().then(({ data: session }) => {
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    });
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Cars', href: '/exploreCars' },
    { name: 'Add Cars', href: '/addcar' },
    { name: 'My Bookings', href: '/my-bookings' },
  ];

  const isActive = (path) => {
    return pathname === path;
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setUser(null);
    setIsDropdownOpen(false);
    router.push('/');
    window.location.href = '/';
  };

  const handleProfileClick = () => {
    router.push('/profile');
    setIsDropdownOpen(false);
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

        {/* User Menu */}
        <div className='flex items-center gap-3 sm:gap-4'>
          {!loading && user ? (
            // Logged In - Show user profile circle and name
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden md:block text-gray-700 font-semibold hover:text-black">
                  {user.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/my-added-cars"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Added Cars
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            !loading && (
              // Logged Out - Show Login and Register buttons
              <div className="flex items-center gap-3">
                <Link 
                  href='/login' 
                  className='text-blue-600 text-base sm:text-lg lg:text-xl font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition'
                >
                  Login
                </Link>
                <Link 
                  href='/register' 
                  className='text-blue-600 text-base sm:text-lg lg:text-xl font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition'
                >
                  Register
                </Link>
              </div>
            )
          )}

          {/* Mobile Menu Button */}
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
                {user ? (
                  // Logged in user section in mobile menu
                  <>
                    <hr className="my-2" />
                    <li className="px-2 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link 
                        href="/profile" 
                        className="block text-gray-700 hover:text-blue-500 transition px-2 py-2"
                        onClick={() => {
                          const details = document.querySelector('details');
                          if (details) details.open = false;
                        }}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/my-added-cars" 
                        className="block text-gray-700 hover:text-blue-500 transition px-2 py-2"
                        onClick={() => {
                          const details = document.querySelector('details');
                          if (details) details.open = false;
                        }}
                      >
                        My Added Cars
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          const details = document.querySelector('details');
                          if (details) details.open = false;
                        }}
                        className="w-full text-left text-red-600 hover:bg-gray-50 transition px-2 py-2 rounded-lg"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  // Logged out user section in mobile menu
                  <>
                    <hr className="my-2" />
                    <li>
                      <Link 
                        href="/login" 
                        className="block text-blue-600 font-semibold transition px-2 py-2"
                        onClick={() => {
                          const details = document.querySelector('details');
                          if (details) details.open = false;
                        }}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/register" 
                        className="block text-gray-700 font-semibold transition px-2 py-2"
                        onClick={() => {
                          const details = document.querySelector('details');
                          if (details) details.open = false;
                        }}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Navbar;