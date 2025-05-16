import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fingerprint, Star, AlertCircle, Key } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { passkeyService } = useApp();
  const navigate = useNavigate();

  const handleRegister = async (usePasskey: boolean = true) => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (!usePasskey && !password.trim()) {
      setError('Password is required when not using passkey');
      return;
    }
    
    setIsRegistering(true);
    setError(null);
    
    try {
      if (usePasskey) {
        const isPasskeySupported = await passkeyService.isPasskeySupported();
        if (!isPasskeySupported) {
          throw new Error('Passkeys are not supported in your browser');
        }
      }
      
      const isRegistered = await passkeyService.register(username, usePasskey, password);
      
      if (isRegistered) {
        navigate('/auth');
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-stellar-primary to-stellar-secondary p-6 flex justify-center">
          <Star className="w-16 h-16 text-white" />
        </div>
        
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Register for StellarPayDocs
          </h2>
          
          {error && (
            <div className="mb-6 p-4 bg-error-light dark:bg-error-dark/20 text-error dark:text-error-light rounded-md flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-stellar-primary focus:border-stellar-primary dark:bg-gray-700 dark:text-white"
                placeholder="Enter your desired username"
                disabled={isRegistering}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-stellar-primary focus:border-stellar-primary dark:bg-gray-700 dark:text-white"
                placeholder="Enter your password"
                disabled={isRegistering}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Required for password-only registration or as passkey backup
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleRegister(true)}
                disabled={isRegistering}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isRegistering ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-5 h-5 mr-2" />
                    Register with Passkey
                  </>
                )}
              </button>

              <button
                onClick={() => handleRegister(false)}
                disabled={isRegistering}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Key className="w-5 h-5 mr-2" />
                Register with Password Only
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/auth')} 
                className="text-stellar-primary hover:text-stellar-secondary transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;