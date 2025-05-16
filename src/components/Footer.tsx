import React from 'react';
import { Star, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-space-dark py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-stellar-primary" />
              <span className="text-xl font-semibold text-space-dark dark:text-white">
                StellarPayDocs
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              A privacy-focused, pay-per-use document access dApp built on Stellar blockchain, 
              offering seamless authentication through passkeys and ephemeral document access.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-stellar-primary dark:hover:text-stellar-secondary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-stellar-primary dark:hover:text-stellar-secondary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-stellar-primary dark:hover:text-stellar-secondary transition-colors">
                  Technical Papers
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-stellar-primary dark:hover:text-stellar-secondary transition-colors">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-stellar-primary dark:hover:text-stellar-secondary transition-colors">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} StellarPayDocs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;