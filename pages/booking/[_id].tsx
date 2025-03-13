import { useEffect, useState, useCallback } from "react"; 
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter, useParams, usePathname } from "next/navigation";
import { URLPORT } from "@/services/URL";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";

const Booking = () => {
  const params = useParams();
  const router = useRouter();

  const [packageData, setPackageData] = useState({
    packageName: "",
    packageDescription: "",
    packageDestination: "",
    packageDays: 1,
    packageNights: 1,
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
  });
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    totalPrice: 0,
    packageDetails: null,
    persons: 1,
    date: "",
    paymentMethod: "payLater",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const currentPath = usePathname();

  // Fetch package data
  const getPackageData = useCallback(async () => {
    if (!params?._id) return;
    try {
      setLoading(true);
      const res = await fetch(`${URLPORT}/package/get-package-data/${params?._id}`);
      const data = await res.json();
      if (data?.success) {
        setPackageData(data?.packageData);
      } else {
        setError(data?.message || "Something went wrong!"); // Set error message
      }
    } catch (error) {
      setError("Failed to fetch package data."); // Set error message on catch
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [params?._id]); // Add packageId as a dependency

  useEffect(() => {
    getPackageData(); // Call the function to fetch package data
  }, [getPackageData]); // Include getPackageData in the dependency array

  // Handle booking package
  const handleBookPackage = async () => {
    // Check if the packageId is present
    if (!params?._id) return;
    // Check if the booking date is in the past
    if (new Date(bookingData.date) < new Date(currentDate)) {
      setError("Booking date cannot be in the past.");
      return; // Stop further execution if the date is invalid
    }
    // Check if all required fields are filled in
    if (
      !bookingData.fullName ||
      !bookingData.email ||
      !bookingData.mobile ||
      !bookingData.address ||
      !bookingData.packageDetails ||
      bookingData.totalPrice <= 0 ||
      bookingData.persons <= 0 ||
      !bookingData.date
    ) {
      setError("All fields are required!"); // Set error message
      return;
    }
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Mobile validation (checking if it’s a 10-digit number)
    if (!/^\d{10}$/.test(bookingData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    
    try {
      setLoading(true);
      const res = await fetch(`${URLPORT}/booking/book-package/${params?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      console.log("Server Response:", data);
      if (data?.success) {
        alert(data?.message);
        
        // Navigate to BookingConfirmation page with booking details
        router.push(`/booking/confirmation/${data?.orderId}`, {
          state: { orderId: data?.orderId },
        });
      } else {
        setError(data?.message); // Set error message
      }
    } catch (error) {
      setError("Booking failed."); // Set error message on catch
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch current date and package data
  useEffect(() => {
    if (params?._id) {
      getPackageData(); // Fetch package data when packageId changes
    }

    const date = new Date();
    const nextDate = new Date(date.setDate(date.getDate() + 1)).toISOString().substring(0, 10);
    setCurrentDate(nextDate); // Update currentDate

    // Set booking date to the next date
    setBookingData((prev) => ({
      ...prev,
      date: nextDate, // Set the date in bookingData to nextDate
    }));
  }, [params?._id, getPackageData]); // Include getPackageData in the dependencies

  // Update booking data when package data changes
  useEffect(() => {
    if (packageData && params?._id) {
      setBookingData((prev) => ({
        ...prev,
        packageDetails: packageData,
        totalPrice: packageData?.packageDiscountPrice
          ? packageData?.packageDiscountPrice * prev.persons
          : packageData?.packagePrice * prev.persons,
      }));
    }
  }, [packageData, params]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumb with dynamic package name */}
      <BreadcrumbWrapper
        title="Book Package"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Packages", link: "/packages" },
          { label: packageData?.packageName || "Loading...", link: `/package/${packageData?._id}` },
          { label: "Book Package", link: currentPath },
        ]}
      />
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Book Package
        </Typography>

        {/* Display error message if it exists */}
        {error && (
          <Typography
            variant="body1"
            color="error"
            align="center"
            sx={{ mb: 2 }}
          >
            {error}
          </Typography>
        )}

        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          flexWrap="wrap"
          gap={3}
        >
          {/* User Info */}
          <Box flex={1} minWidth={{ xs: '100%', sm: '45%' }} sx={{ borderRight: { sm: '1px solid #ccc' }, pr: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
            <Typography variant="h6" gutterBottom>
              User Info
            </Typography>
            <Box>
              <Box mb={2} mt={2}>
                <TextField 
                  label="Full Name" 
                  sx={{ mb: 2 }} 
                  fullWidth 
                  onChange={(e) => setBookingData({ ...bookingData, fullName: e.target.value })} 
                />
                <TextField 
                  label="Email" 
                  sx={{ mb: 2 }} 
                  fullWidth 
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })} 
                  error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email) && bookingData.email !== ""}
                  helperText={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email) && bookingData.email !== "" ? "Enter a valid email address" : ""}
                />
                <TextField 
                  label="Mobile" 
                  sx={{ mb: 2 }} 
                  fullWidth 
                  onChange={(e) => setBookingData({ ...bookingData, mobile: e.target.value })} 
                  error={!/^\d{10}$/.test(bookingData.mobile) && bookingData.mobile !== ""}
                  helperText={!/^\d{10}$/.test(bookingData.mobile) && bookingData.mobile !== "" ? "Enter a valid 10-digit mobile number" : ""}
                />
                <TextField 
                  label="Address" 
                  sx={{ mb: 2 }} 
                  fullWidth 
                  onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })} 
                />
              </Box>
            </Box>
          </Box>

          {/* Package Info */}
          <Box flex={1} minWidth={{ xs: '100%', sm: '52%' }}>
            <Typography variant="h6" gutterBottom>
              Package Info
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap" justifyContent={"center"} mb={2}>
              <img
                src={packageData.packageImages[0]}
                alt="Package"
                style={{
                  borderRadius: "8px",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                  width: "100%",
                  maxWidth: "250px",
                  objectFit: "cover",
                }}
              />
              <Box flexGrow={1}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {packageData.packageName}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                  <Typography variant="body1" color="green" fontWeight="bold">
                    {packageData.packageDestination}
                  </Typography>
                </Box>

                {(+packageData.packageDays > 0 || +packageData.packageNights > 0) && (
                  <Box display="flex" alignItems="center">
                    <FaClock style={{ marginRight: "8px" }} />
                    <Typography variant="body1">
                      {+packageData.packageDays > 0 && `${packageData.packageDays} Day${packageData.packageDays > 1 ? "s" : ""}`}
                      {+packageData.packageDays > 0 && +packageData.packageNights > 0 && " - "}
                      {+packageData.packageNights > 0 && `${packageData.packageNights} Night${packageData.packageNights > 1 ? "s" : ""}`}
                    </Typography>
                  </Box>
                )}

                <FormControl sx={{ mt: 2 }}>
                  <TextField
                    type="date"
                    id="date"
                    label="Select Date"
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    value={bookingData.date || currentDate}
                    sx={{ mb: 2 }}
                  />
                </FormControl>

                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="h6" gutterBottom sx={{ marginRight: 2 }}>
                    Price:
                  </Typography>
                  <Typography
                    variant="body1"
                    color={packageData.packageOffer ? "error" : "green"}
                    fontWeight="bold"
                  >
                    {packageData.packageOffer ? (
                      <>
                        <span style={{ textDecoration: "line-through", marginRight: "8px" }}>
                          ₹{packageData.packagePrice}
                        </span>
                        <span>₹{packageData.packageDiscountPrice}</span>
                        <span style={{ marginLeft: "8px", color: "green" }}>
                          {Math.floor(((+packageData.packagePrice - +packageData.packageDiscountPrice) / +packageData.packagePrice) * 100)}% Off
                        </span>
                      </>
                    ) : (
                      `₹${packageData.packagePrice}`
                    )}
                  </Typography>
                </Box>

                {/* Persons Input */}
                <Box display="flex" alignItems="center" my={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (bookingData.persons > 1) {
                        setBookingData((prev) => ({
                          ...prev,
                          persons: prev.persons - 1,
                          totalPrice: packageData.packageDiscountPrice
                            ? packageData.packageDiscountPrice * (prev.persons - 1)
                            : packageData.packagePrice * (prev.persons - 1),
                        }));
                      }
                    }}
                    sx={{
                      minWidth: "40px",
                      borderRadius: "4px",
                      padding: "8px",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    -
                  </Button>
                  <TextField
                    type="text"
                    value={bookingData.persons}
                    disabled
                    sx={{
                      mx: 2,
                      width: 50,
                      textAlign: "center",
                      "& .MuiInputBase-input": {
                        textAlign: "center",
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "4px",
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (bookingData.persons < 10) {
                        setBookingData((prev) => ({
                          ...prev,
                          persons: prev.persons + 1,
                          totalPrice: packageData.packageDiscountPrice
                            ? packageData.packageDiscountPrice * (prev.persons + 1)
                            : packageData.packagePrice * (prev.persons + 1),
                        }));
                      }
                    }}
                    sx={{
                      minWidth: "40px",
                      borderRadius: "4px",
                      padding: "8px",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    +
                  </Button>
                </Box>

                <Box display="flex" alignItems="center" my={2}>
                  <Typography variant="h6" fontWeight="bold">
                    Total Price:{" "}
                    <span style={{ color: "green" }}>
                      ₹{bookingData.totalPrice}
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box my={2}>
              <FormControl>
                <Typography variant="h6">Payment Method</Typography>
                <RadioGroup
                  row
                  value={bookingData.paymentMethod}
                  onChange={(e) => setBookingData({ ...bookingData, paymentMethod: e.target.value })}
                >
                  <FormControlLabel value="payLater" control={<Radio />} label="Pay Later (₹0)" />
                  <FormControlLabel value="online" control={<Radio />} label="Pay Now" />
                </RadioGroup>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBookPackage}
                disabled={loading}
                sx={{ mt: 2, color: "white" }}
              >
                {loading ? "Processing..." : "Book Now"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>

  );
};
export default Booking;
