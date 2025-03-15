import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-600 dark:bg-transparent shadow-md border border-t-blue-200 border-b-0 border-x-0 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p>© {new Date().getFullYear()} <span className="font-bold">Epic Escape Tours</span>. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
