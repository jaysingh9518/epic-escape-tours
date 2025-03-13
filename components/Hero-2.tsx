import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  InputAdornment,
  Fade,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PushPinIcon from "@mui/icons-material/PushPin";
import CompassIcon from "@mui/icons-material/Explore";
// Cloudinary image URLs
const heroBg1 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731350983/packages/kwg7qscmufcknbbwao9q.jpg";
const heroBg2 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731350985/packages/u5xego6zvdhx4oc7ypvc.jpg";
const heroBg3 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731350988/packages/o5l3zunohbe62eiagce5.jpg";
const heroObject = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731350989/packages/qjvwt1amd5f5quh4fszj.png";
const mapBg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731350990/packages/fl8kc95cpjtafdzfzm0q.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    packageType: "",
    nights: "",
    days: "",
  });

  const router = useRouter();

  const handleSearch = useCallback(() => {
    const { searchTerm, packageType, days, nights } = searchParams;
    const formattedPackageType = (packageType || "").replace(/\s/g, "+");
    router.push(
      `/packages?search=${searchTerm}&packageType=${formattedPackageType}&nights=${nights}&days=${days}&filter=all&page=1`
    );
  }, [router, searchParams]);

  const slides = [
    {
      id: 1,
      title: "Experience Your Dream Getaway with Heaven of Holiday",
      subtitle: "Start Your Journey",
      text: "Uncover hidden gems and breathtaking destinations tailored for the perfect escape. Let's make memories together.",
      bgImage: heroBg1,
    },
    {
      id: 2,
      title: "Embrace the Adventure Beyond Limits",
      subtitle: "Your Journey Awaits",
      text: "Dive into extraordinary travel experiences and discover the world's wonders with Heaven of Holiday. Start exploring today!",
      bgImage: heroBg2,
    },
    {
      id: 3,
      title: "Join Us on a Path to Unforgettable Moments",
      subtitle: "Book Your Adventure",
      text: "Find yourself in captivating landscapes and enriching cultures. Your adventure begins here with Heaven of Holiday.",
      bgImage: heroBg3,
    },
  ];

  const handleNext = useCallback(() => {
    setFadeIn(false); // Start fade-out

    // Use setTimeout to transition to the next slide
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      setFadeIn(true);
    }, 350);
  }, [slides.length]);

  const handlePrev = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
      );
      setFadeIn(true);
    }, 350); // Duration of fade-out transition
  };

  useEffect(() => {
    const autoSlide = setInterval(handleNext, 8000); // Auto-slide every 8 seconds
    return () => clearInterval(autoSlide);
  }, [handleNext]);

  const formControlStyles = {
    mb: 2,
    bgcolor: "white",
    borderRadius: "10px",
    textAlign: "left",
    "&:hover": {
      boxShadow: "0px 6px 15px rgba(0,0,0,0.4)",
      borderColor: "#FF5722",
    },
    "&.Mui-focused": {
      boxShadow: "0px 6px 15px rgba(0,0,0,0.4)",
      borderColor: "#FF5722",
    },
  };

  const textFieldStyles = {
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
    "&:before, &:after": {
      borderColor: "transparent",
    },
  };

  const { title, subtitle, text, bgImage } = slides[currentSlide];

  return (
    <Box component="section" sx={{ position: "relative", overflow: "hidden" }}>
      {/* Background Slide */}
      <Fade in={fadeIn} timeout={1000}>
        <Box
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            minHeight: "600px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          {/* Slide Content */}
          <Box
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              height: "100%",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Column for mobile, row for desktop
                alignItems: "center", // Center alignment for mobile
                justifyContent: "center", // Center alignment for row layout
                gap: 2, // Space between boxes
                mt: {xs: 2, sm: 4},
                mx: "auto",
                mb: 6, // Bottom margin
                width: { xs: "100%", sm: "80%" }, // Top margin for layout spacing
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                  flex: { xs: "100%", md: "60%" }, // Full width on mobile, 60% on desktop
                  textAlign: { xs: "center", md: "left" }, // Center text on mobile
                  pr: { md: 4 }, // Padding on right for desktop
                  mb: { xs: 2, md: 0 }, // Bottom margin on mobile
                  width: "100%", // Full width within parent box
                }}
              >
                <Typography
                  sx={{
                    color: "#FF5722",
                    fontWeight: 700,
                    fontSize: { xs: "1.4rem", md: "1.8rem" }, // Smaller font on mobile
                    mb: 1,
                    lineHeight: "1.5",
                  }}
                >
                  {subtitle}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "2.5rem", md: "3.5rem" }, // Smaller font on mobile
                    mb: 1,
                    lineHeight: "1.3",
                  }}
                >
                  {title}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: "1.1rem", md: "1.4rem" }, // Smaller font on mobile
                    mb: 2, // Adjusted spacing
                    lineHeight: "1.5",
                    textAlign: { xs: "center", md: "left" },
                  }}
                  component={"p"}
                >
                  {text}
                </Typography>

                <Button
                  variant="contained"
                  href="about"
                  sx={{
                    mt: { xs: 2, md: 3 }, // More margin-top on desktop
                    bgcolor: "#FF5722",
                    color: "white",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#E64A19" },
                    borderRadius: "10px",
                    padding: { xs: "8px 16px", md: "10px 20px" }, // Smaller padding on mobile
                    fontSize: { xs: "0.9rem", md: "1rem" }, // Font size adjustment
                  }}
                >
                  READ MORE
                </Button>
              </Box>

              {/* Second Box with 35-40% width on desktop */}
              <Box
                sx={{
                  flex: { xs: "100%", md: "35%" },
                  backgroundImage: `url(${mapBg})`,
                  backgroundSize: "cover",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  padding: { xs: 2, sm: 4 },
                  borderRadius: 4,
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                  textAlign: "center",
                  position: "relative",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    lineHeight: 1.3,
                    textAlign: "center",
                    mb: 1,
                    color: "primary.main",
                    fontWeight: 700,
                  }}
                >
                  Search Your Next Adventure
                </Typography>

                <Box
                  sx={{
                    position: "absolute",
                    right: "-120px",
                    bottom: "10px",
                    width: "80%",
                    zIndex: 1,
                  }}
                >
                  <img src={heroObject} alt="hero shape" style={{ maxWidth: "100%", height: "auto" }} />
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 2,
                    gap: 0.5, // Add gap for vertical spacing
                  }}
                >
                  {/* Where To? Field */}
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      lineHeight: {xs: "1.2rem", sm: "1.5rem"},
                      textAlign: "left",
                      mb: {xs: 0.5, sm: 1},
                      color: "#1c1c1c",
                      fontWeight: 700,
                    }}
                  >
                    Where To?
                  </Typography>
                  <FormControl fullWidth sx={formControlStyles}>
                    <TextField
                      placeholder="Where To?"
                      variant="outlined"
                      fullWidth
                      value={searchParams.searchTerm}
                      onChange={(e) =>
                        setSearchParams((prev) => ({
                          ...prev,
                          searchTerm: e.target.value,
                        }))
                      }
                      sx={textFieldStyles}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CompassIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>

                  <Box sx={{ padding: 0, width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" }, // Column on xs, row on sm and up
                        gap: { xs: 0.5, sm: 3 }, // Add gap for consistent horizontal spacing
                      }}
                    >
                      {/* Nights Field */}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            lineHeight: {xs: "1.2rem", sm: "1.5rem"},
                            textAlign: "left",
                            mb: {xs: 0.5, sm: 1},
                            color: "#1c1c1c",
                            fontWeight: 700,
                          }}
                        >
                          Nights
                        </Typography>
                        <FormControl fullWidth sx={formControlStyles}>
                          <TextField
                            type="number"
                            placeholder="Number of Nights"
                            variant="outlined"
                            fullWidth
                            value={searchParams.nights}
                            onChange={(e) =>
                              setSearchParams((prev) => ({
                                ...prev,
                                nights: e.target.value,
                              }))
                            }
                            sx={textFieldStyles}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarMonthIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      </Box>

                      {/* Days Field */}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            lineHeight: {xs: "1.2rem", sm: "1.5rem"},
                            textAlign: "left",
                            mb: {xs: 0.5, sm: 1},
                            color: "#1c1c1c",
                            fontWeight: 700,
                          }}
                        >
                          Days
                        </Typography>
                        <FormControl fullWidth sx={formControlStyles}>
                          <TextField
                            type="number"
                            placeholder="Number of Days"
                            variant="outlined"
                            fullWidth
                            value={searchParams.days}
                            onChange={(e) =>
                              setSearchParams((prev) => ({
                                ...prev,
                                days: e.target.value,
                              }))
                            }
                            sx={textFieldStyles}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarMonthIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>

                  {/* Package Type Field */}
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      lineHeight: {xs: "1.2rem", sm: "1.5rem"},
                      textAlign: "left",
                      mb: {xs: 0.5, sm: 1},
                      color: "#1c1c1c",
                      fontWeight: 700,
                    }}
                  >
                    Package Type
                  </Typography>
                  <FormControl fullWidth sx={formControlStyles}>
                    <Select
                      value={searchParams.packageType}
                      onChange={(e) =>
                        setSearchParams((prev) => ({
                          ...prev,
                          packageType: e.target.value,
                        }))
                      }
                      displayEmpty
                      renderValue={(selected) =>
                        selected || "Select Package Type"
                      }
                      startAdornment={
                        <InputAdornment position="start">
                          <PushPinIcon />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Adventure Travel">
                        Adventure Travel
                      </MenuItem>
                      <MenuItem value="Art and Museum Travel">
                        Art & Museum Travel
                      </MenuItem>
                      <MenuItem value="Beach and Island Getaways">
                        Beach & Island Getaways
                      </MenuItem>
                      <MenuItem value="Business Travel">
                        Business Travel
                      </MenuItem>
                      <MenuItem value="Celebration and Holiday Travel">
                        Celebration & Holiday Travel
                      </MenuItem>
                      <MenuItem value="Cruise Vacations">
                        Cruise Vacations
                      </MenuItem>
                      <MenuItem value="Culinary Experiences">
                        Culinary Experiences
                      </MenuItem>
                      <MenuItem value="Cultural and Heritage Tours">
                        Cultural & Heritage Tours
                      </MenuItem>
                      <MenuItem value="Eco-Friendly Travel">
                        Eco-Friendly Travel
                      </MenuItem>
                      <MenuItem value="Expedition Travel">
                        Expedition Travel
                      </MenuItem>
                      <MenuItem value="Family and Couples Travel">
                        Family & Couples Travel
                      </MenuItem>
                      <MenuItem value="Family and Group Packages">
                        Family & Group Packages
                      </MenuItem>
                      <MenuItem value="Group Travel">Group Travel</MenuItem>
                      <MenuItem value="Honeymoon and Maternity Travel">
                        Honeymoon & Maternity Travel
                      </MenuItem>
                      <MenuItem value="Historical and Archaeological Tours">
                        Historical & Archaeological Tours
                      </MenuItem>
                      <MenuItem value="Outdoor Adventures">
                        Outdoor Adventures
                      </MenuItem>
                      <MenuItem value="Relaxation and Wellness">
                        Relaxation & Wellness
                      </MenuItem>
                      <MenuItem value="Road Trips and RV Adventures">
                        Road Trips & RV Adventures
                      </MenuItem>
                      <MenuItem value="Solo Travel">Solo Travel</MenuItem>
                      <MenuItem value="Sustainable Travel">
                        Sustainable Travel
                      </MenuItem>
                      <MenuItem value="Temple Tours">Temple Tours</MenuItem>
                      <MenuItem value="Wellness and Retreats">
                        Wellness & Retreats
                      </MenuItem>
                      <MenuItem value="Wildlife and Nature Travel">
                        Wildlife & Nature Travel
                      </MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    sx={{
                      mt: {xs: 1, sm: 2},
                      bgcolor: "#FF5722",
                      color: "white",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#E64A19" },
                      borderRadius: "10px",
                      alignSelf: "flex-start",
                    }}
                    onClick={handleSearch}
                  >
                    FIND NOW
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
      <Box
        sx={{
          display: { xs: "flex", md: "block" }, // Flex row on mobile, block on desktop
          justifyContent: "center", // Center buttons in a row on mobile
          alignItems: "center",
          gap: { xs: 1, md: 0 }, // Small gap between buttons on mobile
          position: { xs: "absolute", md: "unset" },
          bottom: { xs: 16, md: "auto" }, // Position at the bottom on mobile
          width: "100%", // Full width on mobile for centering
          zIndex: 10,
        }}
      >
        <IconButton
          aria-label="Previous slide"
          onClick={handlePrev}
          sx={{
            bgcolor: "white",
            "&:hover": { bgcolor: "#FF5722" },
            position: { xs: "static", md: "absolute" }, // Static on mobile, absolute on desktop
            top: { md: "50%" }, // Center vertically on desktop
            left: { md: 16 },
            transition: "transform 0.2s ease-in-out", // Animation effect
            "&:active": {
              transform: { xs: "scale(0.9)", md: "none" }, // Shrink on click only on mobile
            },
          }}
        >
          <ChevronLeft
            fontSize="large"
            sx={{ color: "#FF5722", "&:hover": { color: "white" } }}
          />
        </IconButton>

        <IconButton
          aria-label="Next slide"
          onClick={handleNext}
          sx={{
            bgcolor: "white",
            "&:hover": { bgcolor: "#FF5722" },
            position: { xs: "static", md: "absolute" }, // Static on mobile, absolute on desktop
            top: { md: "50%" }, // Center vertically on desktop
            right: { md: 16 },
            transition: "transform 0.2s ease-in-out", // Animation effect
            "&:active": {
              transform: { xs: "scale(0.9)", md: "none" }, // Shrink on click only on mobile
            },
          }}
        >
          <ChevronRight
            fontSize="large"
            sx={{ color: "#FF5722", "&:hover": { color: "white" } }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Hero;
