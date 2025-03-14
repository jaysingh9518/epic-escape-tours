import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-100 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-900">
      <p>© {new Date().getFullYear()} <span className="font-bold">Auth App</span>. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
