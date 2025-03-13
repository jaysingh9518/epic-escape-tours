import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { URLPORT } from "@/services/URL";
import {
  Container,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Fab,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  // FaArrowLeft,
  FaShare,
  FaUser,
  FaClock,
  FaThumbsUp,
  FaThumbsDown,
  FaEye,
} from "react-icons/fa";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";

const BlogDetails = () => {
  const  params = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchBlogDetails = useCallback(async () => {
    if (!params?._id) return;
    try {
      const response = await fetch(`${URLPORT}/blog/${params?._id}`);
      const data = await response.json();
      if (data.success) {
        setBlogData(data.blog);
        setComments(data.blog.comments);
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching the blog details.");
    } finally {
      setLoading(false);
    }
  }, [params?._id]); // Include id as a dependency

  const incrementViews = useCallback(async () => {
    await fetch(`${URLPORT}/blog/view/${params?._id}`, { method: "PUT" });
  }, [params?._id]); // Include id as a dependency

  const handleLike = async () => {
    const response = await fetch(`${URLPORT}/blog/like/${params?._id}`, { method: "PUT" });
    const data = await response.json();
    if (data.success) setBlogData((prev) => ({ ...prev, likes: data.likes }));
  };

  const handleDislike = async () => {
    const response = await fetch(`${URLPORT}/blog/dislike/${params?._id}`, { method: "PUT" });
    const data = await response.json();
    if (data.success)
      setBlogData((prev) => ({ ...prev, dislikes: data.dislikes }));
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!name || !email || !newComment) {
      alert("Name, Email, and Comment are required.");
      return;
    }

    try {
      const response = await fetch(`${URLPORT}/blog/comment/${params?._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          comment: newComment,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setComments(data.comments);
        setNewComment("");
        setName("");
        setEmail("");
        setSnackbarOpen(true);
      } else {
        alert(data.message || "Failed to add comment.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting your comment.");
    }
  };

  useEffect(() => {
    fetchBlogDetails();
    incrementViews();
  }, [fetchBlogDetails, incrementViews]); // Now includes both functions

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container maxWidth="lg">
      {/* Breadcrumb with dynamic Blog name */}
      <BreadcrumbWrapper
        title= "Blog Details"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Blogs", link: "/blogs" },
          { label: blogData?.title || "Loading..." }, // Use fetched package name
        ]}
      />
      {/* Back to Packages button */}
      {/* <Tooltip title="Back to Packages" arrow>
        <Fab
          color="default"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 10,
          }}
          onClick={() => navigate("/blog")}
        >
          <FaArrowLeft className="text-slate-500" />
        </Fab>
      </Tooltip> */}

      {/* Copy Link button */}
      <Tooltip title="Share Link" arrow>
        <Fab
          color="default"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            zIndex: 10,
          }}
          onClick={handleCopyLink}
        >
          <FaShare className="text-slate-500" />
        </Fab>
      </Tooltip>

      {/* Snackbar for "Link copied" message */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Link copied!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, my: 4 }}>
        {loading && (
          <Typography variant="h6" align="center" id="loading">
            <CircularProgress color="primary" size={40} />
          </Typography>
        )}
        {error && (
          <Box className="flex flex-col w-full items-center gap-4 p-5">
            <Typography variant="body1" color="error" align="center">
              Something went wrong!
            </Typography>
            <Link
              href="/"
              variant="contained"
              color="primary"
              sx={{ padding: 1 }}
            >
              Back
            </Link>
          </Box>
        )}

        {/* Only render the blog details if blogData is loaded */}
        {blogData && (
          <Box sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 3, mb: 1 }}>
            <img
              src={blogData.coverImage}
              alt={blogData.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px 8px 0 0",
              }}
            />
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {blogData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <span>
                  <FaUser className="inline" /> {blogData.author}
                </span>
                <span style={{ marginLeft: "20px" }}>
                  <FaClock className="inline" />{" "}
                  {new Date(blogData.createdAt).toLocaleDateString()}
                </span>
                <span style={{ marginLeft: "20px" }}>
                  <FaEye className="inline" /> {blogData.views} Views
                </span>
                <span style={{ marginLeft: "20px" }}>
                  <FaThumbsUp className="inline" /> {blogData.likes}
                </span>
                <span style={{ marginLeft: "20px" }}>
                  <FaThumbsDown className="inline" /> {blogData.dislikes}
                </span>
              </Typography>

              <Typography variant="body1" sx={{ mb: 4 }}>
                {blogData.content}
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    onClick={handleLike}
                    variant="contained"
                    color="primary"
                  >
                    <FaThumbsUp className="mr-1" /> {blogData.likes}
                  </Button>
                  <Button
                    onClick={handleDislike}
                    variant="contained"
                    color="secondary"
                  >
                    <FaThumbsDown className="mr-1" /> {blogData.dislikes}
                  </Button>
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Tags:
                </Typography>
                {blogData.tags &&
                  blogData.tags.map((tag, index) => (
                    <Chip key={index} label={tag} sx={{ margin: "4px" }} />
                  ))}
              </Box>

              <Box sx={{ mt: 6 }}>
                <Typography variant="h6" className="font-bold mb-3">
                  Comments
                </Typography>
                <form onSubmit={submitComment} className="mb-4 mt-4">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <TextField
                      name="name"
                      id="name"
                      placeholder="Your full name"
                      label="Name"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <TextField
                      name="email"
                      id="email"
                      placeholder="Email address"
                      label="Email"
                      fullWidth
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Box>
                  <TextField
                    id="comment"
                    name="comment"
                    placeholder="Type your comment here..."
                    multiline
                    fullWidth
                    label="Add a comment"
                    variant="outlined"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />
                  <Button type="submit" variant="contained" color="primary" sx={{ color: "white" }}>
                    Submit Comment
                  </Button>
                </form>

                {/* Snackbar for success message */}
                <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
                  <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
                    Comment submitted successfully!
                  </Alert>
                </Snackbar>

                {/* Display comments */}
                <ul>
                  {comments.map((comment, index) => (
                    <li
                      key={index}
                      style={{
                        borderBottom: "1px solid #ccc",
                        padding: "10px 0",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={
                            comment.userProfileImg ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          }
                          alt="Profile"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            marginRight: 8,
                          }}
                        />
                        <Typography variant="body2" fontWeight="bold">
                          {comment.name || "Anonymous"}
                        </Typography>
                      </Box>
                      <Typography variant="body2">{comment.comment}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BlogDetails;
