"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaArrowUp, FaWhatsapp } from 'react-icons/fa';

const ScrollToTop = () => {
  const pathname = usePathname();
  const [showButton, setShowButton] = useState(false);

  // Scroll to top on pathname change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll to top on page refresh
  useEffect(() => {
    const handleRefresh = () => window.scrollTo(0, 0);
    window.addEventListener('load', handleRefresh);
    return () => window.removeEventListener('load', handleRefresh);
  }, []);

  // Show button when scrolled down
  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle WhatsApp click (open WhatsApp chat)
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917452849199', '_blank'); // Replace with your WhatsApp number
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
      {/* Scroll-to-Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={24} />
        </button>
      )}

      {/* WhatsApp Button */}
      {showButton && (
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={24} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
