"use client"

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams, usePathname } from "next/navigation"; // Added usePathname
import { motion } from "framer-motion";
import { URLPORT } from "@/services/URL";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaClock,
  FaMapMarkerAlt,
  FaShare,
  FaSuitcase,
  FaUser,
} from "react-icons/fa";
import Rating from "@mui/material/Rating";
import {
  Container,
  Box,
  Button,
  Typography,
  Divider,
  TextField,
  CircularProgress,
  Fab,
  IconButton,
  Snackbar,
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MdFeedback } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import RatingCard from "@/components/RatingCard";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";

const Package = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname(); // Use Next.js's usePathname hook instead of window.location.pathname
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [openTooltip, setOpenTooltip] = useState(false);

  useEffect(() => {
    setOpenTooltip(true); // Show tooltip on mount
    const timer = setTimeout(() => {
      setOpenTooltip(false); // Hide after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % packageData?.packageImages.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? packageData?.packageImages.length - 1 : prev - 1
    );
  };

  const [packageData, setPackageData] = useState({
    packageName: "",
    packageDescription: "",
    packageDestination: "",
    packageDays: 1,
    packageNights: 1,
    packageInclusions: [],
    packageAccommodation: "",
    packageTransportation: "",
    packageMeals: "",
    packageActivities: "",
    packagePrice: 500,
    packageDiscountPrice: 0,
    packageOffer: false,
    packageRating: 0,
    packageTotalRatings: 0,
    packageImages: [],
    packageType: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ratingsData, setRatingsData] = useState({
    rating: 0,
    review: "",
    packageId: params?._id,
    name: "",
    email: "",
  });

  const [packageRatings, setPackageRatings] = useState([]);
  const [ratingGiven, setRatingGiven] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Wrap getPackageData in useCallback
  const getPackageData = useCallback(async () => {
    if (!params?._id) return;
    try {
      setLoading(true);
      const res = await fetch(`${URLPORT}/package/get-package-data/${params?._id}`);
      const data = await res.json();
      if (data?.success) {
        setPackageData(data?.packageData);
      } else {
        setError(data?.message || "Something went wrong!");
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch package data.");
      setLoading(false);
    }
  }, [params?._id]); // Added params.id as a dependency

  const checkRatingGiven = useCallback(async () => {
    if (!ratingsData.email || !params?._id) return;
    try {
      setLoading(false);
      const res = await fetch(
        `${URLPORT}/rating/rating-given/${ratingsData.email}/${params?._id}`
      );
      const data = await res.json();
      setRatingGiven(data?.given);
    } catch (error) {
      console.log(error);
    }
  }, [ratingsData.email, params?._id]); // Dependencies updated
  
  const giveRating = async () => {
    if (ratingGiven) {
      alert("You already submitted your rating!");
      return;
    }

    if (!ratingsData.rating || !ratingsData.review || !ratingsData.email || !ratingsData.name) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${URLPORT}/rating/give-rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratingsData),
      });

      const data = await res.json();
      setLoading(false);
      alert(data?.message || "Something went wrong!");

      if (data?.success) {
        getPackageData();
        getRatings();
        checkRatingGiven();
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please try again later.");
    }
  };

  const getRatings = useCallback(async () => {
    try {
      const res = await fetch(`${URLPORT}/rating/get-ratings/${params._id}/4`);
      const data = await res.json();
      setPackageRatings(data || []);
    } catch (error) {
      console.log(error);
    }
  }, [params?._id]);

  useEffect(() => {
    if (params?._id) {
      getPackageData();
      getRatings();
      checkRatingGiven();
    }
  }, [params?._id, getPackageData, getRatings, checkRatingGiven]);
  
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Breadcrumb with dynamic package name */}
      <BreadcrumbWrapper
        title="Package Details"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Packages", link: "/packages" },
          {
            label: packageData?.packageName || "Loading...",
            link: pathname, // Use Next.js's pathname instead of window.location.pathname
          }, // Use fetched package name
        ]}
      />
      
      {/* Copy Link button */}
      <Tooltip title="Share Link" placement="left" arrow>
        <Fab
          color="default"
          style={{
            position: "fixed",
            bottom: "150px",
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
      {loading && <CircularProgress color="primary" size={40} sx={{ display: "block", margin: "auto" }} />}
      {error && <Typography color="error" align="center">{error}</Typography>}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 2,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          my: 4,
        }}
      >

        {/* Floating Feedback Button */}
        <Tooltip title="Give Rating & Feedback" placement="left" open={openTooltip} arrow>
          <Fab
            color="primary"
            sx={{
              color: "white",
              position: "fixed",
              bottom: 80,
              right: 16,
              zIndex: 1000,
            }}
            onClick={handleClickOpen}
            onMouseEnter={() => setOpenTooltip(true)} // Show tooltip on hover
            onMouseLeave={() => setOpenTooltip(false)} // Hide on mouse leave
          >
            <MdFeedback size={30} />
          </Fab>
        </Tooltip>

        {/* Dialog Box for Feedback/Rating */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: {borderRadius: '16px', }, }}>
          <DialogTitle align="center" sx={{ position: "relative", pb: 2 }}>
            Give Rating & Review
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
            {packageRatings && (
              <>
                
                {!ratingGiven && (
                  <Box display="flex" p={2} flexDirection="column" alignItems="center" gap={2}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      value={ratingsData?.name}
                      onChange={(e) => setRatingsData({ ...ratingsData, name: e.target.value })}
                      fullWidth
                      sx={{ bgcolor: "background.paper" }}
                    />
                    <TextField
                      label="Email"
                      variant="outlined"
                      value={ratingsData?.email}
                      onChange={(e) => setRatingsData({ ...ratingsData, email: e.target.value })}
                      fullWidth
                      sx={{ bgcolor: "background.paper" }}
                      error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ratingsData.email) && ratingsData.email !== ""}
                      helperText={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ratingsData.email) && ratingsData.email !== "" ? "Enter a valid email address" : ""}
                    />
                    <Rating
                      name="simple-controlled"
                      value={ratingsData?.rating}
                      onChange={(e, newValue) => setRatingsData({ ...ratingsData, rating: newValue })}
                    />
                    <TextField
                      label="Review"
                      multiline
                      variant="outlined"
                      rows={3}
                      placeholder="Type your review here..."
                      value={ratingsData?.review}
                      onChange={(e) => setRatingsData({ ...ratingsData, review: e.target.value })}
                      fullWidth
                      sx={{ bgcolor: "background.paper" }}
                    />
                    <Button
                      sx={{ color: "white", my: 3 }}
                      variant="contained"
                      color="primary"
                      disabled={!ratingsData.rating || !ratingsData.review || !ratingsData.email || !ratingsData.name || loading}
                      onClick={giveRating}
                    >
                      {loading ? "Loading..." : "Submit"}
                    </Button>
                    <Divider sx={{ width: "100%", my: 3 }} />
                  </Box>
                )}

                {packageRatings.length === 0 ? (
                  <Typography align="center">No ratings given</Typography>
                ) : (
                  <Box mt={2}>
                    <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" justifyContent="center">
                      {packageRatings.slice(0, 4).map((rating, index) => (
                        <Box key={index}>
                          <RatingCard packageRatings={[rating]} />
                        </Box>
                      ))}
                    </Box>

                    {packageData.packageTotalRatings > 4 && (
                      <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                          onClick={() => router.push(`/package/ratings/${params?._id}`)}
                          variant="outlined"
                          color="primary"
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          View All <FaArrowRight />
                        </Button>
                      </Box>
                    )}
                  </Box>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>

        {packageData && !loading && !error && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                p: 1,
              }}
            >
              <Box className="max-w-[350px] mx-auto relative overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={packageData?.packageImages[current]}
                    alt={`Slide ${current}`}
                    style={{
                      height: "auto",
                      width: "auto",
                      maxHeight: "400px",
                      maxWidth: "100%",
                      borderRadius: "15px",
                      objectFit: "contain",
                    }}
                  />
                </motion.div>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Button onClick={prevSlide}><FaArrowLeft /></Button>
                  <Button onClick={nextSlide}><FaArrowRight /></Button>
                </Box>
              </Box>
              {/* Booking Button */}
              <Box display="flex" justifyContent="center" mb={1} mt={1}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    router.push(`/booking/${params?._id}`);
                  }}
                  sx={{
                    width: { xs: "100%", sm: "200px" },
                    opacity: { "&:hover": 0.95 },
                    mb: 2,
                  }}
                >
                  Book Now
                </Button>
              </Box>
              {/* Booking Button */}
            </Box>

            <Box
              className="w-full flex flex-col gap-3"
              sx={{
                p: { xs: 2, sm: 4, md: 5 }, // Responsive padding
                gap: { xs: 2, sm: 3 }, // Responsive gap between elements
              }}
            >

              {/* Package Name */}
              <Typography
                variant="h4"
                fontWeight="bold"
                textTransform="capitalize"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} // Responsive font size
              >
                {packageData?.packageName}
              </Typography>

              {/* Price */}
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  gap: 1,
                  my: 3,
                  flexWrap: "wrap", // Wrap for smaller screens
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                {packageData?.packageOffer ? (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                      }}
                    >
                      ₹{packageData?.packagePrice}
                    </span>
                    <span>₹{packageData?.packageDiscountPrice}</span>
                    <span
                      style={{
                        backgroundColor: "green",
                        padding: "0.3rem 0.6rem", // Responsive padding
                        borderRadius: "5px",
                        color: "white",
                        fontSize: "0.875rem", // Adjusted font size
                      }}
                    >
                      {Math.floor(
                        ((+packageData?.packagePrice -
                          +packageData?.packageDiscountPrice) /
                          +packageData?.packagePrice) *
                          100
                      )}
                      % Off
                    </span>
                  </>
                ) : (
                  <span>₹{packageData?.packagePrice}</span>
                )}
              </Typography>

              {/* Destination */}
              <Typography
                variant="body1"
                color="green"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                <FaMapMarkerAlt />
                {packageData?.packageDestination}
              </Typography>

              {/* Package Type */}
              <Typography
                variant="body1"
                color="green"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                <FaSuitcase />
                {packageData?.packageType}
              </Typography>

              {/* Nights & Days */}
              {(packageData?.packageNights || packageData?.packageDays) && (
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  <FaClock />
                  {+packageData?.packageNights > 0 &&
                    (+packageData?.packageNights > 1
                      ? `${packageData?.packageNights} Nights`
                      : "1 Night")}
                  {+packageData?.packageDays > 0 &&
                    (+packageData?.packageDays > 1
                      ? `, ${packageData?.packageDays} Days`
                      : ", 2 Day")}
                </Typography>
              )}

              {/* Minimum Pax */}
              <Typography
                variant="body1"
                color="black"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                <FaUser />
                {packageData?.packageMinPax} Person
                {packageData?.packageMinPax > 1 && "s"}{" "}
                {packageData?.packageMinPax > 1 ? "are" : "is"} required
              </Typography>

              {/* Rating */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                <Typography fontWeight="bold">
                  {packageData?.packageRating
                    ? packageData?.packageRating.toFixed(1)
                    : 0}{" "}
                  ({packageData?.packageTotalRatings} ratings)
                </Typography>
                <Rating
                  name="read-only"
                  value={+packageData?.packageRating}
                  precision={0.5}
                  readOnly
                />
              </Box>

              {/* Description */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    fontWeight: "medium",
                  }}
                >
                  {isExpanded
                    ? packageData?.packageDescription
                    : packageData?.packageDescription.length > 280
                    ? `${packageData?.packageDescription.substring(
                        0,
                        150
                      )}...`
                    : packageData?.packageDescription}
                </Typography>
                {packageData?.packageDescription.length > 280 && (
                  <Button
                    onClick={toggleDescription}
                    variant="text"
                    color="primary"
                  >
                    {isExpanded ? (
                      <>
                        Less <FaArrowUp />
                      </>
                    ) : (
                      <>
                        More <FaArrowDown />
                      </>
                    )}
                  </Button>
                )}
              </Box>

              {packageData?.packageInclusions?.map((inclusion, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  color="textPrimary"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1.1rem" },
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 0",
                    borderBottom: "1px solid #e0e0e0", // Adds a subtle divider
                    "&:last-child": {
                      borderBottom: "none", // Removes divider for the last item
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      lineHeight: "24px",
                      textAlign: "center",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                      color: "primary.main",
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box>
                    <strong style={{ color: "#3f51b5" }}>Inclusion:</strong>{" "}
                    {inclusion}
                  </Box>
                </Typography>
              ))}

              {/* Additional Information (Accommodation, Activities, Meals, Transportation) */}
              {["Accommodation", "Activities", "Meals", "Transportation"].map(
                (item) =>
                  packageData[`package${item}`] && (
                    <Typography
                      key={item}
                      variant="body1"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        whiteSpace: "pre-wrap", // Allow line breaks for smaller screens
                      }}
                    >
                      <strong>{item}: </strong>
                      {packageData[`package${item}`]}
                    </Typography>
                  )
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Package;
