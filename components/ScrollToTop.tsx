"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Fab, Zoom } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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
    <>
      {/* Scroll-to-Top Floating Button */}
      <Zoom in={showButton}>
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="medium"
          aria-label="scroll to top"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            color: 'white',
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Zoom>

      {/* WhatsApp Floating Button */}
      <Zoom in={showButton}>
        <Fab
          onClick={handleWhatsAppClick}
          color="success"
          size="medium"
          aria-label="WhatsApp"
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            zIndex: 1000,
            backgroundColor: '#25D366',
            '&:hover': { backgroundColor: '#128C7E' },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Zoom>
    </>
  );
};

export default ScrollToTop;
