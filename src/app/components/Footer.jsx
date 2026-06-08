import React from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-5">
                <Image src='/NavbarLogo.png' alt='DriveFleet Logo' width={60} height={60} className="w-[50px] h-[50px]" />
                <h2 className="text-3xl font-bold text-white mb-4">DriveFleet</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted car rental platform.
              <br />
              Experience premium vehicles at affordable prices with seamless booking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/exploreCars" className="text-gray-400 hover:text-white transition-colors">
                  Explore Cars
                </Link>
              </li>
              <li>
                <Link href="/addcar" className="text-gray-400 hover:text-white transition-colors">
                  List Your Car
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="text-gray-400 hover:text-white transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="w-4 h-4" />
                <span>support@drivefleet.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Los Angeles, CA 90012</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                aria-label="X (Twitter)"
              >
                <FaTwitter className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-lg">
            &copy; {new Date().getFullYear()} DriveFleet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;