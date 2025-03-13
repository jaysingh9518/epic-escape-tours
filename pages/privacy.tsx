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

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ p: 4 }}>
      <BreadcrumbWrapper
        title="Privacy Policy"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Privacy Policy" },
        ]}
      />
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "#f9f9f9", my: 4 }}>
        <Section title="1. Introduction">
          <Typography>
            At Heaven of Holiday, we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information.
          </Typography>
        </Section>

        <Section title="2. Information We Collect">
          <Typography>
            We may collect personal information such as your name, email, contact details, and booking preferences when you use our services.
          </Typography>
        </Section>

        <Section title="3. How We Use Your Information">
          <Typography>
            <strong>To Improve Services:</strong> We use your data to enhance user experience and provide tailored travel solutions.
          </Typography>
          <Typography>
            <strong>For Communication:</strong> We may contact you regarding bookings, promotions, or important updates.
          </Typography>
          <Typography>
            <strong>For Security:</strong> Your data helps us ensure safe transactions and prevent fraudulent activities.
          </Typography>
        </Section>

        <Section title="4. Data Sharing and Disclosure">
          <Typography>
            We do not sell or share your personal data with third parties except for essential service providers or legal obligations.
          </Typography>
        </Section>

        <Section title="5. Your Rights">
          <Typography>
            You have the right to access, correct, or delete your personal data. Contact us for assistance with your data privacy rights.
          </Typography>
        </Section>

        <Section title="6. Contact Information">
          <Typography>
            For privacy concerns, please contact:
            <br />
            <strong>Heaven of Holiday</strong>
            <br />
            Email: privacy@heavenofholiday.com
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

export default PrivacyPolicy;
