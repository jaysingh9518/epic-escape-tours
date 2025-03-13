import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { URLPORT } from "@/services/URL";
import {
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// Cloudinary image URLs
const BgImg =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352402/packages/lulad2cprsdfee8kpow9.png";
const DotImg =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352405/packages/fwkbkxb0yux1ynb4qnbh.png";
const Circle1 =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352404/packages/o48ncudhqpjzde4v9dhr.png";
const WalkImg =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731354227/packages/mum0cs3d1jn2pqjijfjz.png";

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

const StyledCard = styled(Card)(() => ({
  maxWidth: 345,
  margin: 25,
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  zIndex: 10,
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 500,
  position: "relative",
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

const ButtonSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  marginTop: "2px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FF5722",
  color: theme.palette.common.white,
  fontWeight: 700,
  borderRadius: "12px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#E64A19",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  display: { xs: "none", sm: "block" },
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function TopDestinationsSlider() {
  const [destinations, setDestinations] = useState([]);
  const router = useRouter();

  // Fetch destinations with unique locations
  useEffect(() => {
    fetch(`${URLPORT}/package/get-packages?limit=10`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const uniqueDestinations = Array.from(
            new Set(data.packages.map((pkg) => pkg.packageDestination))
          ).map((location) =>
            data.packages.find((pkg) => pkg.packageDestination === location)
          );
          setDestinations(uniqueDestinations);
        } else {
          console.error("Error fetching destinations:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  const handleViewPackages = (destination) => {
    router.push(`/packages?search=${encodeURIComponent(destination)}`);
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <StyledSection>
      <ShapeMockup
        className="shape-mockup"
        style={{ bottom: "20%", left: "5%" }}
      >
        <img src={DotImg} width={"70%"} alt="Dots" />
      </ShapeMockup>
      <ShapeMockup className="shape-mockup" style={{ top: "10%", left: "10%" }}>
        <img src={WalkImg} width={"70%"} alt="Walk" />
      </ShapeMockup>
      <ShapeMockup
        className="shape-mockup"
        style={{ bottom: "1%", right: "1%" }}
      >
        <img src={Circle1} width={"40%"} alt="Circle" />
      </ShapeMockup>
      <Container>
        {/* Title and Description */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          sx={{
            padding: { xs: 2, md: 4 }, // Add padding for smaller screens
          }}
        >
          <Typography
            sx={{
              color: "#FF5722",
              fontWeight: 700,
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
              mb: 1,
            }}
          >
            Top Destination
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3rem" },
              mb: 1,
            }}
          >
            Unforgettable Cities Await
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              color: "text.secondary",
              maxWidth: 600,
              mb: 2,
              px: { xs: 2, md: 0 }, // Add horizontal padding for smaller screens
            }}
          >
            Explore the world&apos;s most captivating cities, where every corner
            offers a new adventure. Immerse yourself in the vibrant culture,
            rich history, and breathtaking landscapes that make each destination
            truly unforgettable.
          </Typography>
        </Box>
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
          {destinations.map((destination) => (
            <StyledCard key={destination._id}>
              <Box sx={{ position: "relative" }}>
                {/* Image with overlay */}
                <StyledCardMedia
                  component="img"
                  image={destination.packageImages[0] || "default.jpg"}
                  alt={destination.packageDestination}
                />
                {/* Card content overlay */}
                <StyledCardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {destination.packageDestination}
                  </Typography>
                  <Typography variant="body2" color="text.main" mb={1}>
                    Popular spot • {destination.packageDays} days trip
                  </Typography>
                </StyledCardContent>
              </Box>
              <ButtonSection>
                <StyledButton
                  onClick={() =>
                    handleViewPackages(destination.packageDestination)
                  }
                >
                  Explore Packages
                </StyledButton>
              </ButtonSection>
            </StyledCard>
          ))}
        </Carousel>
        {/* Button to View More Destinations */}
        <Box style={{ textAlign: "center", marginTop: "20px" }}>
          <StyledButton
            variant="contained"
            color="primary"
            component={Link}
            href="/packages"
          >
            View More Destinations
          </StyledButton>
        </Box>
      </Container>
    </StyledSection>
  );
}
