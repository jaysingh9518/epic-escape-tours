import PropTypes from "prop-types"; // Import PropTypes for prop validation
import Link from "next/link";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import {
  FaUser,
  FaClock,
  FaThumbsUp,
  FaThumbsDown,
  FaEye,
  FaComment,
} from "react-icons/fa";

const BlogCard = ({ blog }) => {
  return (
    <Box sx={{ mx: 1, my: 2 }}>
      <Link href={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            boxShadow: 3,
            overflow: "hidden",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
            width: { xs: "100%", sm: 345 }, // Responsive width
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={blog.coverImage}
            alt={blog.title}
            sx={{
              objectFit: "cover",
            }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {blog.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <FaUser style={{ marginRight: 8 }} />
              {blog.author}
              <FaClock style={{ margin: "0 8px" }} />
              {new Date(blog.createdAt).toLocaleDateString()}
              <FaEye style={{ margin: "0 8px" }} />
              {blog.views} Views
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {blog.content.substring(0, 100)}...
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              mt={2}
            >
              <Box display="flex" alignItems="center">
                <Button
                  size="small"
                  startIcon={<FaThumbsUp />}
                  sx={{ color: "green" }}
                >
                  {blog.likes}
                </Button>
                <Button
                  size="small"
                  startIcon={<FaThumbsDown />}
                  sx={{ color: "red" }}
                >
                  {blog.dislikes}
                </Button>
                
                {/* Comment Count */}
                <span style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 8, color: "blue" }}>
                  <FaComment style={{ marginRight: 4 }} />
                  {blog.comments ? blog.comments.length : 0} {/* Display the comment count */}
                </span>

              </Box>

              <Box display="flex" flexWrap="wrap" alignItems="center">
                {blog.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={`#${tag}`}
                    size="small"
                    sx={{
                      marginRight: 1,
                      marginTop: { xs: 1, sm: 0 },
                      backgroundColor: "#f0f0f0",
                      color: "#333",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

// PropTypes for BlogCard component
BlogCard.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default BlogCard;
