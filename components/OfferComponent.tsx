import { Container, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
// Cloudinary image URLs
const OfferBg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731353939/packages/bqbaubmhidocyi7dsstx.jpg";
const OfferImg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731353803/packages/rgpjbzhdskg7ucfs9dmk.png";
const BagImg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731353982/packages/fkaupc1fzfazhrxpizbv.png";

// Styled Components
const OfferSection = styled("section")({
  backgroundImage: `url(${OfferBg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "80px 0",
  position: "relative",
  overflow: "hidden",
});

const TitleArea = styled(Box)({
  color: "#fff",
  textAlign: "left",
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontWeight: 700,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  padding: "10px 20px",
  borderRadius: "10px",
}));

// Define the spin animation
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export default function OfferComponent() {
  return (
    <OfferSection>
      <Container>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent={{ xs: "center", md: "space-between" }} // Center in column view
          textAlign="center" // Ensure the text aligns center when in column view
        >
          {/* Text Content */}
          <Box maxWidth="500px" textAlign="center" mb={{ xs: 4, md: 0 }}>
            <TitleArea>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: { xs: "1.2rem", md: "1.6rem" },
                  mb: 1,
                }}
              >
                Explore & Uncover New Destinations
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2.2rem", md: "3rem" },
                  mb: 1,
                }}
              >
                Exclusive Offers Just for You
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  color: "text",
                  mb: 4,
                }}
              >
                Discover the world like never before. Whether you&apos;re seeking relaxation or adventure, our handpicked offers ensure every journey is unforgettable. Start your next adventure with us today!
              </Typography>
              <StyledButton href="/contact" variant="contained">
                View More
              </StyledButton>
            </TitleArea>
          </Box>

          {/* Main Container */}
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={{ xs: 4, md: 0 }}
            sx={{ width: "300px", height: "300px" }} // Fixed container size for better control
          >
            {/* Outer Circles with spin animation */}
            <Box
              sx={{
                position: "absolute",
                width: "295px",
                height: "295px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                zIndex: 1,
                animation: `${spinAnimation} 20s linear infinite`, // Apply the spin animation
              }}
            >
              {/* Top and Bottom Dots with spin animation */}
              <Box
                sx={{
                  position: "absolute",
                  top: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "secondary.main",
                  zIndex: 4,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "secondary.main",
                  zIndex: 4,
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                backgroundColor: "white",
                zIndex: 2,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                backgroundColor: "primary.main",
                zIndex: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Discount Text */}
              {/* <Box
                sx={{
                  color: "white",
                  fontSize: "28px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                35%
                <br />
                OFF
              </Box> */}
            </Box>

            {/* Offer Image (Positioned Outside Circle) */}
            <Box
              component="img"
              src={OfferImg}
              alt="Offer image"
              sx={{
                position: "absolute",
                bottom: "35%",
                right: "25%",
                zIndex: 5,
                width: "150px",
              }}
            />

            {/* Bag Image (Positioned Outside Circle) */}
            <Box
              component="img"
              src={BagImg}
              alt="Bag"
              sx={{
                position: "absolute",
                bottom: "-60px",
                right: "-175px",
                width: "250px",
                zIndex: 5,
              }}
            />
          </Box>
        </Box>
      </Container>
    </OfferSection>
  );
}