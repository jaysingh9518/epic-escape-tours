import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryDialog from "@/components/EnquiryDialog";
import ScrollToTop from "@/components/ScrollToTop";

const Layout = ({ children }) => {
  return (
    <div>
      <ScrollToTop />
      <EnquiryDialog />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
