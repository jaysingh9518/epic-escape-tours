import {
  Container,
  Typography,
  List,
  ListItem,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { styled } from "@mui/system";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";
import OfferComponent from "@/components/OfferComponent";
import Testimonials from "@/components/Testimonials";
import FeaturedBlogSlider from "@/components/FeaturedBlogSlider";
import CallToAction from "@/components/CallToAction";

// Cloudinary image URLs
const Image1 =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731799333/packages/t2tdectch1yud2kpij06.jpg";
const Image2 =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731799332/packages/dnjqjy1pzsqhvpnq82oo.jpg";
const Image3 =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731882305/packages/mkolmccyx8zi1pcbdcuf.jpg";
const Image4 =
  "https://res.cloudinary.com/dkxmweeur/image/upload/v1731882305/packages/asczjqbv8b7wxcrftuym.jpg";

// Styled Components
const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: "40px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "40px",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const StyledImage = styled("img")(({ position, theme }) => ({
  width: position === "foreground" ? "250px" : "400px",
  height: "auto",
  padding: position === "foreground" ? "30px" : "0",
  backgroundColor: "#fff",
  borderRadius: position === "foreground" ? "50%" : "25% 0 25% 0",
  position: position === "foreground" ? "absolute" : "relative",
  top: position === "foreground" ? "30%" : "auto",
  left: position === "foreground" ? "70%" : "auto",
  transform: position === "foreground" ? "translate(-50%, -50%)" : "none",
  boxShadow:
    position === "foreground" ? "0px 10px 15px rgba(0,0,0,0.1)" : "none",
  [theme.breakpoints.down("sm")]: {
    width: position === "foreground" ? "150px" : "400px",
    height: "auto",
    padding: position === "foreground" ? "20px" : "0",
    top: position === "foreground" ? "15%" : "auto",
    left: position === "foreground" ? "80%" : "auto",
    transform: position === "foreground" ? "translate(-50%, -50%)" : "none",
  },
}));

const InfoBox = styled(Box)(({ theme, bgColor }) => ({
  position: "absolute",
  backgroundColor: bgColor || "#fff",
  padding: "16px 24px",
  borderRadius: "22px",
  border: "10px solid #fff",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    position: "relative",
    width: "40%",
    top: "0",
    left: "0",
    marginTop: "20px",
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  width: "50%",
  textAlign: "left",
  padding: "0 20px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const StyledList = styled(List)({
  display: "flex",
  flexWrap: "wrap",
  gap: "1px",
  padding: 0,
  justifyContent: "start",
  "& .MuiListItem-root": {
    fontSize: "1rem",
    display: "list-item",
    listStyleType: "none",
    paddingLeft: "20px",
    position: "relative",
    "&::before": {
      content: '""',
      width: "6px",
      height: "6px",
      outline: "5px solid rgba(255, 204, 177, 1)",
      backgroundColor: "#e85309",
      borderRadius: "50%",
      position: "absolute",
      left: "5px",
      top: "18px",
    },
  },
});

const About = () => {
  const router = useRouter();

  const handleGetInTouch = () => {
    router.push("/contact");
  };

  return (
    <Box className="main" sx={{ width: "100%" }}>
      <BreadcrumbWrapper
        title="About Us"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "About Us" },
        ]}
      />
      <Container maxWidth="lg">
        <SectionWrapper>
          {/* Image Section */}
          <ImageContainer>
            <StyledImage
              src={Image1}
              alt="Years of Excellence"
              position="background"
            />
            <StyledImage
              src={Image2}
              alt="Satisfied Travelers"
              position="foreground"
            />
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"50px"}
            >
              <InfoBox
                bgColor="#e85309"
                style={{ bottom: "-25px", left: "10%" }}
              >
                <Typography variant="h5" fontWeight="bold">
                  25+
                </Typography>
                <Typography variant="body2">Years of Excellence</Typography>
              </InfoBox>
              <InfoBox
                bgColor="#37d4d9"
                style={{ bottom: "-25px", right: "10%" }}
              >
                <Typography variant="h5" fontWeight="bold">
                  20,000+
                </Typography>
                <Typography variant="body2">Happy Travelers</Typography>
              </InfoBox>
            </Box>
          </ImageContainer>

          {/* Text Content Section */}
          <TextContent>
            <Typography variant="subtitle1" color="secondary">
              Your Trusted Travel Partner
            </Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Explore the World with Us
            </Typography>
            <Typography variant="body1" color="text.secondary" component={"p"}>
              At{" "}
              <span style={{ color: "#e85309", fontWeight: "bold" }}>
                Heaven of Holiday
              </span>
              , we take pride in curating unforgettable travel experiences. With
              over 25 years of expertise, we’ve successfully brought joy to
              thousands of travelers worldwide. Let us take you on a journey
              that blends comfort, adventure, and cherished memories.
            </Typography>
            <StyledList>
              <ListItem>Tailored itineraries for every traveler.</ListItem>
              <ListItem>Experiences designed for your preferences.</ListItem>
              <ListItem>Seamless support throughout your journey.</ListItem>
              <ListItem>Committed to your satisfaction.</ListItem>
            </StyledList>
            <Button
              variant="contained"
              color="primary"
              sx={{
                color: "white",
                mt: 2,
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
              onClick={handleGetInTouch}
            >
              Contact Us Today
            </Button>
          </TextContent>
        </SectionWrapper>
        {/* New Section for Our Services */}
        <SectionWrapper>
          <ImageContainer>
            <StyledImage src={Image3} alt="Our Services" />
          </ImageContainer>
          <TextContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Our Services
            </Typography>
            <div className="grid grid-cols-2 gap-6">
              <StyledList>
                <ListItem>Flight Tickets</ListItem>
                <ListItem>Best Hotel Accommodations</ListItem>
                <ListItem>150+ Premium City Tours</ListItem>
                <ListItem>College Group Tours</ListItem>
                <ListItem>Sightseeing by Sedan or SUV</ListItem>
                <ListItem>24/7 Service</ListItem>
              </StyledList>

              <StyledList>
                <ListItem>Corporate Tours</ListItem>
                <ListItem>Family Tours</ListItem>
                <ListItem>Business Tour</ListItem>
                <ListItem>Destination Wedding</ListItem>
                <ListItem>Couple Tours</ListItem>
                <ListItem>Honeymoon Tours</ListItem>
              </StyledList>
            </div>
          </TextContent>
        </SectionWrapper>

        {/* New Section for Process */}
        <SectionWrapper>
          <ImageContainer>
            <StyledImage src={Image4} alt="Process" />
          </ImageContainer>
          <TextContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Process
            </Typography>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              3 Easy Steps:
            </Typography>
            <StyledList>
              <ListItem>
                <strong>Consultation and Quote</strong>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  Connect with a Travel Advisor:
                  <br />
                  Call +91-7452849199.
                  <br />
                  Discuss Your Dream Vacation.
                  <br />
                  Receive a Personalized Quote.
                </Typography>
              </ListItem>
              <ListItem>
                <strong>Customized Itinerary Creation</strong>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  Craft Your Perfect Trip based on your preferences.
                  <br />
                  Receive a detailed itinerary for review.
                </Typography>
              </ListItem>
              <ListItem>
                <strong>Secure Booking and Confirmation</strong>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  Finalize your vacation with secure booking options.
                  <br />
                  Experience a stress-free planning process.
                </Typography>
              </ListItem>
            </StyledList>
          </TextContent>
        </SectionWrapper>
      </Container>
      <OfferComponent />
      <Testimonials />
      <FeaturedBlogSlider />
      <CallToAction />
    </Box>
  );
};

export default About;
