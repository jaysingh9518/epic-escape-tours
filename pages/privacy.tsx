import { Helmet } from "react-helmet-async";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - TravelEase</title>
        <meta name="description" content="Learn about how TravelEase collects, uses, and protects your personal information." />
      </Helmet>
      
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-4">Last Updated: July 15, 2023</p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <p>
                At TravelEase, we value your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you visit our website or use our services.
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, such as when you create an account, 
                book a travel package, sign up for our newsletter, or contact our customer service. This may include:
              </p>
              <ul>
                <li>Personal identification information (name, email address, phone number, etc.)</li>
                <li>Payment information</li>
                <li>Travel preferences and requirements</li>
                <li>Profile information and travel history</li>
                <li>Communication records between you and TravelEase</li>
              </ul>
              
              <p>
                We also automatically collect certain information when you visit our website, including:
              </p>
              <ul>
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages you view and links you click</li>
                <li>Time spent on our website and login activity</li>
                <li>Location information</li>
              </ul>
              
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul>
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing and fulfilling travel bookings</li>
                <li>Communicating with you about your bookings, account, or inquiries</li>
                <li>Sending promotional materials and newsletters (with your consent)</li>
                <li>Personalizing your experience and recommending relevant travel options</li>
                <li>Analyzing usage patterns to enhance website functionality</li>
                <li>Preventing fraudulent transactions and ensuring secure operations</li>
                <li>Complying with legal obligations</li>
              </ul>
              
              <h2>Information Sharing and Disclosure</h2>
              <p>
                We may share your information with:
              </p>
              <ul>
                <li>Travel service providers (hotels, airlines, tour operators, etc.) to fulfill your bookings</li>
                <li>Payment processors to complete transactions</li>
                <li>Marketing and analytics partners (in an anonymized or aggregated form)</li>
                <li>Legal authorities when required by law</li>
                <li>Professional advisors and business partners as needed for business operations</li>
              </ul>
              
              <p>
                We do not sell your personal information to third parties.
              </p>
              
              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or destruction. These measures include encryption, access controls, regular security assessments, and staff training.
              </p>
              <p>
                While we take significant steps to protect your data, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.
              </p>
              
              <h2>Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>Accessing and updating your personal information</li>
                <li>Requesting deletion of your data</li>
                <li>Opting out of marketing communications</li>
                <li>Restricting certain processing of your data</li>
                <li>Data portability</li>
                <li>Withdrawing consent</li>
              </ul>
              
              <p>
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
              
              <h2>Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience, collect analytical data, and provide personalized content. You can manage your cookie preferences through your browser settings.
              </p>
              
              <h2>Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
              </p>
              
              <h2>International Data Transfers</h2>
              <p>
                We may transfer your information to countries other than your country of residence for processing and storage. We ensure that appropriate safeguards are in place to protect your information during such transfers.
              </p>
              
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <p>
                TravelEase<br />
                123 Travel Plaza, Sector 15<br />
                New Delhi, 110001, India<br />
                Email: privacy@travelease.com<br />
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

export default PrivacyPolicy;
