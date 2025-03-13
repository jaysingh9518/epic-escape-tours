// import { useCallback, useEffect, useState } from "react";
import {
  Box,
} from "@mui/material"; // Import Button for CTA
import Hero from "@/components/Hero";
import Heroc from "@/components/Hero-2";
import Packages from "@/components/TopPackagesSlider";
import AboutComponent from "@/components/AboutComponent";
import GalleryComponent from "@/components/GalleryComponent";
import FeaturesComponent from "@/components/FeaturesComponent";
import OfferComponent from "@/components/OfferComponent";
import Destinations from "@/components/TopDestinationsSlider";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/FeaturedBlogSlider";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  
  return (
    <Box className="main" sx={{ width: "100%" }}>
      {/* Hero Section */}
      <Hero />
      {/* Hero Copy */}
      <Heroc />
      {/* Top Packages */}
      <Packages />
      {/* About */}
      <AboutComponent />
      {/* Gallery */}
      <GalleryComponent />
      {/* Features */}
      <FeaturesComponent />
      {/* Offer */}
      <OfferComponent />
      {/* Top Destination */}
      <Destinations />
      {/* Testimonials */}
      <Testimonials />
      {/* Blogs */}
      <Blogs />
      {/* Call To Action */}
      <CallToAction />
    </Box>
  );
}