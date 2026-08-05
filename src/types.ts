export interface DialogueItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ExhibitionItem {
  year: string;
  title: string;
  venue: string;
  location: string;
  type: 'Exhibition' | 'Monograph' | 'Award' | 'Collection';
}

export interface GallerySeriesItem {
  id: string;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  aspectRatio: string;
  dimensions?: string;
  medium?: string;
}

