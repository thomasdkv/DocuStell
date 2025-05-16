import { Document, UserCollection } from '../types';

/**
 * Service for interacting with IPFS for document storage and retrieval
 */
export class IPFSService {
  private isInitialized = false;
  private collections: Map<string, Document[]>;

  constructor() {
    this.collections = new Map();
    // Load collections from localStorage
    const savedCollections = localStorage.getItem('userCollections');
    if (savedCollections) {
      const parsed = JSON.parse(savedCollections);
      Object.entries(parsed).forEach(([userId, docs]) => {
        this.collections.set(userId, docs as Document[]);
      });
    }
  }

  /**
   * Initialize the IPFS service
   */
  async initialize(): Promise<void> {
    try {
      console.log('Initializing IPFS service...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.isInitialized = true;
      console.log('IPFS service initialized');
    } catch (error) {
      console.error('Failed to initialize IPFS service:', error);
      throw error;
    }
  }

  /**
   * Upload a document to IPFS
   */
  async uploadDocument(file: File): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('IPFS service not initialized');
    }

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      return `ipfs_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  /**
   * Save document metadata
   */
  async saveDocumentMetadata(document: Document): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('IPFS service not initialized');
    }

    try {
      const userDocs = this.collections.get(document.owner) || [];
      userDocs.push(document);
      this.collections.set(document.owner, userDocs);
      this.saveCollections();
    } catch (error) {
      console.error('Failed to save document metadata:', error);
      throw error;
    }
  }

  /**
   * Get user's document collection
   */
  async getUserCollection(userId: string): Promise<Document[]> {
    if (!this.isInitialized) {
      throw new Error('IPFS service not initialized');
    }

    try {
      return this.collections.get(userId) || [];
    } catch (error) {
      console.error('Failed to get user collection:', error);
      throw error;
    }
  }

  /**
   * Add document to user's collection
   */
  async addToCollection(userId: string, document: Document): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('IPFS service not initialized');
    }

    try {
      const userDocs = this.collections.get(userId) || [];
      if (!userDocs.some(doc => doc.id === document.id)) {
        userDocs.push(document);
        this.collections.set(userId, userDocs);
        this.saveCollections();
      }
    } catch (error) {
      console.error('Failed to add document to collection:', error);
      throw error;
    }
  }

  /**
   * Generate temporary access link for a document
   */
  async generateTemporaryLink(documentHash: string, expiryMinutes = 15): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('IPFS service not initialized');
    }

    try {
      console.log(`Generating temporary link for document: ${documentHash}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + expiryMinutes);
      return `https://ipfs.example.com/ipfs/${documentHash}?expiry=${expiryDate.getTime()}`;
    } catch (error) {
      console.error('Failed to generate temporary link:', error);
      throw error;
    }
  }

  /**
   * Save collections to localStorage
   */
  private saveCollections(): void {
    const collections: Record<string, Document[]> = {};
    this.collections.forEach((docs, userId) => {
      collections[userId] = docs;
    });
    localStorage.setItem('userCollections', JSON.stringify(collections));
  }
}