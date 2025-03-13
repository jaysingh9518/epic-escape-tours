import React from "react";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import "@/styles/globals.css";
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps } : AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

// <Router>
//   <ScrollToTop />
//   <CustomCursorScroll />
//   <EnquiryDialog />
//   <Header />
//   <Routes>
    
//     <Route path="/" element={<MetaDataWrapper />} > <Navigate to="/home" /></Route>

//     <Route
//       path="/home"
//       element={
//         <MetaDataWrapper 
//           browserTitle="Home | Heaven of Holiday" 
//           seoTitle="Plan Your Dream Vacation | Exclusive Holiday Packages"
//           description="Explore top destinations, exclusive travel deals, and tailored holiday packages with Heaven of Holiday. Your dream trip starts here!"
//           canonical="https://www.heavenofholiday.com/home"
//         >
//           <Home />
//         </MetaDataWrapper>
//       }
//     />
    
//     <Route
//       path="/search"
//       element={
//         <MetaDataWrapper 
//           browserTitle="Search Travel Packages | Heaven of Holiday" 
//           seoTitle="Find Your Perfect Getaway | Compare Holiday Deals"
//           description="Use our search tool to discover and compare the best travel packages, flights, and hotel deals tailored just for you."
//           canonical="https://www.heavenofholiday.com/search"
//         >
//           <Search />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="/packages"
//       element={
//         <MetaDataWrapper 
//           browserTitle="All Travel Packages | Heaven of Holiday" 
//           seoTitle="Explore the Best Holiday Packages | Affordable & Luxury Travel"
//           description="From budget-friendly getaways to luxury escapes, browse a wide range of holiday packages designed to fit your travel needs."
//           canonical="https://www.heavenofholiday.com/packages"
//         >
//           <Packages />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="/about"
//       element={
//         <MetaDataWrapper 
//           browserTitle="About Us | Heaven of Holiday" 
//           seoTitle="Meet the Experts Behind Your Dream Vacations"
//           description="Learn about Heaven of Holiday, our passion for travel, and our commitment to crafting unforgettable journeys."
//           canonical="https://www.heavenofholiday.com/about"
//         >
//           <About />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="/contact"
//       element={
//         <MetaDataWrapper 
//           browserTitle="Contact Us | Heaven of Holiday" 
//           seoTitle="Get in Touch for Personalized Travel Assistance"
//           description="Have questions or need help planning your trip? Contact Heaven of Holiday for expert travel guidance and support."
//           canonical="https://www.heavenofholiday.com/contact"
//         >
//           <Contact />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="/blogs"
//       element={
//         <MetaDataWrapper 
//           browserTitle="Travel Blogs | Heaven of Holiday" 
//           seoTitle="Discover Travel Tips & Destination Guides"
//           description="Get inspired with our travel blogs featuring expert tips, adventure stories, and must-visit destinations."
//           canonical="https://www.heavenofholiday.com/blogs"
//         >
//           <Blogs />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="/blog/:id"
//       element={
//         <MetaDataWrapper 
//           browserTitle="Blog Details | Heaven of Holiday" 
//           seoTitle="Read Expert Travel Insights & Stories"
//           description="Explore in-depth travel guides, hidden gems, and expert insights in our detailed travel blog articles."
//           canonical="https://www.heavenofholiday.com/blog/:id"
//         >
//           <BlogDetails />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="/package/:id"
//       element={
//         <MetaDataWrapper 
//           browserTitle="Package Details | Heaven of Holiday" 
//           seoTitle="Explore Your Dream Destination Package"
//           description="Get detailed information on our exclusive travel packages, including itinerary, pricing, and must-visit spots."
//           canonical="https://www.heavenofholiday.com/package/:id"
//         >
//           <Package />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="/booking/:packageId"
//       element={
//         <MetaDataWrapper 
//           browserTitle="Booking Page | Heaven of Holiday" 
//           seoTitle="Secure Your Spot | Easy Travel Booking"
//           description="Book your perfect holiday package hassle-free with Heaven of Holiday. Secure your trip today!"
//           canonical="https://www.heavenofholiday.com/booking/:packageId"
//         >
//           <Booking />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="/booking/confirmation"
//       element={
//         <MetaDataWrapper 
//           browserTitle="Booking Confirmation | Heaven of Holiday" 
//           seoTitle="Your Booking is Confirmed! | Heaven of Holiday"
//           description="Thank you for booking with Heaven of Holiday! Get ready for an unforgettable travel experience."
//           canonical="https://www.heavenofholiday.com/booking/confirmation"
//         >
//           <BookingConfirmation />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="/package/ratings/:id"
//       element={
//         <MetaDataWrapper
//           browserTitle="Package Ratings & Reviews | Heaven of Holiday"
//           seoTitle="Honest Travel Package Reviews & Ratings | Heaven of Holiday"
//           description="Read genuine traveler reviews and ratings for our holiday packages. See what others are saying before booking your next adventure!"
//           canonical="https://www.heavenofholiday.com/package/ratings/:id"
//         >
//           <RatingsPage />
//         </MetaDataWrapper>
//       }
//     />
//     <Route
//       path="/terms"
//       element={
//         <MetaDataWrapper
//           browserTitle="Terms & Conditions | Heaven of Holiday"
//           seoTitle="Terms & Conditions - Your Travel Agreement | Heaven of Holiday"
//           description="Understand our terms and conditions before booking your dream vacation. Know your rights, policies, and travel guidelines."
//           canonical="https://www.heavenofholiday.com/terms"
//         >
//           <Terms />
//         </MetaDataWrapper>
//       }
//     />
//     <Route
//       path="/privacy"
//       element={
//         <MetaDataWrapper
//           browserTitle="Privacy Policy | Heaven of Holiday"
//           seoTitle="Your Data, Our Responsibility | Privacy Policy - Heaven of Holiday"
//           description="We prioritize your privacy! Learn how we collect, store, and protect your personal information while you plan your dream getaway."
//           canonical="https://www.heavenofholiday.com/privacy"
//         >
//           <Privacy />
//         </MetaDataWrapper>
//       }
//     />

//     <Route
//       path="*"
//       element={
//         <MetaDataWrapper 
//           browserTitle="404 Not Found | Heaven of Holiday" 
//           seoTitle="Oops! Page Not Found | Heaven of Holiday"
//           description="Looks like you've landed on an unknown page. Return to our homepage and continue exploring!"
//         >
//           <NotFound />
//         </MetaDataWrapper>
//       }
//     />
//     <Route
//       path="/business-card"
//       element={
//         <MetaDataWrapper 
//           browserTitle="Business Card | Heaven of Holiday" 
//           seoTitle="Get our Business Card | Heaven of Holiday"
//           description="Download our business card and showcase your travel expertise to potential clients and customers."
//         >
//           <BusinessCard />
//         </MetaDataWrapper>
//       }
//     />
//   </Routes>
//   <Footer />
// </Router>