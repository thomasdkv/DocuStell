import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useApp } from '../context/AppContext';
import LoadingScreen from './LoadingScreen';

const Layout: React.FC = () => {
  const { isLoading } = useApp();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-space-dark dark:to-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;