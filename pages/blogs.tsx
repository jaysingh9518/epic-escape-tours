"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { URLPORT } from "@/services/URL";
import {
  Container,
  Box,
  Pagination,
  CircularProgress,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import BlogCard from "@/components/BlogCard";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";
import CallToAction from "@/components/CallToAction";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const itemsPerPage = 9;

  // Debounce search input (wait 500ms before updating)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${URLPORT}/blog?searchTerm=${debouncedSearch}&page=${currentPage}&limit=${itemsPerPage}`;
      if (filter === "featured") url += "&featured=true";
      if (filter === "latest") url += "&sort=createdAt";
      if (filter === "top") url += "&sort=views";

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(data.message || "Failed to fetch blogs");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filter, currentPage]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setOpen(false); // Close the dialog when filter is applied
  };

  const handleClearFilters = () => {
    router.push("?page=1", { replace: true });
    setSearch("");
    setFilter("all");
    setCurrentPage(1);
    setOpen(false); // Close the dialog on filter reset
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100); // Optional slight delay to ensure UI is ready
    }
  }, [currentPage, loading]);

  return (
    <Box sx={{ width: "100%" }}>
      <BreadcrumbWrapper
        title="All Blog Posts"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Blogs" },
        ]}
      />
      <Container maxWidth="lg">
        <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, my: 4 }}>
          {loading && (
            <Typography variant="h6" align="center">
              <CircularProgress color="primary" size={40} />
            </Typography>
          )}
          {error && (
            <Box className="flex flex-col w-full items-center gap-4 p-5">
              <Typography variant="body1" color="error" align="center">
                Something went wrong!
              </Typography>
            </Box>
          )}

          <Box display="flex" justifyContent="center" mb={2}>
            <IconButton
              onClick={handleOpen}
              color="primary"
              sx={{
                display: "flex",
                alignItems: "center",
                border: "2px solid transparent",
                borderRadius: "8px",
                padding: "8px 16px",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
                "&:active": {
                  borderColor: "primary.dark",
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              <SearchIcon sx={{ mr: 1 }} />
              <Typography variant="button">Search & Filters</Typography>
            </IconButton>
          </Box>

          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle align="center">
              Search & Filters
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "grey.700",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box display="flex" p={2} flexDirection="column" gap={2}>
                <TextField
                  variant="outlined"
                  label="Search"
                  value={search}
                  onChange={handleSearchChange}
                  fullWidth
                  InputProps={{
                    endAdornment: search && (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setSearch("")}>
                          <CloseIcon sx={{ fontSize: 20, color: "lightgrey" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap" my={2}>
                  {["all", "featured", "latest", "top"].map((option) => (
                    <Button
                      key={option}
                      variant={filter === option ? "contained" : "outlined"}
                      color="primary"
                      onClick={() => handleFilterChange(option)}
                      sx={{
                        color: filter === option ? "white" : "primary.main",
                      }}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Button>
                  ))}
                  <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>

          <Box display="flex" justifyContent="center">
            {blogs.length === 0 ? (
              <Typography variant="h5" align="center">
                No Blogs Available!
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </Box>
            )}
          </Box>

          <Box display="flex" justifyContent="center" sx={{ mt: 4, mb: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Box>
      </Container>
      <CallToAction />
    </Box>
  );
};

export default Blogs;
