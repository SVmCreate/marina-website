import { DialogueItem, ExhibitionItem, GallerySeriesItem } from '../types';

import heroImg from '../assets/images/hero_vertical_photo_1785323916660.jpg';

// The 3 main vertical underwater fine art photos in order
import underwaterSplitImg from '../assets/images/gallery_underwater_split_1785329766649.jpg';
import underwaterSareeImg from '../assets/images/gallery_underwater_saree_1785329781098.jpg';
import underwaterDiverImg from '../assets/images/gallery_underwater_diver_1785329795991.jpg';

export const HERO_IMAGE_URL = heroImg;
// Original photo (Marina holding underwater camera in wetsuit near sea shore) placed as-is in Biography & Approach
export const ABOUT_PORTRAIT_URL = heroImg;
export const ABOUT_GALLERY_URL = underwaterSplitImg;

// Prints section detailed gallery items
export const PRINTS_SERIES: GallerySeriesItem[] = [
  {
    id: 'print-1',
    title: 'Weightless & Dual Light',
    year: '2025',
    description: 'Fine art vertical underwater study capturing light refraction, depth, and spatial balance.',
    imageUrl: underwaterSplitImg,
    aspectRatio: '3/4',
    dimensions: '120 × 160 cm',
    medium: 'Archival Silver Gelatin Fine Art Print'
  },
  {
    id: 'print-2',
    title: 'Aura in Motion',
    year: '2024',
    description: 'Ethereal study of human form and fluid textile cadence in deep Mediterranean water.',
    imageUrl: underwaterSareeImg,
    aspectRatio: '3/4',
    dimensions: '100 × 133 cm',
    medium: 'Platinum Palladium Limited Edition'
  },
  {
    id: 'print-3',
    title: 'Ascent into Abyss',
    year: '2024',
    description: 'Monolithic portrait of quiet oceanic descent and weightless solitude.',
    imageUrl: underwaterDiverImg,
    aspectRatio: '3/4',
    dimensions: '90 × 120 cm',
    medium: 'Hahnemühle Archival Pigment Print'
  }
];

export const DIALOGUE_ITEMS: DialogueItem[] = [
  {
    id: 'q1',
    number: '01',
    question: 'What are you curious about?',
    answer: 'Everything around me. People, nature, movement, ideas… I like understanding why things feel the way they do.',
    category: 'Curiosity & Perception'
  },
  {
    id: 'q2',
    number: '02',
    question: 'Do your photographs begin with the camera?',
    answer: "It depends. Sometimes I go with a flow. But I really like to go in the water with an idea. It can be very clear, or it’s just a feeling. And I can carry it with me for weeks or months before I know how to make it real.",
    category: 'Vision & Process'
  },
  {
    id: 'q3',
    number: '03',
    question: 'Why do you work underwater?',
    answer: "Because that’s where I feel most at home. I feel very comfortable in the water. Movements become softer. Time feels differently. It allows me to see things that don’t exist on land.",
    category: 'Underwater Realm'
  },
  {
    id: 'q4',
    number: '04',
    question: 'What happens once you’re underwater?',
    answer: 'I trust the process. The sea always brings something unexpected. I like leaving space for the surprises.',
    category: 'Trusting the Sea'
  },
  {
    id: 'q5',
    number: '05',
    question: 'What’s happening in your mind while you’re photographing?',
    answer: 'I’m simply present. If I start thinking too much, I begin missing things.',
    category: 'Presence'
  },
  {
    id: 'q6',
    number: '06',
    question: 'What role does freediving play in your work?',
    answer: 'Freediving gives me freedom. I know how to move, how to hold my breath. I can simply be there. That allows me to concentrate completely on what is happening in front of me.',
    category: 'Freediving'
  },
  {
    id: 'q7',
    number: '07',
    question: 'What do you hope the people you photograph feel?',
    answer: 'That we’re creating something together. The best shoots are the ones where everyone enjoys the process. When people stop worrying about looking good and start enjoying themselves, something genuine appears.',
    category: 'Collaboration'
  },
  {
    id: 'q8',
    number: '08',
    question: 'What do you hope people feel when they look at your work?',
    answer: 'I don’t want to tell them what to think. I’d rather leave them with a question. Sometimes the most interesting part of an image is what isn’t explained.',
    category: 'Perception & Mystery'
  },
  {
    id: 'q9',
    number: '09',
    question: 'What would you never want to lose?',
    answer: 'Curiosity.',
    category: 'Essential Spirit'
  },
  {
    id: 'q10',
    number: '10',
    question: 'If photography disappeared tomorrow, what would you do?',
    answer: 'I’d probably spend even more time in the ocean. I’d ride my motorcycle more. I’d start painting again. I think I’d still be creating. It would simply be with a different medium.',
    category: 'Mediums & Creation'
  },
  {
    id: 'q11',
    number: '11',
    question: 'What makes you happier: freediving session or photography session?',
    answer: 'Don’t make me choose.',
    category: 'Passion'
  }
];

export const EXHIBITIONS_DATA: ExhibitionItem[] = [
  {
    year: '2025',
    title: 'Silence & Light (Solo)',
    venue: 'Museu Nacional de Arte Contemporânea',
    location: 'Lisbon, Portugal',
    type: 'Exhibition'
  },
  {
    year: '2024',
    title: 'Topographies of Stillness',
    venue: 'Fondation Cartier pour l’art contemporain',
    location: 'Paris, France',
    type: 'Exhibition'
  },
  {
    year: '2023',
    title: 'Vertical Horizons (Monograph)',
    venue: 'Steidl Publishing',
    location: 'Göttingen, Germany',
    type: 'Monograph'
  },
  {
    year: '2022',
    title: 'Prix de la Photographie de Portrait',
    venue: 'International Center of Photography',
    location: 'New York, USA',
    type: 'Award'
  },
  {
    year: 'Permanent',
    title: 'The Mediterranean Shadows Collection',
    venue: 'Centro de Arte Moderna Gulbenkian',
    location: 'Lisbon, Portugal',
    type: 'Collection'
  }
];

