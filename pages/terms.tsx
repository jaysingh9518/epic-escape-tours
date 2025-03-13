import { Container, Typography, Box, Divider, Paper } from "@mui/material";
import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";

const Section = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
      {title}
    </Typography>
    {children}
    <Divider sx={{ my: 2 }} />
  </Box>
);

const Terms = () => {
  return (
    <Container maxWidth="lg" sx={{ p: 4 }}>
      <BreadcrumbWrapper
        title="Terms of Service"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Terms" },
        ]}
      />
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "#f9f9f9", my: 4 }}>
        <Section title="1. Acceptance of Terms">
          <Typography>
            By accessing or using our website, www.heavenofholiday.com, you agree to comply with these Terms of Service. If you do not agree, please do not use the Site.
          </Typography>
        </Section>

        <Section title="2. Services Offered">
          <Typography>
            Heaven of Holiday offers travel booking services, including hotel reservations, tour packages, and travel insurance.
          </Typography>
        </Section>

        <Section title="3. Booking and Payment">
          <Typography>
            <strong>Booking Process:</strong> Provide accurate details during booking.
          </Typography>
          <Typography>
            <strong>Payment Terms:</strong> Payment must be made via the provided methods. Accepted options include credit cards and electronic transfers.
          </Typography>
          <Typography>
            <strong>Currency and Fees:</strong> All transactions are processed in the currency specified on our Site. Any additional fees are your responsibility.
          </Typography>
        </Section>

        <Section title="4. Cancellations and Refunds">
          <Typography>
            <strong>Cancellation Policy:</strong> Follow the policy provided during booking. Failure to comply may result in loss of payment.
          </Typography>
          <Typography>
            <strong>Refunds:</strong> Refunds will be processed as per the Service's terms and refunded to the original payment method.
          </Typography>
        </Section>

        <Section title="5. Contact Information">
          <Typography>
            For questions, please contact:
            <br />
            <strong>Heaven of Holiday</strong>
            <br />
            Email: info@heavenofholiday.com
            <br />
            Phone: +91-7452849199
            <br />
            Address: HIG-160, 100 Feet Rd, Nehru Enclave Yojna, Agra, Uttar Pradesh 282001
          </Typography>
        </Section>
      </Paper>
    </Container>
  );
};

export default Terms;