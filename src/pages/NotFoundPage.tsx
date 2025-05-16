import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block"
          >
            <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#6320EE" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 15" />
              <circle cx="50" cy="50" r="20" fill="#1282A2" fillOpacity="0.3" />
              <path d="M50 15L55 30H45L50 15Z" fill="#FE5D9F" />
              <path d="M50 85L45 70H55L50 85Z" fill="#FE5D9F" />
              <path d="M15 50L30 45V55L15 50Z" fill="#FE5D9F" />
              <path d="M85 50L70 55V45L85 50Z" fill="#FE5D9F" />
            </svg>
          </motion.div>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have drifted off into space. 
          It might have been moved, deleted, or never existed in the first place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90 w-full sm:w-auto"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </button>
          <button
            onClick={() => navigate('/documents')}
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 w-full sm:w-auto"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Documents
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;