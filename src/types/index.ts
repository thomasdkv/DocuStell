export interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  createdAt: string;
  size: string;
  hash: string;
  owner: string;
  duration: number; // Duration in days
  views: number;
  expiresAt: string;
  visibility: 'public' | 'private';
  shareUrl?: string;
}

export interface UserCollection {
  userId: string;
  documents: Document[];
}