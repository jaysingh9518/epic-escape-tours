import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { URLPORT } from "@/services/URL";
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BookingConfirmationPDF from "./BookingConfirmationPDF";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";

const BookingConfirmation = () => {
  const router = useRouter();
  const params = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchOrderId, setSearchOrderId] = useState(params?.orderId || "");

  const fetchBookingDetails = async (orderId) => {
    if (!orderId) {
      setBookingDetails(null);
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching booking details with orderId:", orderId);
      const response = await fetch(`${URLPORT}/booking/get-booking/${orderId}`);

      if (!response.ok) {
        console.error("Failed to fetch booking details", response.statusText);
        setBookingDetails(null);
      } else {
        const data = await response.json();
        if (data.success) {
          setBookingDetails(data.booking);
        } else {
          console.error("Booking fetch unsuccessful:", data.message);
          setBookingDetails(null);
        }
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setBookingDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.orderId) {
      setSearchOrderId(params?.orderId);
      fetchBookingDetails(params?.orderId);
    } else {
      setLoading(false);
    }
  }, [params?.orderId]);

  const handleSearch = () => {
    if (!searchOrderId.trim()) {
      alert("Please enter a valid order ID");
      return;
    }
    setLoading(true);
    fetchBookingDetails(searchOrderId.trim());
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    ).toString().padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <BreadcrumbWrapper
        title="Booking Confirmation"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Packages", link: "/packages" },
          {
            label: bookingDetails?.packageDetails?.packageName,
            link: `/package/${bookingDetails?.packageDetails?._id}`,
          },
          { label: "Booking Confirmation - " + bookingDetails?.orderId },
        ]}
      />

      {/* Search Bar for Order ID */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <TextField
          label="Search Order ID"
          variant="outlined"
          value={searchOrderId}
          onChange={(e) => setSearchOrderId(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ color: "white" }}
        >
          Search
        </Button>
      </Box>

      {loading ? (
        <div>Loading...</div>
      ) : !bookingDetails ? (
        <div>No booking details available.</div>
      ) : (
        <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your booking confirmation has been sent to your email. You can also download the details by clicking the &quot;Download PDF&quot; button below.
        </Typography>

        {/* Centered Image */}
        <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
          <MuiLink href={`/package/${bookingDetails?.packageDetails?._id}`}>
            <img
              src={bookingDetails?.packageDetails?.packageImages[0]}
              alt="Package"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: 4,
              }}
            />
          </MuiLink>
        </Box>

        {/* Package Details Table */}
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Package Details
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Package Name</TableCell>
                <TableCell>
                  <MuiLink
                    href={`/package/${bookingDetails?.packageDetails?._id}`}
                    sx={{
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {bookingDetails?.packageDetails?.packageName}
                  </MuiLink>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nights/Days</TableCell>
                <TableCell>
                  {bookingDetails?.packageDetails?.packageNights || 0} nights /{" "}
                  {bookingDetails?.packageDetails?.packageDays || 0} days
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Destination</TableCell>
                <TableCell>
                  {bookingDetails?.packageDetails?.packageDestination}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Activities</TableCell>
                <TableCell>
                  {bookingDetails?.packageDetails?.packageActivities}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Booking Details Table */}
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Booking Details
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>{bookingDetails.orderId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{bookingDetails.fullName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{bookingDetails.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>{bookingDetails.mobile}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Travel Date</TableCell>
                <TableCell>{formatDate(bookingDetails.date)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Booking Date</TableCell>
                <TableCell>{formatDate(bookingDetails.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Number of Persons</TableCell>
                <TableCell>{bookingDetails.persons}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Price</TableCell>
                <TableCell>₹{bookingDetails.totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Buttons */}
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
          gap={2}
          flexWrap="wrap"
        >
          <Button variant="contained" color="primary" sx={{ color: "white" }} onClick={() => router.push("/")}>
            Go to Home
          </Button>
          {bookingDetails && (
            <PDFDownloadLink
              document={<BookingConfirmationPDF bookingDetails={bookingDetails} />}
              fileName="booking_confirmation.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <Button variant="outlined" color="primary">Preparing document...</Button>
                ) : (
                  <Button variant="outlined" color="primary">Download PDF</Button>
                )
              }
            </PDFDownloadLink>
          )}
        </Box>
      </Box>
      )}
    </Container>
  );
};

export default BookingConfirmation;
