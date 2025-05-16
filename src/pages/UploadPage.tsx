import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, AlertCircle, FileText, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format, addDays } from 'date-fns';
import { addDocument } from '../utils/api';

const UploadPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [duration, setDuration] = useState(30);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  
  const { user, ipfsService } = useApp();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]?.type === 'application/pdf') {
      setFile(acceptedFiles[0]);
      setError(null);
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim() || !description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const hash = await ipfsService.uploadDocument(file);
      const now = new Date();
      const documentId = `doc_${Date.now()}`;
      
      const newDocument = {
        id: documentId,
        title: title.trim(),
        description: description.trim(),
        price,
        hash,
        owner: user?.id || '',
        duration,
        views: 0,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        createdAt: format(now, 'yyyy-MM-dd'),
        expiresAt: format(addDays(now, duration), 'yyyy-MM-dd'),
        category: 'Uploaded',
        visibility,
        shareUrl: `/documents/${documentId}`
      };

      await ipfsService.saveDocumentMetadata(newDocument);
      addDocument(newDocument);
      navigate('/marketplace');
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Upload Document
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-error-light dark:bg-error-dark/20 text-error dark:text-error-light rounded-md flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Document Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-stellar-primary focus:border-stellar-primary dark:bg-gray-700 dark:text-white"
              placeholder="Enter document title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-stellar-primary focus:border-stellar-primary dark:bg-gray-700 dark:text-white"
              placeholder="Enter document description"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price (XLM)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-stellar-primary focus:border-stellar-primary dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration (days)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-stellar-primary focus:border-stellar-primary dark:bg-gray-700 dark:text-white"
              >
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={365}>1 year</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Visibility
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setVisibility('public')}
                className={`flex items-center px-4 py-2 rounded-md ${
                  visibility === 'public'
                    ? 'bg-stellar-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 mr-2" />
                Public
              </button>
              <button
                type="button"
                onClick={() => setVisibility('private')}
                className={`flex items-center px-4 py-2 rounded-md ${
                  visibility === 'private'
                    ? 'bg-stellar-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <EyeOff className="w-4 h-4 mr-2" />
                Private
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {visibility === 'public' 
                ? 'Document will be visible in the public marketplace'
                : 'Document will only be accessible via direct link'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Upload PDF *
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-stellar-primary bg-stellar-primary/5'
                  : 'border-gray-300 dark:border-gray-700 hover:border-stellar-primary hover:bg-stellar-primary/5'
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                {file ? (
                  <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                    <FileText className="w-5 h-5" />
                    <span>{file.name}</span>
                  </div>
                ) : isDragActive ? (
                  <p className="text-stellar-primary">Drop your PDF here</p>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    Drag & drop your PDF here, or click to select
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUploading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-stellar-primary hover:bg-stellar-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stellar-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Upload Document'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadPage;