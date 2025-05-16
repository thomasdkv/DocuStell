import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-space-dark z-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-24 h-24 mx-auto mb-6"
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-300 dark:text-gray-700"
            />
            <motion.path
              d="M50 5 L50 25 L60 15 Z"
              fill="currentColor"
              className="text-stellar-primary"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: "center" }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="188.5"
              strokeDashoffset="188.5"
              className="text-stellar-secondary"
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Loading StellarPayDocs
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connecting to the Stellar network...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;