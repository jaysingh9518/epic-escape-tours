"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const slides = [
  {
    image: "https://res.cloudinary.com/dkxmweeur/image/upload/v1739468771/bg1_jtm19m.jpg", // Moved to local public folder
    title: "Autumn",
    description: "Autumn, also known as fall, marks the transition from summer to winter. Experience the beauty of falling leaves and crisp air.",
  },
  {
    image: "https://res.cloudinary.com/dkxmweeur/image/upload/v1739468791/bg2_fpzkjh.jpg",
    title: "Winter",
    description: "Winter is the coldest season of the year, covering landscapes in snow and offering a magical wonderland experience.",
  },
  {
    image: "https://res.cloudinary.com/dkxmweeur/image/upload/v1739468773/bg3_gy45uj.jpg",
    title: "Summer",
    description: "Summer is the hottest of the four temperate seasons, perfect for beach trips, vacations, and outdoor adventures.",
  },
  {
    image: "https://res.cloudinary.com/dkxmweeur/image/upload/v1739468765/bg4_zttvo0.jpg",
    title: "Spring",
    description: "Spring marks the transition from winter to summer, bringing blooming flowers and rejuvenated landscapes.",
  },
];

// Using MUI styled for better integration with MUI components
const HeroContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "85vh",
  overflow: "hidden",

  "& .slide": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  "& .slide-content": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    maxWidth: "90%",
    background: "rgba(47, 46, 46, 0.5)",
    padding: "20px",
    borderRadius: "12px",
    backdropFilter: "blur(8px)",
    textAlign: "center",
    zIndex: 10,
  },

  "& .title": {
    fontSize: "clamp(2rem, 5vw, 4rem)",
    marginBottom: "10px",
    fontWeight: 700,
  },

  "& .season-suffix": {
    fontSize: "clamp(1rem, 2vw, 1.5rem)",
    marginLeft: "8px",
  },

  "& .description": {
    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
    maxWidth: "90%",
    margin: "0 auto",
    lineHeight: 1.5,
  },

  "& .thumbnails": {
    position: "absolute",
    bottom: "5%",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    zIndex: 10,
  },

  "& .thumb-container": {
    width: "50px",
    height: "30px",
    position: "relative",
    borderRadius: "5px",
    overflow: "hidden",
    cursor: "pointer",
    opacity: 0.6,
    transition: "opacity 0.3s, transform 0.3s",
    border: "2px solid transparent",
  },

  "& .thumb-container.active": {
    opacity: 1,
    borderColor: "#fff",
    transform: "scale(1.1)",
  },
}));

const ContactButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#222",
  padding: "10px 20px",
  marginTop: "20px",
  borderRadius: "8px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
}));

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      setDirection(1);
      setActiveIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleThumbnailClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2 } },
  };

  return (
    <HeroContainer>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={activeIndex}
          className="slide"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {/* Use Next.js Image component for optimized images */}
          <Image
            src={slides[activeIndex].image}
            alt={slides[activeIndex].title}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          
          <motion.div
            className="slide-content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="h2" className="title">
              {slides[activeIndex].title}
              <Typography component="span" className="season-suffix">
                Season
              </Typography>
            </Typography>
            
            <Typography variant="body1" className="description">
              {slides[activeIndex].description}
            </Typography>
            
            {/* Use Next.js Link for client-side navigation */}
            <Link href="/contact" passHref>
              <ContactButton variant="contained">
                Contact Us →
              </ContactButton>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <Box className="thumbnails">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`thumb-container ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleThumbnailClick(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="50px"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        ))}
      </Box>
    </HeroContainer>
  );
}