import { Helmet } from "react-helmet-async";
import { Separator } from "@/components/ui/separator";

const TermsConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - TravelEase</title>
        <meta name="description" content="Read the terms and conditions governing the use of TravelEase services." />
      </Helmet>
      
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-gray-500 mb-4">Last Updated: July 15, 2023</p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <p>
                These Terms and Conditions ("Terms") govern your use of the TravelEase website and services. 
                By accessing or using our website or services, you agree to be bound by these Terms. If you do not 
                agree to these Terms, please do not use our services.
              </p>
              
              <h2>1. Use of Services</h2>
              <p>
                1.1. <strong>Eligibility:</strong> You must be at least 18 years old to use our services. By using our services, you represent and warrant that you are at least 18 years of age.
              </p>
              <p>
                1.2. <strong>Account Creation:</strong> To access certain features of our services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p>
                1.3. <strong>Accurate Information:</strong> You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              
              <h2>2. Booking and Payment</h2>
              <p>
                2.1. <strong>Booking Confirmation:</strong> Your booking is confirmed only after we have received full payment and have sent you a written confirmation. Prices are subject to change until your booking is confirmed.
              </p>
              <p>
                2.2. <strong>Payment Methods:</strong> We accept various payment methods as indicated on our website. All payments must be made in the currency specified in the booking.
              </p>
              <p>
                2.3. <strong>Price and Availability:</strong> All prices are subject to availability and can change without notice due to currency fluctuations, fuel price increases, or tax changes.
              </p>
              
              <h2>3. Cancellation and Refund Policy</h2>
              <p>
                3.1. <strong>Cancellation by You:</strong> Cancellation terms vary depending on the package and are specified at the time of booking. In general:
              </p>
              <ul>
                <li>Free cancellation up to 30 days before departure</li>
                <li>50% refund for cancellations 15-29 days before departure</li>
                <li>25% refund for cancellations 7-14 days before departure</li>
                <li>No refund for cancellations less than 7 days before departure</li>
              </ul>
              <p>
                3.2. <strong>Cancellation by Us:</strong> We reserve the right to cancel any booking due to circumstances beyond our control, such as natural disasters, political instability, or insufficient participants. In such cases, you will be offered an alternative trip or a full refund.
              </p>
              <p>
                3.3. <strong>Refund Processing:</strong> Refunds will be processed within 30 business days of approval and will be made to the original payment method.
              </p>
              
              <h2>4. Travel Documents and Requirements</h2>
              <p>
                4.1. <strong>Responsibility:</strong> You are responsible for ensuring that you have all necessary travel documents, including valid passports, visas, and health certificates. We are not liable for any losses arising from your failure to comply with these requirements.
              </p>
              <p>
                4.2. <strong>Travel Insurance:</strong> We strongly recommend that all travelers purchase comprehensive travel insurance. Some packages may require proof of travel insurance.
              </p>
              
              <h2>5. Liability and Limitations</h2>
              <p>
                5.1. <strong>Service Providers:</strong> We act as an intermediary between you and service providers (hotels, airlines, tour operators, etc.). While we select these providers with care, we are not responsible for their actions, omissions, or negligence.
              </p>
              <p>
                5.2. <strong>Force Majeure:</strong> We are not liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, acts of terrorism, civil unrest, and governmental actions.
              </p>
              <p>
                5.3. <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, our liability for any claim arising from the use of our services is limited to the amount paid by you for the specific booking giving rise to the claim.
              </p>
              
              <h2>6. Content and Intellectual Property</h2>
              <p>
                6.1. <strong>Ownership:</strong> All content on our website, including text, graphics, logos, images, and software, is the property of TravelEase or its content suppliers and is protected by international copyright laws.
              </p>
              <p>
                6.2. <strong>Restricted Use:</strong> You may not reproduce, distribute, modify, display, or create derivative works from any content without our express written permission.
              </p>
              
              <h2>7. User Conduct</h2>
              <p>
                7.1. <strong>Prohibited Activities:</strong> You agree not to:
              </p>
              <ul>
                <li>Use our services for any unlawful purpose</li>
                <li>Impersonate any person or entity</li>
                <li>Upload or transmit viruses or malicious code</li>
                <li>Interfere with the operation of our website</li>
                <li>Collect user information without consent</li>
              </ul>
              
              <h2>8. Changes to Terms</h2>
              <p>
                8.1. <strong>Modifications:</strong> We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes indicates your acceptance of the modified Terms.
              </p>
              
              <h2>9. Governing Law</h2>
              <p>
                9.1. <strong>Jurisdiction:</strong> These Terms are governed by the laws of India, without regard to its conflict of law principles. Any dispute arising from these Terms will be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>
              
              <h2>10. Contact Information</h2>
              <p>
                10.1. <strong>Questions:</strong> If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                TravelEase<br />
                123 Travel Plaza, Sector 15<br />
                New Delhi, 110001, India<br />
                Email: legal@travelease.com<br />
                Phone: +91 98765 43210
              </p>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="text-center text-gray-600">
            <p>© {new Date().getFullYear()} TravelEase. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
