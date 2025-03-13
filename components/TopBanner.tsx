import { Box, Container, IconButton, Typography, Link as MuiLink } from "@mui/material";
import { Email as EmailIcon, Phone as PhoneIcon } from "@mui/icons-material";
import { Facebook as FacebookIcon, Instagram as InstagramIcon, YouTube as YouTubeIcon, Twitter as TwitterIcon, WhatsApp as WhatsAppIcon } from "@mui/icons-material";

const TopBanner = () => {
  const contactInfo = [
    {
      icon: <EmailIcon />, 
      link: "mailto:info@heavenofholiday.com",
      text: "info@heavenofholiday.com",
    },
    {
      icon: <PhoneIcon />,
      link: "tel:+917452849199",
      text: "074 5284 9199",
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, link: "https://facebook.com/heavenofholiday" },
    { icon: <InstagramIcon />, link: "https://instagram.com/heavenofholiday" },
    { icon: <YouTubeIcon />, link: "https://www.youtube.com/channel/UC3tLT4dew3mDziRewJ0zuYg?sub_confirmation=1" },
    { icon: <TwitterIcon />, link: "https://twitter.com/heavenofholiday" },
    { icon: <WhatsAppIcon />, link: "http://wa.me/917452849199?text=Hi%2C+I+contacted+you+through+your+website." },
  ];

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ff681a",
        color: "white",
        py: 1,
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Contact Info */}
        <Box display="flex" alignItems="center">
          {contactInfo.map(({ icon, link, text }, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              sx={{ ml: index === 0 ? 0 : 2 }}
            >
              <IconButton component="a" href={link} sx={{ color: "white" }}>
                {icon}
              </IconButton>
              <Typography sx={{ ml: 1 }}>
                <MuiLink
                  href={link}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {text}
                </MuiLink>
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Social Links */}
        <Box display="flex" alignItems="center">
          {socialLinks.map(({ icon, link }, index) => (
            <IconButton
              key={index}
              component="a"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "white",
                ml: 2,
                transition: "transform 0.3s ease, color 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  color: "secondary.main", // Gold accent on hover
                },
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TopBanner;
