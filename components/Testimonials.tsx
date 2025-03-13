import { useState, useEffect } from "react";
import { Container, Box, Typography, Card, CardContent, Avatar, Button } from "@mui/material";
import { URLPORT } from "@/services/URL";
import { styled } from "@mui/system";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// Cloudinary image URLs
const bgImg = "https://res.cloudinary.com/dkxmweeur/image/upload/v1731354401/packages/zmz96e4jvs4mgywp0mas.jpg";

const StyledSection = styled("section")({
  backgroundImage: `url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "60px 0",
  position: "relative",
  overflow: "hidden",
});

const StyledTestimonial = styled(Card)({
  maxWidth: 345,
  borderRadius: "16px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  textAlign: "center",
  margin: "0 auto",
});

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTestimonials = (pageNum = 1) => {
    fetch(`${URLPORT}/rating/get-all-ratings?page=${pageNum}&limit=10&minRating=5`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.ratings)) {
          setTestimonials(data.ratings);
          setTotalPages(data.totalPages);
        } else {
          console.error("Error fetching testimonials data");
        }
      })
      .catch((error) => console.error("Error fetching testimonials:", error));
  };

  useEffect(() => {
    fetchTestimonials(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <StyledSection>
      <Container>
        <Box textAlign="center" mb={4}>
          <Typography
            sx={{
              color: "#FF5722",
              fontWeight: 700,
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
              mb: 1,
            }}
          >
            Our Best Reviews
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "2.2rem", sm: "2.6rem", md: "3rem" },
              mb: 1,
            }}
          >
            50,000 Happy Clients Around The World
          </Typography>
        </Box>

        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
          {testimonials.map((testimonial) => (
            <StyledTestimonial key={testimonial._id}>
              <CardContent>
                <Avatar
                  src={testimonial.userProfileImg}
                  alt={testimonial.name}
                  sx={{ width: 60, height: 60, margin: "0 auto 16px" }}
                />
                <Typography variant="body2" mb={2}>
                  &quot;{testimonial.review}&quot;
                </Typography>
                <Box display="flex" justifyContent="center" mb={2}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: "#FFB400",
                        fontSize: "1.25rem",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {testimonial.designation || "Valued Customer"}
                </Typography>
              </CardContent>
            </StyledTestimonial>
          ))}
        </Carousel>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            disabled={page <= 1}
            onClick={handlePrevPage}
            sx={{ mx: 1, color: "#fff" }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={page >= totalPages}
            onClick={handleNextPage}
            sx={{ mx: 1, color: "#fff" }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </StyledSection>
  );
}