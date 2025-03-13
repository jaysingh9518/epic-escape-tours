import { Container, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
// Cloudinary image URLs
const BalloonImg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731351988/packages/bfzdn1qnfe8dp0oqlss5.png";
const UpArrowImg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731351992/packages/sjoulz8xnqwljmbzme7w.png";
const PlaneImg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731351991/packages/wiwxap5hl5m7bjnrwhtq.png";
const LinesImg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731351989/packages/ixlml9xd5efsm59i0jjw.png";
const AboutImage1 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731351656/packages/cpky43paeb21lgbu9vgf.jpg";
const AboutImage2 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731351657/packages/prlxargscaq2xxcptbeh.jpg";
const AboutImage3 = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731351659/packages/i8czb6muargthraqd11l.jpg";


const ShapeMockup = styled("div")(() => ({
  position: "absolute",
  zIndex: -1,
}));

export default function AboutComponent() {
  return (
    <section
      className="space shape-mockup-wrap"
      style={{ position: "relative", padding: "60px 0" }}
    >
      <ShapeMockup
        className="shape-mockup ripple-animation"
        style={{ top: "10%", left: "5%", display: { xs: "none", xl: "block" } }}
      >
        <img src={BalloonImg} className="fade-effect" alt="Balloon" />
      </ShapeMockup>
      <ShapeMockup
        className="shape-mockup jump"
        style={{
          top: "10%",
          right: "10%",
          display: { xs: "none", xl: "block" },
        }}
      >
        <img src={UpArrowImg} className="fade-effect" alt="Up Arrow" />
      </ShapeMockup>
      <ShapeMockup
        className="shape-mockup jump"
        style={{
          bottom: "0%",
          left: "0%",
          display: { xs: "none", xl: "block" },
        }}
      >
        <img src={PlaneImg} className="fade-effect" alt="Plane" />
      </ShapeMockup>
      <ShapeMockup
        className="shape-mockup jump"
        style={{
          bottom: "15%",
          right: "5%",
          display: { xs: "none", xl: "block" },
        }}
      >
        <img src={LinesImg} alt="Lines" />
      </ShapeMockup>

      <Container>
        <Box
          display="flex"
          flexDirection={{ xs: "column", xl: "row" }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* About Content */}
          <Box flex="1" marginRight={{ xl: 2 }} padding={{ sm: 2, xl: 0 }}>
            <Box className="about-content">
              <Box className="title-area" mb={3}>
                <Typography
                  sx={{
                    color: "#FF5722",
                    fontWeight: 700,
                    fontSize: { xs: "1.2rem", md: "1.6rem" },
                    lineHeight: "1.5",
                    textAlign: { xs: "center", lg: "left" },
                    mb: 1,
                  }}
                >
                  Welcome to Heaven of Holiday
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "2.2rem", md: "3rem" },
                    lineHeight: "1.3",
                    textAlign: { xs: "center", lg: "left" },
                    mb: 1,
                  }}
                >
                  Your Premier Choice for Memorable Travels
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    lineHeight: "1.5",
                    textAlign: { xs: "center", lg: "left" },
                    color: "text.secondary",
                    maxWidth: { xs: "100%", lg: "400px" },
                    mx: { xs: "auto", lg: "unset" },
                    mb: 2,
                  }}
                  component={"p"}
                >
                  Discover the world with us! At Heaven of Holiday, we turn
                  dreams into adventures and unforgettable journeys. We are
                  passionate about bringing you the best experiences, whether
                  it&apos;s exploring iconic sights or hidden treasures. Join us
                  as we inspire wanderlust and make each trip a cherished
                  memory.
                </Typography>
              </Box>

              <Box className="why-choose-us" mb={3}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    lineHeight: "1.5",
                    textAlign: { xs: "center", lg: "left" },
                    mb: 2,
                  }}
                >
                  Why Choose Us?
                </Typography>
                <ul
                  className="about-list1"
                  style={{
                    paddingLeft: { xs: "20px", lg: "unset" },
                    textAlign: { xs: "center", lg: "left" },
                  }}
                >
                  <li>Expertly Curated Experiences</li>
                  <li>Unmatched Service and Comfort</li>
                  <li>Adventures for Every Type of Traveler</li>
                  <li>Personalized Journeys</li>
                  <li>Safe and Seamless Travel</li>
                  <li>Passion for Excellence</li>
                </ul>
              </Box>

              <Box sx={{ textAlign: { md: "center", lg: "left" }, mb: 1 }}>
                <Button
                  variant="contained"
                  href="about"
                  sx={{
                    mt: { xs: 2, md: 3 },
                    bgcolor: "#FF5722",
                    color: "white",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#E64A19" },
                    borderRadius: "10px",
                    padding: { xs: "8px 16px", md: "10px 20px" },
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    mx: { xs: "auto", md: 0 }, // centers the button horizontally below md
                  }}
                >
                  View More
                </Button>
              </Box>
            </Box>
          </Box>
          {/* About Image */}
          <Box flex="1" position="relative" mt={{ xs: 4, xl: 0 }}>
            <Box
              className="img-box3"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <img
                className="img1"
                src={AboutImage1}
                alt="About 1"
                style={{
                  maxWidth: "100%",
                  borderRadius: "16px",
                  marginBottom: "16px",
                  width: { xs: "100%", md: "80%", lg: "100%" },
                }}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop={2}
                width="100%"
              >
                <img
                  className="img2"
                  src={AboutImage2}
                  alt="About 2"
                  style={{
                    width: "48%",
                    borderRadius: "16px",
                  }}
                />
                <img
                  className="img3"
                  src={AboutImage3}
                  alt="About 3"
                  style={{
                    width: "48%",
                    borderRadius: "16px",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </section>
  );
}