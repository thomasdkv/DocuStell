import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Shield, Key, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-stellar-primary via-stellar-secondary to-stellar-accent">
              Secure Document Access
            </span>{' '}
            on the Stellar Blockchain
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Pay-per-use document access with privacy-focused design. No public links, no logs—just seamless, secure access powered by Stellar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary"
            >
              Browse Documents
            </Link>
            {!user && (
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-stellar-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Sign In with Passkey
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why Choose DocuStell?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              Privacy-focused access control with blockchain-powered security and seamless user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-stellar-primary/10 text-stellar-primary mb-4">
                <Key className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Passkey Authentication</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Sign in with your face or fingerprint. No passwords to remember or accounts to create.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-stellar-secondary/10 text-stellar-secondary mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Privacy Focused</h3>
              <p className="text-gray-500 dark:text-gray-400">
                No public links or logs. Downloads expire after use, leaving no trace of your activity.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-stellar-accent/10 text-stellar-accent mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Pay-Per-Document</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Only pay for what you access. No subscriptions or recurring fees—simple, transparent pricing.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-success/10 text-success mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-500 dark:text-gray-400">
                IPFS-powered document delivery with blockchain-verified access for instant secure retrievals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              Secure document access in three simple steps.
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stellar-primary text-white text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  1
                </div>
                <div className="pt-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sign In with Passkey</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Use your face or fingerprint to authenticate securely without passwords.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stellar-secondary text-white text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  2
                </div>
                <div className="pt-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Pay with Stellar</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Make a micropayment to access the document using Stellar's fast and low-cost network.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stellar-accent text-white text-xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  3
                </div>
                <div className="pt-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Get Temporary Access</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Receive a time-limited access link that expires after use, ensuring your privacy.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-r from-stellar-primary to-stellar-secondary rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-white">
                    Ready to get started?
                  </h2>
                  <p className="mt-4 text-lg text-purple-100">
                    Sign in with your passkey and start exploring private document access today.
                  </p>
                </div>
                <div className="mt-8 md:mt-0 flex flex-shrink-0">
                  <Link
                    to="/auth"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-stellar-primary bg-white hover:bg-purple-50"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;