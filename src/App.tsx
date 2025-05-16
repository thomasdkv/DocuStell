import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/DocumentsPage';
import DocumentViewPage from './pages/DocumentViewPage';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import UploadPage from './pages/UploadPage';
import CollectionPage from './pages/CollectionPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="documents/:id" element={<DocumentViewPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="collection" element={<CollectionPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;