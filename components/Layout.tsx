import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryDialog from "@/components/EnquiryDialog";
import ScrollToTop from "@/components/ScrollToTop";

export default function Layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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