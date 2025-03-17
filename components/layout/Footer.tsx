import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  MapPin, 
  Phone, 
  Mail
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="text-2xl font-bold mb-4 inline-block cursor-pointer">
                <span className="text-primary-500">Travel</span>
                <span className="text-secondary-500">Ease</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              Crafting unforgettable travel experiences for adventurers around the world since 2010.
            </p>
            <div className="flex items-center space-x-4">
              <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Youtube className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</div>
                </Link>
              </li>
              <li>
                <Link href="/packages">
                  <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Packages</div>
                </Link>
              </li>
              <li>
                <Link href="/blogs">
                  <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Blogs</div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">FAQs</div>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</div>
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions">
                  <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms & Conditions</div>
                </Link>
              </li>
              <li>
                <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Cancellation Policy</div>
              </li>
              <li>
                <Link href="/contact">
                  <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Customer Support</div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-2 text-gray-400" />
                <span className="text-gray-400">123 Travel Plaza, Sector 15, New Delhi, 110001, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">info@travelease.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} TravelEase. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Image 
                src="https://cdn-icons-png.flaticon.com/128/349/349221.png" 
                alt="Visa"
                width={32}
                height={32}
              />
              <Image 
                src="https://cdn-icons-png.flaticon.com/128/349/349228.png" 
                alt="MasterCard" 
                width={32}
                height={32}
              />
              <Image 
                src="https://cdn-icons-png.flaticon.com/128/349/349230.png" 
                alt="American Express"
                width={32}
                height={32}
              />
              <Image 
                src="https://cdn-icons-png.flaticon.com/128/196/196565.png" 
                alt="PayPal" 
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
