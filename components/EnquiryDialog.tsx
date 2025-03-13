import { useEffect, useState } from 'react';
import { URLPORT } from "@/services/URL";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography, Fab, IconButton } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import axios from 'axios';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import CloseIcon from "@mui/icons-material/Close";

const EnquiryDialog = () => {
  const [open, setOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const lastShown = localStorage.getItem('lastEnquiryShown');
    const currentTime = new Date().getTime();

    if (lastShown) {
      const timeDifference = currentTime - lastShown;
      if (timeDifference > 7 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem('lastEnquiryShown');
      }
    }

    const timer = setTimeout(() => {
      if (!lastShown || currentTime - lastShown > 7 * 24 * 60 * 60 * 1000) {
        setOpen(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setManualOpen(false);
    localStorage.setItem('lastEnquiryShown', new Date().getTime());
  };

  const handleManualOpen = () => {
    setManualOpen(true);
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
        setSubmitted(true);
        setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });

        setTimeout(() => {
          handleClose();
          setSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <>
      {/* Sidebar Button */}
      <Fab
        onClick={handleManualOpen}
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 360,
          right: '-10px',
          zIndex: 1000,
          transform: 'translateY(50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px',
          borderRadius: 2,
          height: 180,
          width: 50,
          boxShadow: 3,
          transition: 'right 0.3s ease-in-out',
          '&:hover': { right: '5px' },
        }}
      >
        <NoteAltIcon sx={{ fontSize: '32px', color: 'white' }} />
        <Typography
          sx={{
            fontSize: '14px',
            color: 'white',
            writingMode: 'vertical-rl',
            textAlign: 'center',
            marginTop: 1,
            fontWeight: 'bold',
          }}
        >
          Enquire Now
        </Typography>
      </Fab>

      {/* Enquiry Form Dialog */}
      <Dialog
        open={open || manualOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        sx={{ '& .MuiPaper-root': { borderRadius: 3 } }}
      >
        <DialogTitle align="center">
          Enquiry Form
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {submitted ? (
            <Box textAlign="center">
              <Typography variant="h6" color="primary" gutterBottom>
                Your message has been sent successfully!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Follow us on:
              </Typography>
              <Box display="flex" justifyContent="center" mt={2} gap={2}> 
                <a href="https://www.facebook.com/heavenofholiday" target="_blank" rel="noopener noreferrer">
                    <Facebook sx={{ color: '#1877F2', fontSize: 40, cursor: 'pointer' }} />
                </a>
                <a href="https://twitter.com/heavenofholiday" target="_blank" rel="noopener noreferrer">
                    <Twitter sx={{ color: '#1DA1F2', fontSize: 40, cursor: 'pointer' }} />
                </a>
                <a href="https://instagram.com/heavenofholiday" target="_blank" rel="noopener noreferrer">
                    <Instagram sx={{ color: '#E4405F', fontSize: 40, cursor: 'pointer' }} />
                </a>
                </Box>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  margin="normal"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  sx={{ flex: { xs: '100%', sm: '48%' }, mb: 2 }}
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
                  error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email !== ''}
                  helperText={
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.email !== ''
                      ? 'Enter a valid email address'
                      : ''
                  }
                  sx={{ flex: { xs: '100%', sm: '48%' }, mb: 2 }}
                />
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                  error={!/^\d{10}$/.test(formData.mobile) && formData.mobile !== ''}
                  helperText={
                    !/^\d{10}$/.test(formData.mobile) && formData.mobile !== ''
                      ? 'Enter a valid 10-digit mobile number'
                      : ''
                  }
                  sx={{ flex: { xs: '100%', sm: '48%' }, mb: 2 }}
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
                  sx={{ flex: { xs: '100%', sm: '48%' }, mb: 2 }}
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

              {/* Centered Submit Button */}
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    color: 'white',
                    textTransform: 'uppercase',
                    padding: '12px 24px',
                    borderRadius: 2,
                    fontWeight: 600,
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnquiryDialog;
