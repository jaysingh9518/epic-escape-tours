import { useState } from "react";
import {
  Box,
  Link as MuiLink,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Image from "next/image";
import footerLogo from "@/public/images/logo-dark.png";
// Cloudinary image URLs
const treeLeft = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731355009/packages/wgz3tqqycig6tzbc3sqf.png";
const treeRight = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731355011/packages/o4khgwswy6a2hm1owbdo.png";
const callIcon = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731355007/packages/rzxvynx1fz9csvnwsjrs.png";
const shareIcon = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731355008/packages/sdx7x5rntqvpjwwfo4qn.png";
const insta1 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731354610/packages/epkbcolpzfmwkad9cf88.jpg";
const insta2 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731354611/packages/unbn2jrqvqfaongw7hnn.jpg";
const insta3 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731354612/packages/ytlt8ottj52yq9jqon56.jpg";
const insta4 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731354613/packages/cihpwtiiqrrdk5bgfjcx.jpg";
const insta5 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731354614/packages/irl6j1t5ebqculkcsqbx.jpg";
const insta6 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731354616/packages/b55nzorct7nrzeoqnjho.jpg";

// Styled components for Footer
const FooterWrapper = styled("footer")({
  position: "relative",
  backgroundColor: "#222222",
  color: "#fff",
  paddingTop: "60px",
  paddingBottom: "40px",
  zIndex: 0,
});

const ShapeMockup = styled("div")({
  position: "absolute",
  zIndex: -1,
  opacity: 0.5, 
  animation: "jump 5s infinite",
  "& Image": {
    width: "100px",
  },
});

const FooterLogo = styled("div")({
  "& Image": {
    width: "300px",
    height: "auto",
  },
});

const FooterText = styled("p")({
  fontSize: "1rem",
  color: "#fff",
  marginTop: "10px",
});

const SocialIcons = styled("div")(({ theme }) => ({
  marginTop: "20px",
  "& a": {
    color: "#fff",
    marginRight: "10px",
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

const WidgetTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 700,
  paddingBottom: "10px",
  marginBottom: "20px",
  position: "relative",
  "&::before": {
    content: '""',
    width: "60px",
    height: "2px",
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  "&::after": {
    content: '""',
    width: "5px",
    height: "5px",
    outline: `4px solid ${theme.palette.primary.main}`,
    borderRadius: "50%",
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    left: "4px",
    bottom: "-1px",
    animation: "leftToRight 8s linear infinite",
  },
  "@keyframes leftToRight": {
    "0%": { left: "0px" },
    "50%": { left: "56px" },
    "100%": { left: "0px" },
  },
}));

const FooterLink = styled("a")({
  display: "block",
  fontSize: "1rem",
  color: "#fff",
  margin: "5px 0",
  textDecoration: "none",
  "&:hover": {
    color: "#FF5722",
  },
});

const CopyrightText = styled(Typography)({
  fontSize: "0.9rem",
  color: "#bbb",
  textAlign: "center",
});

const StyledLink = styled("a")(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 700,
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

const Footer = () => {
  const [email, setEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  // Replace with your Brevo API Key
  const brevoApiKey = "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";  // Your API Key here
  
  // Function to handle the Subscribe button click
  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Define your Brevo API endpoint and API key
    const brevoEndpoint = "https://api.brevo.com/v3/contacts";

    try {
      const response = await fetch(brevoEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          email: email, // email 
          listIds: [12], // list IDs
        }),
      });

      if (response.ok) {
        setSubscriptionSuccess(true);
        setOpenSnackbar(true);
        setEmail(""); // Reset the form field after success
      } else {
        setSubscriptionSuccess(false);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscriptionSuccess(false);
      setOpenSnackbar(true);
    }
  };

  // Function to handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <FooterWrapper>
      <ShapeMockup className="shape-mockup" style={{ top: "10%", left: "0%" }}>
        <Image src={treeLeft} alt="Tree Left" width={179} height={323} />
      </ShapeMockup>
      <ShapeMockup className="shape-mockup" style={{ top: "10%", right: "0%" }}>
        <Image src={treeRight} alt="Tree Right" width={179} height={323} />
      </ShapeMockup>

      <Container zIndex={2}>
        <Box
          className="footer-newsletter2"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gap={3}
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          borderBottom={"1px solid #ffccb1"}
          pb={4}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            flex="1 1 30%"
          >
            <Box mr={2}>
              <Image src={callIcon} alt="Call" width="50" height="50" />
            </Box>
            <Box>
              <Typography variant="h6" color="text.secondary">
                Call Us 24/7
              </Typography>
              <MuiLink href="tel:+917452849199" underline="none">
                <Typography variant="body1" color="secondary.paper">
                  +91 7452849199
                </Typography>
              </MuiLink>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            flex="1 1 30%"
          >
            <Box mr={2}>
              <Image src={shareIcon} alt="Share" width="50" height="50" />
            </Box>
            <Box>
              <Typography variant="h6" color="text.secondary">
                Subscribe
              </Typography>
              <Typography variant="body1" color="secondary.paper">
                <span
                  style={{
                    cursor: "default",
                    pointerEvents: "none",
                    opacity: 0.6,
                  }}
                >
                  Sign up for daily updates
                </span>
              </Typography>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubscribe}
            display="flex"
            alignItems="center"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid #FF6A00",
              borderRadius: 4,
              padding: 1,
              width: "fit-content",
              height: "fit-content",
            }}
          >
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: {
                  backgroundColor: "transparent",
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#FF6A00",
                color: "white",
                fontWeight: "bold",
                marginLeft: 1,
                padding: "8px 16px",
                "&:hover": { backgroundColor: "#E65A00" },
              }}
            >
              SUBSCRIBE
            </Button>
            {/* Snackbar for confirmation */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={subscriptionSuccess ? "success" : "error"}
                sx={{ width: "100%" }}
              >
                {subscriptionSuccess
                  ? "Subscription successful! A confirmation email has been sent."
                  : "Subscription failed. Please try again later."}
              </Alert>
            </Snackbar>
          </Box>
        </Box>

        <Box className="widget-area2" marginTop={4}>
          <Box
            display="flex"
            justifyContent={{ sm: "center", md: "space-between" }} // Center for smaller screens, space-between for larger screens
            alignItems={{ sm: "center", md: "flex-start" }}
            flexWrap="wrap"
            gap={5}
            sx={{
              flexDirection: "row",
              // Setting column sizes based on screen size (flex values for responsiveness)
              "& > div": {
                flex: "1 1 22%", // Default for larger screens
                "@media (max-width: 1200px)": { flex: "1 1 30%" }, // For medium screens
                "@media (max-width: 900px)": { flex: "1 1 45%" }, // For smaller screens
                "@media (max-width: 600px)": { flex: "1 1 100%" }, // For very small screens
              },
            }}
          >
            {/* Footer Logo Section */}
            <Box>
              <FooterLogo>
                <a href="index.html">
                  <Image
                    src={footerLogo}
                    alt="Heaven of Holiday - Logo"
                    width="250"
                    height="auto"
                  />
                </a>
              </FooterLogo>
              <FooterText>
                Experience the best destination with Heaven of Holiday. Let us
                guide you through the wonders of this incredible city, blending
                history, culture, and comfort on your dream vacation.
              </FooterText>
              <SocialIcons>
                <IconButton
                  href="https://facebook.com/heavenofholiday"
                  target="_blank"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  href="https://instagram.com/heavenofholiday"
                  target="_blank"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  href="https://www.youtube.com/channel/UC3tLT4dew3mDziRewJ0zuYg?sub_confirmation=1"
                  target="_blank"
                >
                  <YouTube />
                </IconButton>
                <IconButton
                  href="https://twitter.com/heavenofholiday"
                  target="_blank"
                >
                  <Twitter />
                </IconButton>
              </SocialIcons>
            </Box>

            {/* Useful Links Section */}
            <Box>
              <WidgetTitle>Useful Links</WidgetTitle>
              <FooterLink href="/">
                {" "}
                <ArrowForwardIosOutlinedIcon fontSize="extra-small" /> Home
              </FooterLink>
              <FooterLink href="packages">
                {" "}
                <ArrowForwardIosOutlinedIcon fontSize="extra-small" /> Packages
              </FooterLink>
              <FooterLink href="blogs">
                {" "}
                <ArrowForwardIosOutlinedIcon fontSize="extra-small" /> Blogs
              </FooterLink>
              <FooterLink href="about">
                {" "}
                <ArrowForwardIosOutlinedIcon fontSize="extra-small" /> About
              </FooterLink>
              <FooterLink href="contact">
                {" "}
                <ArrowForwardIosOutlinedIcon fontSize="extra-small" /> Contact
              </FooterLink>
            </Box>

            {/* Contact Us Section */}
            <Box>
              <WidgetTitle>Contact Us</WidgetTitle>
              <FooterLink href="https://www.google.com/maps/place/Heaven+of+Holiday/@27.1467692,78.0448496,738m/data=!3m2!1e3!4b1!4m6!3m5!1s0x397471a8e17cd73b:0xfd7f466a2a0dbd98!8m2!3d27.1467692!4d78.0448496!16s%2Fg%2F11v4pq8mdm!5m1!1e2?entry=ttu&g_ep=EgoyMDI1MDIxMC4wIKXMDSoASAFQAw%3D%3D">
                <LocationOnIcon fontSize="small" /> HIG-160, 100 Feet Rd, Nehru
                Enclave Yojna, Near Sharwood Public School, Indrapuram Crossing,
                Agra, Uttar Pradesh 282001
              </FooterLink>
              <FooterLink href="mailto:info@heavenofholiday.com">
                <MailOutlineIcon fontSize="small" /> info@heavenofholiday.com
              </FooterLink>
              <FooterLink href="tel:+917452849199">
                <PhoneIcon fontSize="small" /> +91 7452849199
              </FooterLink>
            </Box>

            {/* Instagram Feed Section */}
            <Box>
              <WidgetTitle>Instagram Feed</WidgetTitle>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {[insta1, insta2, insta3, insta4, insta5, insta6].map(
                  (image, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: { xs: "25%", sm: "20%", md: "25%" },
                        borderRadius: "5px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        overflow: "hidden", // Ensures the border radius applies correctly to the image
                        transition: "transform 0.3s ease-in-out", // Optional for hover effect
                        "&:hover": {
                          transform: "scale(1.05)", // Optional hover zoom effect
                        },
                      }}
                    >
                      <Image
                        src={image}
                        alt={`Instagram ${index + 1}`}
                        width={100}
                        height={100}
                        style={{
                          borderRadius: "5px", // Ensures the image follows the border radius
                        }}
                      />
                    </Box>
                  )
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box borderTop="1px solid #444" paddingY={3} marginTop={3}>
          {/* Copyright Section */}
          <Box
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            justifyContent={{ xs: "center", sm: "center", md: "space-between" }}
            textAlign={{ xs: "center", md: "left" }}
            sx={{ gap: 2 }} // Adds spacing between items on smaller screens
          >
            <Box>
              <CopyrightText>
                Copyright &copy; {new Date().getFullYear()}{" "}
                <StyledLink href="/">Heaven of Holiday</StyledLink>. All
                Rights Reserved. Design with{" "}
                <FavoriteOutlinedIcon color="error" /> by{" "}
                <StyledLink
                  href="https://github.com/jaysingh9518"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jay Prakash
                </StyledLink>
              </CopyrightText>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap={2}
              justifyContent={{ xs: "center", md: "flex-end" }}
              flexWrap="wrap"
            >
              <FooterLink href="privacy">Privacy</FooterLink>
              <FooterLink href="terms">Terms & Conditions</FooterLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
