"use client";

import { useEffect, useState, useCallback } from "react"; 
import { useRouter } from "next/navigation";
import { URLPORT } from "@/services/URL";
import {
  Container, Box, Pagination, CircularProgress, Typography, TextField, InputLabel,
  FormControl, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent,
  InputAdornment, IconButton
} from "@mui/material"; 
import PackageCard from "@/components/PackageCard"; 
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper"; 
import CallToAction from "@/components/CallToAction"; 
import SearchIcon from "@mui/icons-material/Search"; 
import CloseIcon from "@mui/icons-material/Close";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [days, setDays] = useState("");
  const [nights, setNights] = useState("");
  const [packageType, setPackageType] = useState("");
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();
  const itemsPerPage = 9;

  // Debounce search input (wait 500ms before updating)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch packages
  const fetchPackages = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      let url = `${URLPORT}/package/get-packages?page=${page}&limit=${itemsPerPage}&searchTerm=${debouncedSearch}`;
      if (filter === "offer") url += "&offer=true";
      else if (filter === "latest") url += "&sort=createdAt";
      else if (filter === "top") url += "&sort=packageRating";
      if (days) url += `&days=${parseInt(days, 10)}`;
      if (nights) url += `&nights=${parseInt(nights, 10)}`;
      if (packageType) url += `&packageType=${packageType}`;

      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setPackages(data.packages);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(data.message || "Failed to fetch packages");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filter, days, nights, packageType, itemsPerPage]);

  useEffect(() => {
    fetchPackages(currentPage);
  }, [fetchPackages, currentPage, debouncedSearch, filter]);

  // Parse URL params on mount - FIXED: Added check for window object
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setSearch(params.get("search") || "");
      setFilter(params.get("filter") || "all");
      setPackageType(params.get("packageType") || "");
      setDays(params.get("days") || "");
      setNights(params.get("nights") || "");

      const page = parseInt(params.get("page"), 10) || 1;
      setCurrentPage(page);
    }
  }, []);  // Empty dependency array as this should only run once on mount

  // Handle filter and search changes
  const handleFilterChange = (key, value) => {
    // Only manipulate URL params on client-side
    if (typeof window !== "undefined") {
      const newParams = new URLSearchParams(window.location.search);
      newParams.set(key, value);
      newParams.set("page", 1); // Reset to page 1 on filter change
      router.push(`?${newParams.toString()}`, { replace: true });
    }
    setCurrentPage(1);
    setOpen(false);
  };

  // Handle clearing filters
  const handleClearFilters = () => {
    router.push("?page=1", { replace: true });
    setSearch("");
    setFilter("all");
    setPackageType("");
    setDays("");
    setNights("");
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100); // Optional slight delay to ensure UI is ready
    }
  }, [currentPage, loading]);

  return (
    <Box className="main" sx={{ width: "100%" }}>
      <BreadcrumbWrapper
        title="All Packages"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Packages" },
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
            <Typography variant="body1" color="error" align="center">
              Something went wrong!
            </Typography>
          )}

          {/* Search Icon Button to Open Dialog */}
          <Box display="flex" justifyContent="center" mb={2}>
            <IconButton
              onClick={handleOpen}
              color="primary"
              sx={{
                display: "flex",
                alignItems: "center",
                border: "2px solid transparent", // Default border
                borderRadius: "8px", // Border radius
                padding: "8px 16px", // Padding around the icon and text
                transition: "all 0.3s ease", // Smooth transition for hover effect
                "&:hover": {
                  borderColor: "primary.main", // Border color on hover
                  backgroundColor: "rgba(0, 0, 0, 0.08)", // Background color on hover
                },
                "&:active": {
                  borderColor: "primary.dark", // Border color on click
                  backgroundColor: "rgba(0, 0, 0, 0.12)", // Background color on click
                },
              }}
            >
              <SearchIcon sx={{ mr: 1 }} />
              <Typography variant="button">Search Packages</Typography>
            </IconButton>
          </Box>

          {/* Search and Filter Dialog */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: {borderRadius: '16px', }, }}>
            <DialogTitle align="center" sx={{ position: "relative", pb: 2 }}>
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
                  onChange={(e) => setSearch(e.target.value)}
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
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Package Type</InputLabel>
                  <Select
                    value={packageType}
                    onChange={(e) => handleFilterChange("packageType", e.target.value)}
                    label="Package Type"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {["Adventure Travel", "Art and Museum Travel", "Beach and Island Getaways", "Business Travel", "Celebration and Holiday Travel", "Cruise Vacations", "Culinary Experiences", "Cultural and Heritage Tours", "Eco-Friendly Travel", "Expedition Travel", "Family and Couples Travel", "Family and Group Packages", "Group Travel", "Honeymoon and Maternity Travel", "Historical and Archaeological Tours", "Outdoor Adventures", "Relaxation and Wellness", "Road Trips and RV Adventures", "Solo Travel", "Sustainable Travel", "Temple Tours", "Wellness and Retreats", "Wildlife and Nature Travel", "Winter Vacations", "Other"].map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  label="Nights"
                  type="number"
                  value={nights}
                  onChange={(e) => handleFilterChange("nights", e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: nights && (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleFilterChange("nights", "")}> 
                          <CloseIcon sx={{ fontSize: 20, color: "lightgrey" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Days"
                  type="number"
                  value={days}
                  onChange={(e) => handleFilterChange("days", e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: days && (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleFilterChange("days", "")}> 
                          <CloseIcon sx={{ fontSize: 20, color: "lightgrey" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Filter Buttons */}
                <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap" my={2}>
                  {["all", "offer", "latest", "top"].map((type) => (
                    <Button
                      key={type}
                      variant={filter === type ? "contained" : "outlined"}
                      color="primary"
                      onClick={() => handleFilterChange("filter", type)}
                      sx={{
                        color: filter === type ? "white" : "primary.main",
                      }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                  <Button variant="outlined" color="secondary" onClick={handleClearFilters} >Clear Filters</Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>

          <Box display="flex" justifyContent="center">
            {packages.length === 0 ? (
              <Typography variant="h5" align="center">
                No packages found!
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
                  justifyContent: "center",
                }}
              >
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id || pkg._id} packageData={pkg} />
                ))}
              </Box>
            )}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4, mb: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => {
                  setCurrentPage(page);
                  router.push(`?page=${page}`, { replace: true });
                  fetchPackages(page);
                }}
                variant="outlined"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Container>
      <CallToAction />
    </Box>
  );
};

export default Packages;