import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { URLPORT } from "@/services/URL";
import PackageCard from "@/components/PackageCard";
import BlogCard from "@/components/BlogCard";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Drawer,
  Tabs,
  Tab,
  Skeleton,
  Alert,
  IconButton,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FilterListIcon from "@mui/icons-material/FilterList";

// Custom TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`search-tabpanel-${index}`}
      aria-labelledby={`search-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Search = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [packagePage, setPackagePage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);
  const [totalPackageCount, setTotalPackageCount] = useState(0);
  const [totalBlogCount, setTotalBlogCount] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const itemsPerPage = 6; // Increased for better user experience

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
      setSearchData({
        searchTerm: searchTermFromUrl || "",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    fetchAllData(urlParams.toString());
  }, [window.location.search, packagePage, blogPage, tabValue]);

  const fetchAllData = async (searchQuery) => {
    setLoading(true);
    try {
      // Only fetch packages if on "All" tab or "Packages" tab
      if (tabValue === 0 || tabValue === 1) {
        const packageResponse = await fetch(
          `${URLPORT}/package/get-packages?${searchQuery}&limit=${itemsPerPage}&page=${packagePage}`
        );
        const packageData = await packageResponse.json();
        setAllPackages(packageData?.packages || []);
        setTotalPackageCount(packageData?.totalPackages || 0);
      }

      // Only fetch blogs if on "All" tab or "Blogs" tab
      if (tabValue === 0 || tabValue === 2) {
        const blogResponse = await fetch(
          `${URLPORT}/blog?${searchQuery}&limit=${itemsPerPage}&page=${blogPage}`
        );
        const blogData = await blogResponse.json();
        setAllBlogs(blogData?.blogs || []);
        setTotalBlogCount(blogData?.totalBlogs || 0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (id === "searchTerm") {
      setSearchData((prevData) => ({
        ...prevData,
        searchTerm: value,
      }));
    } else if (id === "offer") {
      setSearchData((prevData) => ({
        ...prevData,
        offer: checked,
      }));
    } else if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSearchData((prevData) => ({
        ...prevData,
        sort: sort || "createdAt",
        order: order || "desc",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    
    if (searchData.searchTerm) urlParams.set("searchTerm", searchData.searchTerm);
    if (searchData.offer) urlParams.set("offer", searchData.offer);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    
    router.push(`/search?${urlParams.toString()}`);
    setOpenDrawer(false);
  };

  const handleClearFilters = () => {
    setSearchData({
      searchTerm: "",
      offer: false,
      sort: "createdAt",
      order: "desc",
    });
    router.push("/search");
    setOpenDrawer(false);
  };

  const fetchFeaturedBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URLPORT}/blog/featured`);
      const data = await response.json();
      setAllBlogs(data.blogs);
      setTotalBlogCount(data.blogs.length);
      setTabValue(2); // Switch to blog tab
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePackagePageChange = (event, value) => {
    setPackagePage(value);
  };

  const handleBlogPageChange = (event, value) => {
    setBlogPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

    // Scroll to top when page changes
    useEffect(() => {
      if (!loading) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100); // Optional slight delay to ensure UI is ready
      }
    }, [loading]);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* Desktop Search Header */}
      <Card
        elevation={3}
        sx={{
          display: { xs: "none", md: "block" },
          mb: 4,
          borderRadius: 2,
          backgroundColor: "background.paper",
          position: "sticky",
          top: 16,
          zIndex: 10,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5} lg={6}>
                <TextField
                  id="searchTerm"
                  placeholder="Search packages and blogs..."
                  variant="outlined"
                  fullWidth
                  value={searchData.searchTerm}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                    sx: { borderRadius: 1 },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2} lg={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="offer"
                      checked={searchData.offer}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Offers"
                />
              </Grid>

              <Grid item xs={12} md={3} lg={2}>
                <FormControl fullWidth>
                  <Select
                    id="sort_order"
                    value={`${searchData.sort}_${searchData.order}`}
                    onChange={handleChange}
                    displayEmpty
                    sx={{ borderRadius: 1 }}
                    startAdornment={
                      <SortIcon
                        sx={{ mr: 1, ml: 1, color: "text.secondary" }}
                      />
                    }
                  >
                    <MenuItem disabled value="">
                      <em>Sort by</em>
                    </MenuItem>
                    <MenuItem value="packagePrice_desc">
                      Price high to low
                    </MenuItem>
                    <MenuItem value="packagePrice_asc">
                      Price low to high
                    </MenuItem>
                    <MenuItem value="packageRating_desc">Top Rated</MenuItem>
                    <MenuItem value="packageTotalRatings_desc">
                      Most Rated
                    </MenuItem>
                    <MenuItem value="createdAt_desc">Latest</MenuItem>
                    <MenuItem value="createdAt_asc">Oldest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<SearchIcon />}
                    sx={{
                      color: "white",
                      borderRadius: 1,
                      py: 1.5,
                      flex: 1,
                      boxShadow: 2,
                    }}
                  >
                    Search
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={fetchFeaturedBlogs}
                    sx={{
                      borderRadius: 1,
                      py: 1.5,
                      flex: 1,
                    }}
                  >
                    Featured
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Mobile Search Bar */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            id="searchTerm"
            placeholder="Search..."
            variant="outlined"
            fullWidth
            value={searchData.searchTerm}
            onChange={handleChange}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
              sx: { borderRadius: 1 },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDrawer(true)}
            sx={{ color: "white", borderRadius: 1 }}
          >
            <TuneIcon />
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            onClick={fetchFeaturedBlogs}
            sx={{ color: "text.secondary" }}
          >
            Featured Blogs
          </Button>

          {searchData.searchTerm && (
            <Chip
              label={searchData.searchTerm}
              onDelete={() => {
                setSearchData((prev) => ({ ...prev, searchTerm: "" }));
                handleSubmit({ preventDefault: () => {} });
              }}
              size="small"
            />
          )}
        </Box>
      </Box>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "75vh",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6">Search Filters</Typography>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <form
            onSubmit={(e) => {
              handleSubmit(e);
              setOpenDrawer(false);
            }}
          >
            <Stack spacing={3}>
              <TextField
                id="searchTerm"
                label="Search"
                variant="outlined"
                fullWidth
                value={searchData.searchTerm}
                onChange={handleChange}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    id="offer"
                    checked={searchData.offer}
                    onChange={handleChange}
                  />
                }
                label="Special Offers"
              />

              <FormControl fullWidth>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort_order"
                  value={`${searchData.sort}_${searchData.order}`}
                  onChange={handleChange}
                  label="Sort By"
                >
                  <MenuItem value="packagePrice_desc">
                    Price high to low
                  </MenuItem>
                  <MenuItem value="packagePrice_asc">
                    Price low to high
                  </MenuItem>
                  <MenuItem value="packageRating_desc">Top Rated</MenuItem>
                  <MenuItem value="packageTotalRatings_desc">
                    Most Rated
                  </MenuItem>
                  <MenuItem value="createdAt_desc">Latest</MenuItem>
                  <MenuItem value="createdAt_asc">Oldest</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ color: "white", py: 1.5, borderRadius: 1 }}
                >
                  Apply Filters
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  sx={{ borderRadius: 1 }}
                >
                  Clear
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Drawer>

      {/* Content Section with Tabs */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              minHeight: 48,
            },
            "& .Mui-selected": {
              color: "primary.main",
            },
          }}
        >
          <Tab label="All Results" />
          <Tab label={`Packages (${totalPackageCount})`} />
          <Tab label={`Blogs (${totalBlogCount})`} />
        </Tabs>

        {/* Results Section */}
        <TabPanel value={tabValue} index={0}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5" fontWeight="600">
                Packages
              </Typography>
              {totalPackageCount > 3 && (
                <Button
                  variant="text"
                  onClick={() => handleTabChange(null, 1)}
                  endIcon={<ArrowForwardIcon />}
                >
                  View all
                </Button>
              )}
            </Box>

            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={3}
            >
              {loading &&
                [1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    variant="rounded"
                    height={200}
                    animation="wave"
                  />
                ))}

              {!loading && allPackages.length === 0 && (
                <Alert severity="info" sx={{ gridColumn: "1/-1" }}>
                  No packages found matching your search criteria.
                </Alert>
              )}

              {!loading &&
                allPackages
                  .slice(0, 3)
                  .map((packageData, i) => (
                    <PackageCard key={i} packageData={packageData} />
                  ))}
            </Box>

            <Divider sx={{ my: 6 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5" fontWeight="600">
                Blogs
              </Typography>
              {totalBlogCount > 3 && (
                <Button
                  variant="text"
                  onClick={() => handleTabChange(null, 2)}
                  endIcon={<ArrowForwardIcon />}
                >
                  View all
                </Button>
              )}
            </Box>

            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={3}
            >
              {loading &&
                [1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    variant="rounded"
                    height={220}
                    animation="wave"
                  />
                ))}

              {!loading && allBlogs.length === 0 && (
                <Alert severity="info" sx={{ gridColumn: "1/-1" }}>
                  No blogs found matching your search criteria.
                </Alert>
              )}

              {!loading &&
                allBlogs
                  .slice(0, 3)
                  .map((blog, i) => <BlogCard key={i} blog={blog} />)}
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box>
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={3}
            >
              {loading &&
                Array(itemsPerPage)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      height={200}
                      animation="wave"
                    />
                  ))}

              {!loading && allPackages.length === 0 && (
                <Alert severity="info" sx={{ gridColumn: "1/-1" }}>
                  No packages found matching your search criteria.
                </Alert>
              )}

              {!loading &&
                allPackages.map((packageData, i) => (
                  <PackageCard key={i} packageData={packageData} />
                ))}
            </Box>

            <Box display="flex" justifyContent="center" sx={{ mt: 6 }}>
              <Pagination
                count={Math.ceil(totalPackageCount / itemsPerPage)}
                page={packagePage}
                onChange={handlePackagePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: 1,
                  },
                }}
              />
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box>
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={3}
            >
              {loading &&
                Array(itemsPerPage)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      height={220}
                      animation="wave"
                    />
                  ))}

              {!loading && allBlogs.length === 0 && (
                <Alert severity="info" sx={{ gridColumn: "1/-1" }}>
                  No blogs found matching your search criteria.
                </Alert>
              )}

              {!loading &&
                allBlogs.map((blog, i) => <BlogCard key={i} blog={blog} />)}
            </Box>

            <Box display="flex" justifyContent="center" sx={{ mt: 6 }}>
              <Pagination
                count={Math.ceil(totalBlogCount / itemsPerPage)}
                page={blogPage}
                onChange={handleBlogPageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: 1,
                  },
                }}
              />
            </Box>
          </Box>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Search;
