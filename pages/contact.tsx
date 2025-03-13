import { useState } from "react";
import { URLPORT } from "@/services/URL";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { 
  Phone,
  Place, 
  // AccessTime
} from "@mui/icons-material";
import axios from "axios";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";
import CallToAction from "@/components/CallToAction";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URLPORT}/contact/create`, formData);
      if (response.status === 201) {
        setSnackbarMessage("Your message has been sent successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("There was an error sending the message:", error);
      setSnackbarMessage(
        "There was an error sending your message. Please try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box className="main" sx={{ width: "100%" }}>
      <BreadcrumbWrapper
        title="Contact Us"
        breadcrumbs={[{ label: "Home", link: "/" }, { label: "Contact" }]}
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
            py: 4,
          }}
        >
          {/* Contact Form */}
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              We&apos;d love to hear from you!
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Please fill out the form below and we&apos;ll get back to you as
              soon as possible.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  margin="normal"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  sx={{ flex: { xs: "100%", sm: "48%" }, mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Your Email"
                  variant="outlined"
                  margin="normal"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                    formData.email !== ""
                  }
                  helperText={
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                    formData.email !== ""
                      ? "Enter a valid email address"
                      : ""
                  }
                  sx={{ flex: { xs: "100%", sm: "48%" }, mb: 2 }}
                />
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <TextField
                  fullWidth
                  label="Your Mobile Number"
                  variant="outlined"
                  margin="normal"
                  required
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  error={
                    !/^\d{10}$/.test(formData.mobile) && formData.mobile !== ""
                  }
                  helperText={
                    !/^\d{10}$/.test(formData.mobile) && formData.mobile !== ""
                      ? "Enter a valid 10-digit mobile number"
                      : ""
                  }
                  sx={{ flex: { xs: "100%", sm: "48%" }, mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  variant="outlined"
                  margin="normal"
                  required
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  sx={{ flex: { xs: "100%", sm: "48%" }, mb: 2 }}
                />
              </Box>

              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                required
                multiline
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  color: "white",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  borderRadius: 2,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
              >
                Send Message
              </Button>
            </form>
          </Box>

          {/* Google Map */}
          <Box sx={{ flex: 1, textAlign: "center", mt: { xs: 5, md: 0 } }}>
            <Typography
              variant="h4"
              align="center"
              sx={{ mb: 3, fontWeight: 600 }}
            >
              Find Us Here
            </Typography>

            <Box
              sx={{
                width: "100%",
                padding: "8px",
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: "12px",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.3024063972903!2d78.0422746749032!3d27.146773949993694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397471a8e17cd73b%3A0xfd7f466a2a0dbd98!2sHeaven%20of%20Holiday!5e0!3m2!1sen!2sin!4v1729612022239!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{
                  border: "none",
                  borderRadius: "8px",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Box>
        </Box>

        {/* Contact Information */}
        <Box className="contact-box_wrapper" style={{ padding: "40px 0" }}>
          <Container maxWidth="lg">
            <Box
              className="outer-wrap"
              sx={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Contact Information
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: 3,
                }}
              >
                {/* Address Box */}
                <Box
                  sx={{
                    flex: "1 1 30%",
                    padding: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: "center",
                  }}
                >
                  <Place sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Address
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    HIG-160, 100 Feet Rd, Nehru Enclave Yojna, Near Sharwood
                    Public School, Indrapuram Crossing, Agra, Uttar Pradesh
                    282001
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 2,
                        display: "inline-flex",
                        alignItems: "center",
                        textTransform: "none",
                        borderRadius: 2,
                        padding: "8px 16px",
                        color: "#fff",
                      }}
                      href="https://www.google.com/maps/place/Heaven+of+Holiday/@27.1467692,78.0448496,2951m/data=!3m1!1e3!4m6!3m5!1s0x397471a8e17cd73b:0xfd7f466a2a0dbd98!8m2!3d27.1467692!4d78.0448496!16s%2Fg%2F11v4pq8mdm!5m1!1e2?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </Button>
                  </Typography>
                </Box>

                {/* Contact Box */}
                <Box
                  sx={{
                    flex: "1 1 30%",
                    padding: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: "center",
                  }}
                >
                  <Phone sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Contact
                  </Typography>

                  {/* Contact Information */}

                  <Typography variant="body1">
                    <strong>Phone Number:</strong>
                  </Typography>
                  <MuiLink
                    href="tel:+917452849199"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>+91 7452849199</strong>
                    </Typography>
                  </MuiLink>
                  <Typography variant="body1">
                    <strong>Email:</strong>
                  </Typography>
                  <MuiLink
                    href="mailto:info@heavenofholiday.com"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>info@heavenofholiday.com</strong>
                    </Typography>
                  </MuiLink>
                </Box>

                {/* Office Hour Box */}
                {/* <Box
                  sx={{
                    flex: "1 1 30%",
                    padding: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: "center",
                  }}
                >
                  <AccessTime
                    sx={{ fontSize: 40, color: "primary.main", mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Office Hour
                  </Typography>

                  
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Monday - Saturday:</strong>
                    <br /> 9:30 AM - 5:30 PM
                  </Typography>
                  <Typography variant="body1">
                    <strong>Sunday:</strong>
                    <br /> Closed
                  </Typography>
                </Box> */}
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
      <CallToAction />
    </Box>
  );
};

export default Contact;
