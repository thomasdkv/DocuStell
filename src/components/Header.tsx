import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Star, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-space-dark/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Star className="w-8 h-8 text-stellar-primary" strokeWidth={1.5} />
            </motion.div>
            <span className="text-xl font-semibold text-space-dark dark:text-white">
              DocuStell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-stellar-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/marketplace" className="text-gray-700 hover:text-stellar-primary dark:text-gray-300 dark:hover:text-white transition-colors">
              Marketplace
            </Link>
            {user && (
              <>
                <Link to="/collection" className="text-gray-700 hover:text-stellar-primary dark:text-gray-300 dark:hover:text-white transition-colors">
                  My Collection
                </Link>
                <Link to="/upload" className="text-gray-700 hover:text-stellar-primary dark:text-gray-300 dark:hover:text-white transition-colors">
                  Upload
                </Link>
              </>
            )}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-stellar-primary dark:text-gray-300 dark:hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                  <span>{user.username}</span>
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right dark:bg-gray-800">
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden py-4 space-y-4"
          >
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-stellar-primary dark:text-gray-300 dark:hover:text-white"
            >
              Home
            </Link>
            <Link 
              to="/marketplace" 
              className="block py-2 text-gray-700 hover:text-stellar-primary dark:text-gray-300 dark:hover:text-white"
            >
              Marketplace
            </Link>
            {user && (
              <>
                <Link 
                  to="/collection" 
                  className="block py-2 text-gray-700 hover:text-stellar-primary dark:text-gray-300 dark:hover:text-white"
                >
                  My Collection
                </Link>
                <Link 
                  to="/upload" 
                  className="block py-2 text-gray-700 hover:text-stellar-primary dark:text-gray-300 dark:hover:text-white"
                >
                  Upload
                </Link>
              </>
            )}
            {user ? (
              <>
                <div className="py-2 text-gray-700 dark:text-gray-300">
                  Signed in as {user.username}
                </div>
                <button 
                  onClick={logout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="block py-2 text-stellar-primary hover:text-stellar-primary/80"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;