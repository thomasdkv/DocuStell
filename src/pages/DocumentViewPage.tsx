import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowLeft, Lock, Check, AlertTriangle, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getDocumentById } from '../utils/api';
import { Document } from '../types';

const DocumentViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'not_paid' | 'processing' | 'paid' | 'error'>('not_paid');
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const { user, stellarService, ipfsService } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const loadDocument = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const doc = await getDocumentById(id);
        setDocument(doc);
        
        // Check if user already has access
        const access = await stellarService.checkDocumentAccess(id, user.id);
        setHasAccess(access);
        if (access) {
          setPaymentStatus('paid');
          generateDownloadLink(doc.hash);
        } else {
          setPaymentStatus('not_paid');
        }
      } catch (error) {
        console.error('Failed to load document:', error);
        setError('Failed to load document details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDocument();
  }, [id, user, navigate, stellarService, ipfsService]);

  const generateDownloadLink = async (documentHash: string) => {
    try {
      const link = await ipfsService.generateTemporaryLink(documentHash);
      setDownloadLink(link);
    } catch (error) {
      console.error('Failed to generate download link:', error);
      setError('Failed to generate download link. Please try again.');
    }
  };

  const handlePayment = async () => {
    if (!document || !user) return;
    
    setPaymentStatus('processing');
    setError(null);
    
    try {
      const payment = await stellarService.makePayment(document.id, document.price);
      
      if (payment.success) {
        setPaymentStatus('paid');
        setHasAccess(true);
        generateDownloadLink(document.hash);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setError('Payment failed. Please try again later.');
    }
  };

  const handleShare = async () => {
    if (!document) return;
    
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Share link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Document Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The document you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate('/documents')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Documents
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate('/documents')}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Documents
        </button>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-stellar-primary/10 to-stellar-secondary/10 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {document.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-x-6 gap-y-2">
              <span>Category: {document.category}</span>
              <span>Added: {document.createdAt}</span>
              <span>Size: {document.size}</span>
            </div>
          </div>
          
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Document Description
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {document.description}
                </p>
              </div>
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
            
            {error && (
              <div className="p-4 bg-error-light dark:bg-error-dark/20 text-error-dark dark:text-error-light rounded-md flex items-start">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              {paymentStatus === 'not_paid' && !hasAccess && (
                <div className="text-center">
                  <Lock className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    This document requires payment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Pay {document.price} XLM to get temporary access to this document.
                    The download link will expire after use.
                  </p>
                  <button
                    onClick={handlePayment}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary"
                  >
                    Pay {document.price} XLM
                  </button>
                </div>
              )}
              
              {paymentStatus === 'processing' && (
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4">
                    <svg className="animate-spin w-12 h-12 text-stellar-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Processing Payment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Please wait while we process your payment on the Stellar network...
                  </p>
                </div>
              )}
              
              {(paymentStatus === 'paid' && hasAccess && downloadLink) && (
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-success/10 text-success rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Payment Successful
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your temporary download link is ready! This link will expire after downloading or within 15 minutes.
                  </p>
                  <a
                    href={downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-success hover:bg-success-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success transition-colors"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Document
                  </a>
                </div>
              )}
              
              {paymentStatus === 'error' && (
                <div className="text-center">
                  <AlertTriangle className="w-12 h-12 mx-auto text-error mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Payment Failed
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    There was an error processing your payment. Please try again.
                  </p>
                  <button
                    onClick={handlePayment}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentViewPage;