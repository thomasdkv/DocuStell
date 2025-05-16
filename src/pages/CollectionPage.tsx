import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Clock, Eye, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Document } from '../types';

const CollectionPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, ipfsService } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        const collection = await ipfsService.getUserCollection(user.id);
        setDocuments(collection);
        setFilteredDocuments(collection);
      } catch (error) {
        console.error('Failed to fetch collection:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollection();
  }, [user, navigate, ipfsService]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchTerm, documents]);

  const handleDocumentClick = (documentId: string) => {
    navigate(`/documents/${documentId}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Collection
          </h1>
          <button
            onClick={() => navigate('/upload')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90"
          >
            Upload Document
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-stellar-primary focus:border-stellar-primary"
              placeholder="Search your collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => handleDocumentClick(doc.id)}
              >
                <div className="relative h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                  <div className="absolute top-4 right-4 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300">
                    {doc.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {doc.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {doc.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                      <Eye className="w-4 h-4 mr-1" />
                      {doc.views} views
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      Expires: {doc.expiresAt}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No documents found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Your collection is empty. Start by uploading a document or purchasing one from the marketplace.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CollectionPage;