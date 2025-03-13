"use client"

import { Container, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

// Cloudinary image URL for illustration
const CtaImage = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731882883/packages/ry4ct7pwbp7fnwfmig5m.png";

// Styled Components
const CtaSection = styled("section")({
  backgroundColor: "#ff6c1c", // Vibrant orange background
  padding: "60px 20px",
});

const TextArea = styled(Box)({
  textAlign: "center", // Center-align text
  color: "#fff", // White text for contrast
  marginBottom: "20px",
});

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "1.2rem",
  backgroundColor: "#fff", // White button for contrast
  color: theme.palette.primary.main, // Theme's primary color for text
  fontWeight: 700,
  padding: "10px 20px",
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.grey[300], // Lighter background on hover
  },
}));

// CallToAction Component
export default function CallToAction() {
  return (
    <CtaSection>
      <Container>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          textAlign={{ xs: "center", md: "left" }} // Responsive text alignment
        >
          {/* Text Content */}
          <TextArea>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Adventure Starts Here!
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.2rem", md: "1.6rem" },
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Get in Touch & Unlock Your Next Journey!
            </Typography>
            <StyledButton 
              href="/contact" 
              variant="contained" 
              sx={{
                display: "block",
                mx: "auto",
                padding: "12px 24px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              Contact Us Now
            </StyledButton>
          </TextArea>

          {/* Image Content */}
          <Box
            component="img"
            src={CtaImage}
            alt="Illustration of a waving person"
            sx={{
              maxWidth: "300px",
              height: "auto",
              marginTop: { xs: "20px", md: "0" }, // Responsive margin
            }}
          />
        </Box>
      </Container>
    </CtaSection>
  );
}
