import { Document } from '../types';

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Introduction to Stellar Blockchain',
    description: 'A comprehensive guide to understanding Stellar blockchain technology, its architecture, and key features.',
    category: 'Technical',
    price: '5.00',
    createdAt: '2024-03-15',
    size: '4.2 MB',
    hash: 'Qm123456789abcdef123456789abcdef123456789a',
    owner: 'admin',
    duration: 365,
    views: 245,
    expiresAt: '2025-03-15',
    visibility: 'public',
    shareUrl: '/documents/1'
  },
  {
    id: '2',
    title: 'Smart Contract Development Guide',
    description: 'Learn how to develop and deploy smart contracts on the Stellar network using Soroban.',
    category: 'Development',
    price: '8.50',
    createdAt: '2024-03-14',
    size: '6.8 MB',
    hash: 'Qm987654321fedcba987654321fedcba987654321',
    owner: 'admin',
    duration: 180,
    views: 127,
    expiresAt: '2024-09-14',
    visibility: 'public',
    shareUrl: '/documents/2'
  },
  {
    id: '3',
    title: 'Stellar Network Security Best Practices',
    description: 'Essential security guidelines and best practices for building secure applications on the Stellar network.',
    category: 'Security',
    price: '12.00',
    createdAt: '2024-03-13',
    size: '5.5 MB',
    hash: 'Qm246813579acegi246813579acegi246813579a',
    owner: 'admin',
    duration: 90,
    views: 89,
    expiresAt: '2024-06-13',
    visibility: 'public',
    shareUrl: '/documents/3'
  },
  {
    id: '4',
    title: 'Stellar Payment Integration Guide',
    description: 'Step-by-step guide for integrating Stellar payments into your applications with code examples.',
    category: 'Development',
    price: '7.50',
    createdAt: '2024-03-12',
    size: '3.9 MB',
    hash: 'Qm135792468bdfhj135792468bdfhj135792468b',
    owner: 'admin',
    duration: 120,
    views: 156,
    expiresAt: '2024-07-12',
    visibility: 'public',
    shareUrl: '/documents/4'
  },
  {
    id: '5',
    title: 'Stellar Network Performance Optimization',
    description: 'Advanced techniques for optimizing application performance on the Stellar network.',
    category: 'Technical',
    price: '9.99',
    createdAt: '2024-03-11',
    size: '7.2 MB',
    hash: 'Qm975310864bdfhj975310864bdfhj975310864b',
    owner: 'admin',
    duration: 150,
    views: 78,
    expiresAt: '2024-08-11',
    visibility: 'public',
    shareUrl: '/documents/5'
  }
];

let dynamicDocuments = [...mockDocuments];

export const getDocuments = async (): Promise<Document[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dynamicDocuments.filter(doc => doc.visibility === 'public');
};

export const getDocumentById = async (id: string): Promise<Document> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const document = dynamicDocuments.find(doc => doc.id === id);
  
  if (!document) {
    throw new Error('Document not found');
  }
  
  return document;
};

export const addDocument = (document: Document): void => {
  dynamicDocuments.unshift(document);
};