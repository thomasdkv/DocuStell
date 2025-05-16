import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Clock, Search, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getDocuments } from '../utils/api';
import { Document } from '../types';

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await getDocuments();
        setDocuments(docs);
        setFilteredDocuments(docs);
      } catch (error) {
        console.error('Failed to fetch documents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    let filtered = documents;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(doc => doc.category === categoryFilter);
    }
    
    setFilteredDocuments(filtered);
  }, [searchTerm, categoryFilter, documents]);

  const categories = [...new Set(documents.map(doc => doc.category))];

  const handleDocumentClick = (documentId: string) => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate(`/documents/${documentId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Document Library</h1>
        
        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-stellar-primary focus:border-stellar-primary"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {showFilters ? 
                <ChevronUp className="ml-2 h-4 w-4" /> : 
                <ChevronDown className="ml-2 h-4 w-4" />
              }
            </button>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter(null)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    categoryFilter === null 
                      ? 'bg-stellar-primary text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      categoryFilter === category 
                        ? 'bg-stellar-primary text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Document Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
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
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {doc.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-stellar-primary font-medium">
                      {doc.price} XLM
                    </span>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {doc.createdAt}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any documents matching your search criteria. Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DocumentsPage;