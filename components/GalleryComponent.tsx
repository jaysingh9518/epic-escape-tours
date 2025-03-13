import { useState } from "react";
import { Container, Box, Typography, Modal } from "@mui/material";
import { styled } from "@mui/system";
import PlayIcon from "@mui/icons-material/PlayArrow"; // Use Material UI icon for play button
// Cloudinary image URLs
const LeftShape = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352815/packages/d4qezc1efrx7knle5xhq.png";
const RightShape = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352817/packages/nfcufrdwdamwkydnyh4o.png";
const GalleryImg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731352994/packages/lhzahpjsiikuwhwqe3ja.jpg";
const StyledSection = styled("section")(({ theme }) => ({
  backgroundColor: "#f8f9fa", // Light background
  position: "relative",
  overflow: "hidden",
  padding: "20px 0",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0",
  },
}));

const ShapeMockup = styled("div")({
  position: "absolute",
  zIndex: 0,
  animation: "jump 5s infinite",
});

const GalleryStyle = styled("div")({
  position: "relative",
  display: "inline-block",
  margin: "20px 0",
  width: "100%",
  maxWidth: "100%",
});

const PlayButton = styled("a")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FF5722",
  borderRadius: "50%",
  padding: "10px",
  color: "#fff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#E64A19",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "8px",
  },
}));

// Styled Modal
const VideoModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const VideoIframe = styled("iframe")({
  width: "80%",
  height: "80%",
  border: "none",
});

export default function GalleryComponent() {
  const [open, setOpen] = useState(false); // State to control modal visibility

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <StyledSection className="gallery2 shape-mockup-wrap">
      <ShapeMockup className="shape-mockup d-block d-xl-block" style={{ top: "5%", left: "0%", width: "400px" }}>
        <img src={LeftShape} className="fade-effect" alt="Left Shape" />
      </ShapeMockup>
      <ShapeMockup className="shape-mockup d-block d-xl-block" style={{ top: "5%", right: "0%", width: "400px" }}>
        <img src={RightShape} className="fade-effect" alt="Right Shape" />
      </ShapeMockup>
      <Container>
        <Box display="flex" justifyContent="center" textAlign="center">
          <Box maxWidth={600} zIndex={1} padding={{ xs: 2, md: 4 }}>
            <Typography
              sx={{
                color: "#FF5722",
                fontWeight: 700,
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                lineHeight: "1.5",
                mb: 1,
              }}
            >
              Go & Discover
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3rem" },
                lineHeight: "1.3",
                mb: 1,
              }}
            >
              Breathtaking Cities
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                lineHeight: "1.5",
                textAlign: "center",
                color: "text.secondary",
                maxWidth: "100%",
                mb: 2,
              }}
              component="p"
            >
              Embark on a journey through vibrant cities filled with rich history, stunning architecture, and unforgettable experiences. Whether you&apos;re seeking adventure or relaxation, the world&apos;s most captivating cities await your exploration.
            </Typography>
          </Box>
        </Box>
        <GalleryStyle>
          <img
            src={GalleryImg}
            alt="Gallery"
            style={{
              width: "100%",
              maxWidth: "100%",
              borderRadius: "8px",
            }}
          />
          <PlayButton onClick={handleOpen} className="play-btn popup-video">
            <PlayIcon />
          </PlayButton>
        </GalleryStyle>
      </Container>

      {/* Modal for Video */}
      <VideoModal open={open} onClose={handleClose}>
        <VideoIframe
          src="https://www.youtube.com/embed/qHX5gTMluds?si=bC-oMHylmyQouRXe" // YouTube embed URL
          allowFullScreen
          title="Video"
        />
      </VideoModal>
    </StyledSection>
  );
}