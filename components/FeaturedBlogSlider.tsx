"use client";

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
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const StyledSection = styled("section")({
  padding: "60px 0",
  backgroundColor: "#f9f9f9",
});

const StyledBlogCard = styled(Card)({
  maxWidth: 345,
  cursor: "pointer",
  mx: 1,
  boxShadow: "0 4px 15px rgba(255, 104, 26, 0.15)",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#fff",
  textAlign: "center",
  margin: 25,
  padding: "16px",
  transition: "transform 0.3s ease, Box-shadow 0.3s ease",
  height: 500, // Fixed height for card
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 600,
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
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

export default function FeaturedBlogSlider() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  // Fetch featured blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${URLPORT}/blog?featured=true`);
        const data = await response.json();
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          console.error("Error fetching featured blogs:", data.message);
        }
      } catch (error) {
        console.error("Network error while fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    router.push(`/blog/${blogId}`);
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <StyledSection>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          sx={{ marginBottom: 4, px: { xs: 2, sm: 3, md: 4 } }} // Added padding for better spacing on smaller screens
        >
          <Typography
            sx={{
              color: "#FF5722",
              fontWeight: 700,
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" }, // Adjusted for smaller devices
              mb: 1,
            }}
          >
            Blog & News
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3rem" }, // Increased font size for smaller screens
              mb: 1,
            }}
          >
            Our Latest Insights
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Adjusted font size for readability
              color: "text.secondary",
              maxWidth: { xs: 400, sm: 500, md: 600 }, // Adjusted maxWidth for smaller screens
              mb: 2,
            }}
          >
            Explore our latest posts for travel tips, updates, and inspiration.
            From destination highlights to expert advice, we bring you the
            latest trends to help you plan your next unforgettable journey.
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
          customLeftArrow={
            <StyledIconButton
              aria-label="Previous Blog"
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
              aria-label="Next Blog"
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
          {blogs.map((blog) => (
            <StyledBlogCard
              key={blog._id}
              onClick={() => handleBlogClick(blog._id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={blog.coverImage || "@/public/images/bg_jmg1.jpg"}
                alt={blog.title}
              />
              <CardContent>
                {/* Title with truncation */}
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2, // Limit to 2 lines for the title
                    height: "3.8rem", // Adjust this to ensure title fits within the available space
                  }}
                >
                  {blog.title}
                </Typography>

                {/* Excerpt with truncation */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // Limit to 3 lines for the excerpt
                  }}
                >
                  {blog.content}
                </Typography>

                {/* Author and Date */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Avatar
                    alt={blog.author}
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    sx={{ width: 24, height: 24, marginRight: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {blog.author}
                  </Typography>
                  <CalendarMonthOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(blog.publishDateTime).toLocaleDateString()}
                  </Typography>
                </Box>

                {/* Tags with single-line truncation */}
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexWrap: "nowrap", // Prevents tags from wrapping to a new line
                    overflow: "hidden",
                  }}
                >
                  {blog.tags &&
                    blog.tags.slice(0, 3).map(
                      (
                        tag,
                        index // Limit tags to 3 for better fit
                      ) => (
                        <Typography
                          key={index}
                          variant="body2"
                          color="primary"
                          sx={{
                            whiteSpace: "nowrap", // Keeps tags in one line
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "inline-block",
                            marginRight: 1,
                            fontWeight: "bold",
                          }}
                        >
                          #{tag}
                        </Typography>
                      )
                    )}
                </Box>

                {/* View Blog Button */}
                <StyledButton
                  variant="contained"
                  color="primary"
                  component={Link}
                  href={`/blog/${blog._id}`}
                >
                  View Blog
                </StyledButton>
              </CardContent>
            </StyledBlogCard>
          ))}
        </Carousel>

        {/* Button to View More Blogs */}
        <Box style={{ textAlign: "center", marginTop: "20px" }}>
          <StyledButton
            variant="contained"
            color="primary"
            component={Link}
            href="/blogs"
          >
            View More Blogs
          </StyledButton>
        </Box>
      </Container>
    </StyledSection>
  );
}