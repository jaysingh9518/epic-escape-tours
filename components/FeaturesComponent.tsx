import { Box, Typography, Card, Container } from "@mui/material";
import { styled } from "@mui/system";
// Cloudinary image URLs
const CircleShape = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731353255/packages/crhbe6nsipfoipflbajv.png";
const FeaturesIcon1 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731353435/packages/ghx3mvyc59kg8swus3ch.png";
const FeaturesIcon2 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731353438/packages/wlouzdmmucrgk2gafuj9.png";
const FeaturesIcon3 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731353440/packages/xttzxm7bt2v9bjxwfkyd.png";
const FeaturesIcon4 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731353443/packages/vqitx6ucamjgizpcqbbk.png";

// Styled Components
const StyledCard = styled(Card)(({ theme, bgcolor }) => ({
  maxWidth: 250,
  height: "100%",
  borderRadius: "16px",
  backgroundColor: bgcolor,
  boxShadow: theme.shadows[3],
  zIndex: 10,
  position: "relative",
  transition: "transform 0.3s, box-shadow 0.3s",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  padding: "1.5rem",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[6],
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    width: "100%",
  },
}));

const StyledSection = styled("section")({
  backgroundColor: "#f8f9fa",
  position: "relative",
  overflow: "hidden",
  padding: "20px 0",
});

const ShapeMockup = styled("div")({
  position: "absolute",
  bottom: "10%",
  right: "13%",
  zIndex: 0,
});

export default function FeaturesComponent() {
  const features = [
    {
      title: "Seamless Travel Planning",
      image: FeaturesIcon1,
      description:
        "Experience effortless travel planning with personalized itineraries that cater to your every need, ensuring a stress-free journey.",
      bgcolor: "#00bcd4", // A soothing blue to evoke calmness
      bgcolorTopBottom: "#8bc34a", // Transition to a refreshing green, symbolizing growth and harmony
    },
    {
      title: "Expert Destination Insights",
      image: FeaturesIcon2,
      description:
        "Discover hidden gems and must-visit spots with the expertise of our destination managers, making your vacation unforgettable.",
      bgcolor: "#8bc34a", // A vibrant green, representing nature and adventure
      bgcolorTopBottom: "#ffc107", // Transition to a golden yellow, symbolizing warmth and excitement
    },
    {
      title: "Exclusive Activities & Experiences",
      image: FeaturesIcon3,
      description:
        "Indulge in curated, one-of-a-kind experiences, from local adventures to luxury getaways, designed to make your trip extraordinary.",
      bgcolor: "#ffc107", // A warm yellow for positivity and joy
      bgcolorTopBottom: "#ff5722", // Transition to a rich orange, invoking energy and excitement
    },
    {
      title: "Personalized Travel Guidance",
      image: FeaturesIcon4,
      description:
        "Our expert guides provide tailored recommendations, ensuring that every moment of your journey is filled with unforgettable memories.",
      bgcolor: "#ff5722", // A bold orange, evoking energy and enthusiasm
      bgcolorTopBottom: "#00bcd4", // Return to blue for balance and tranquility
    },
  ];

  return (
    <StyledSection>
      <Container>
        <ShapeMockup className="shape-mockup ripple-animation">
          <img src={CircleShape} alt="decorative shape" />
        </ShapeMockup>
        <Box display="flex" justifyContent="center" textAlign="center">
          <Box maxWidth={600}>
            <Typography
              sx={{
                color: "#FF5722",
                fontWeight: 700,
                fontSize: { xs: "1.2rem", md: "1.6rem" },
                lineHeight: "1.5",
                mb: 1,
              }}
            >
              Our Features
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          {features.map((feature, index) => (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              key={index}
              sx={{
                width: { xs: "100%", sm: "48%", md: "48%", lg: "23%" },
                marginBottom: { xs: "1.5rem", sm: "1.5rem", md: "2rem" }, // Adjusted spacing for different breakpoints
              }}
            >
              <StyledCard bgcolor={feature.bgcolor}>
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={{ width: "40px", height: "40px" }}
                  />
                  <Box
                    sx={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: feature.bgcolorTopBottom,
                      borderRadius: "50%",
                      position: "absolute",
                      top: "-5px",
                      left: "-5px",
                    }}
                  />
                  <Box
                    sx={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: feature.bgcolorTopBottom,
                      borderRadius: "50%",
                      position: "absolute",
                      bottom: "-5px",
                      right: "-5px",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" }, // Adjusting text size on smaller screens
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    marginTop: "0.5rem",
                    fontSize: { xs: "0.9rem", sm: "1rem" }, // Adjusting font size on smaller screens
                  }}
                >
                  {feature.description}
                </Typography>
              </StyledCard>
            </Box>
          ))}
        </Box>
      </Container>
    </StyledSection>
  );
}
