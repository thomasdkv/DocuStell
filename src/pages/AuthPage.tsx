import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fingerprint, Star, AlertCircle, Key } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usePasswordFallback, setUsePasswordFallback] = useState(false);
  const { login, passkeyService } = useApp();
  const navigate = useNavigate();

  const handlePasskeyLogin = async () => {
    setIsAuthenticating(true);
    setError(null);
    
    try {
      const isPasskeySupported = await passkeyService.isPasskeySupported();
      
      if (!isPasskeySupported) {
        throw new Error('Passkeys are not supported in your browser');
      }
      
      const { username, isAdmin } = await passkeyService.authenticateWithPasskey();
      await login(username, isAdmin);
      navigate('/marketplace');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsAuthenticating(true);
    setError(null);
    
    try {
      const { success, isAdmin } = await passkeyService.authenticateWithPassword(username, password);
      
      if (success) {
        await login(username, isAdmin);
        navigate('/marketplace');
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsAuthenticating(false);
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
            Sign in to StellarPayDocs
          </h2>
          
          {error && (
            <div className="mb-6 p-4 bg-error-light dark:bg-error-dark/20 text-error dark:text-error-light rounded-md flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Hidden input for WebAuthn */}
            <input
              type="hidden"
              name="webauthn"
              autoComplete="webauthn"
            />

            <button
              onClick={handlePasskeyLogin}
              disabled={isAuthenticating}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAuthenticating && !usePasswordFallback ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <Fingerprint className="w-5 h-5 mr-2" />
                  Sign in with Passkey
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handlePasswordLogin} className="space-y-4">
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
                  placeholder="Enter your username"
                  disabled={isAuthenticating}
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
                  disabled={isAuthenticating}
                />
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAuthenticating && usePasswordFallback ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Key className="w-5 h-5 mr-2" />
                    Sign in with Password
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/auth/register')} 
                className="text-stellar-primary hover:text-stellar-secondary transition-colors"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;