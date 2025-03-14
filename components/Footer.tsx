import React from 'react';

const Footer = () => (
  <footer className="bg-gray-100 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
      <p>© {new Date().getFullYear()} Auth App. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
