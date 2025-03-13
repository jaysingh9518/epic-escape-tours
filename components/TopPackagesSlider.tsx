import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel"; // For responsive carousels
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { URLPORT } from "@/services/URL";
import {
  Container,
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import BedIcon from "@mui/icons-material/Bed";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
// Cloudinary image URLs
const DotImg =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352405/packages/fwkbkxb0yux1ynb4qnbh.png";
const Circle1 =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352404/packages/o48ncudhqpjzde4v9dhr.png";
const Plane =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352406/packages/atanxw16w9fusxuopp4v.png";
const BgImg =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352402/packages/lulad2cprsdfee8kpow9.png";

const StyledSection = styled("section")({
  backgroundImage: `url(${BgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "60px 0",
  position: "relative",
  overflow: "hidden",
});

const ShapeMockup = styled("div")({
  position: "absolute",
  zIndex: 0,
  animation: "jump 5s infinite",
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 600,
  padding: theme.spacing(1),
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledCard = styled(Card)(() => ({
  maxWidth: 360,
  margin: 25,
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
  transition: "transform 0.3s, box-shadow 0.3s",
  zIndex: 10,
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 500,
  position: "relative",
  cursor: "pointer",
  borderRadius: "8px",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
    borderRadius: "8px",
    zIndex: 1,
  },
});

const StyledCardContent = styled(CardContent)({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  zIndex: 2,
  color: "white",
  padding: "10px",
  background: "rgba(0, 0, 0, 0.6)",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
});

const PriceSection = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  marginTop: "2px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
});

// Styled IconButton for carousel controls
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function TopPackagesSlider() {
  const [packages, setPackages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${URLPORT}/package/get-packages?limit=6&sort=rating&order=desc`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPackages(data.packages);
        } else {
          console.error("Error fetching packages:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  const handleCardClick = (packageId) => {
    router.push(`/package/${packageId}`);
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <StyledSection>
      {/* Shape Mockup */}
      <ShapeMockup
        className="shape-mockup"
        style={{ bottom: "20%", left: "5%" }}
      >
        <img src={DotImg} width={"70%"} alt="Dots" />
      </ShapeMockup>
      <ShapeMockup className="shape-mockup" style={{ top: "10%", left: "10%" }}>
        <img src={Plane} className="fade-effect" width={"70%"} alt="Plane" />
      </ShapeMockup>
      <ShapeMockup
        className="shape-mockup"
        style={{ bottom: "1%", right: "1%" }}
      >
        <img src={Circle1} width={"40%"} alt="Circle" />
      </ShapeMockup>

      {/* Container */}
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {/* Section title */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          sx={{ marginBottom: { xs: 2, md: 4 } }}
        >
          <Typography
            sx={{
              color: "#FF5722",
              fontWeight: 700,
              fontSize: {
                xs: "1.2rem",
                sm: "1.4rem",
                md: "1.6rem",
                lg: "1.8rem",
              },
              mb: { xs: 1, md: 2 },
            }}
          >
            Incredible Tours
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.4rem", md: "3rem", lg: "3.6rem" },
              mb: { xs: 1, md: 2 },
            }}
          >
            Ultimate Holiday Packages
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.2rem",
                lg: "1.3rem",
              },
              color: "text.secondary",
              maxWidth: { xs: "90%", sm: "80%", md: 600 },
              mb: { xs: 2, md: 3 },
            }}
          >
            Discover seamless journeys crafted for unforgettable experiences.
            From captivating landscapes to vibrant cultures, embark on a
            vacation like no other.
          </Typography>
        </Box>

        {/* Top Packages Carousel */}
        <Carousel
          sx={{
            padding: { xs: 2, md: 4 },
            mx: "auto",
            "& .carousel-container": {
              padding: "0 10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            "& .carousel-item": {
              padding: "0 8px",
            },
          }}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          //   centerMode={true}  // Aligns the active item in the center
          customLeftArrow={
            <StyledIconButton
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowBackIosIcon />
            </StyledIconButton>
          }
          customRightArrow={
            <StyledIconButton
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowForwardIosIcon />
            </StyledIconButton>
          }
        >
          {packages.map((packageData) => (
            <StyledCard key={packageData._id}>
              <Box sx={{ position: "relative" }}>
                {/* Image with overlay */}
                <StyledCardMedia
                  component="img"
                  image={packageData.packageImages[0] || "default.jpg"}
                  alt={packageData.packageName}
                  onClick={() => handleCardClick(packageData._id)}
                />

                {/* Card content overlay */}
                <StyledCardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  {/* Dynamic Stars */}
                  {[...Array(5)].map((_, index) => {
                    const rating = packageData.packageRating || 0;
                    if (index + 1 <= Math.floor(rating)) {
                      return (
                        <StarIcon
                          key={index}
                          sx={{
                            color: "secondary.main",
                            fontSize: "1.2rem",
                            mr: 0.2,
                          }}
                        />
                      ); // Full star
                    } else if (index < rating) {
                      return (
                        <StarHalfIcon
                          key={index}
                          sx={{
                            color: "secondary.main",
                            fontSize: "1.2rem",
                            mr: 0.2,
                          }}
                        />
                      ); // Half star
                    } else {
                      return (
                        <StarOutlineIcon
                          key={index}
                          sx={{
                            color: "secondary.main",
                            fontSize: "1.2rem",
                            mr: 0.2,
                          }}
                        />
                      ); // Empty star
                    }
                  })}
                  {/* Rating and Reviews */}
                  <Typography
                    variant="body2"
                    color="text.main"
                    sx={{ ml: 1 }}
                  >
                    ({packageData.packageTotalRatings} reviews)
                  </Typography>
                </Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{
                    mb: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {packageData.packageName}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Typography
                    variant="body2"
                    color="text.main"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {packageData.packageDestination}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.main"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ mx: 0.5 }} />
                    {packageData.packageNights} nights /{" "}
                    {packageData.packageDays} days
                  </Typography>
                </Box>
                {/* Extra Information with Icons */}
                <Box display="flex" alignItems="center" mb={1}>
                  <BedIcon fontSize="small" sx={{ mr: 1 }} />
                  <Tooltip title={packageData.packageAccommodation} arrow>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {packageData.packageAccommodation}
                    </Typography>
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <RestaurantIcon fontSize="small" sx={{ mr: 1 }} />
                  <Tooltip title={packageData.packageMeals} arrow>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {packageData.packageMeals}
                    </Typography>
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: 16 }} />
                    {packageData?.packageMinPax} Person
                    {packageData?.packageMinPax > 1 && "s"}
                  </Typography>
                </Box>
                </StyledCardContent>
              </Box>
              {/* Price and button section */}
              <PriceSection>
                  {/* <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mt: 1 }}
                  >
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                        fontSize: "1.3rem",
                      }}
                    >
                      ₹{packageData.packagePrice}
                    </span>{" "}
                    &nbsp;
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#FF5722",
                        fontSize: "1.3rem",
                      }}
                    >
                      ₹{packageData.packageDiscountPrice}
                    </span>
                  </Typography> */}
                  {/* Book Now Button */}
                  <Box mt={1} sx={{ width: "100%" }}>
                    <StyledButton
                      fullWidth
                      variant="contained"
                      sx={{ fontSize: 15 }}
                      onClick={() => handleCardClick(packageData._id)}
                    >
                      Book Now
                    </StyledButton>
                  </Box>
              </PriceSection>
            </StyledCard>
          ))}
        </Carousel>

        {/* Button to View More Packages */}
        <Box style={{ textAlign: "center", marginTop: "20px" }}>
          <StyledButton
            variant="contained"
            color="primary"
            component={Link}
            href="/packages"
          >
            View More Packages
          </StyledButton>
        </Box>
      </Container>
    </StyledSection>
  );
}
