import heroImg from '../assets/images/hero_vertical_photo_1785323916660.jpg';
import underwaterSplitImg from '../assets/images/gallery_underwater_split_1785329766649.jpg';
import underwaterSareeImg from '../assets/images/gallery_underwater_saree_1785329781098.jpg';
import underwaterDiverImg from '../assets/images/gallery_underwater_diver_1785329795991.jpg';
import portraitWetsuitImg from '../assets/images/marina_portrait_wetsuit_1785329749552.jpg';

export interface SeriesPhoto {
  id: string;
  title: string;
  filename: string;
  imageUrl: string;
  caption?: string;
  year?: string;
}

export interface SeriesData {
  id: string;
  title: string;
  slug: string;
  description: string;
  year: string;
  location?: string;
  technique?: string;
  coverImageUrl: string;
  photoCount: number;
  photos: SeriesPhoto[];
}

const placeholderImages = [
  underwaterSplitImg,
  underwaterSareeImg,
  underwaterDiverImg,
  heroImg,
  portraitWetsuitImg,
];

function getPlaceholderImage(index: number): string {
  return placeholderImages[index % placeholderImages.length];
}

export const SERIES_LIST: SeriesData[] = [
  {
    id: 'series-aliens',
    title: 'Aliens',
    slug: 'aliens',
    year: '2025',
    location: 'Raja Ampat, Indonesia',
    technique: 'Underwater Digital & Ambient Light',
    description: 'An exploration of surreal aquatic species, hidden textures, and extraterrestrial underwater forms in deep coral ecosystems.',
    coverImageUrl: underwaterSplitImg,
    photoCount: 6,
    photos: [
      { id: 'aliens-1', title: 'Baby moray eel', filename: 'Baby moray eel', imageUrl: getPlaceholderImage(0), year: '2025' },
      { id: 'aliens-2', title: 'Blu-spotted stingray', filename: 'Blu-spotted stingray', imageUrl: getPlaceholderImage(1), year: '2025' },
      { id: 'aliens-3', title: 'Octopus', filename: 'Octopus', imageUrl: getPlaceholderImage(2), year: '2025' },
      { id: 'aliens-4', title: 'Turtle', filename: 'Turtle', imageUrl: getPlaceholderImage(3), year: '2025' },
      { id: 'aliens-5', title: 'Yellow coral', filename: 'Yellow coral', imageUrl: getPlaceholderImage(4), year: '2025' },
      { id: 'aliens-6', title: 'Pink coral', filename: 'Pink coral', imageUrl: getPlaceholderImage(5), year: '2025' },
    ],
  },
  {
    id: 'series-equilibrium',
    title: 'Equilibrium',
    slug: 'equilibrium',
    year: '2025',
    location: 'Red Sea, Egypt',
    technique: 'Medium Format Underwater Photography',
    description: 'A quiet study in weightlessness, physical symmetry, and the silent harmony between body, breath, and liquid space.',
    coverImageUrl: underwaterDiverImg,
    photoCount: 3,
    photos: [
      { id: 'equilibrium-1', title: 'Symmetry', filename: 'Symmetry', imageUrl: getPlaceholderImage(2), year: '2025' },
      { id: 'equilibrium-2', title: 'Duality', filename: 'Duality', imageUrl: getPlaceholderImage(0), year: '2025' },
      { id: 'equilibrium-3', title: 'Harmony', filename: 'Harmony', imageUrl: getPlaceholderImage(1), year: '2025' },
    ],
  },
  {
    id: 'series-kali-rising',
    title: 'Kali Rising',
    slug: 'kali-rising',
    year: '2024',
    location: 'Mediterranean Sea',
    technique: 'Analog Underwater Fine Art',
    description: 'Elemental power, fluid textiles, and breath-hold performance captured in high-contrast Mediterranean light.',
    coverImageUrl: underwaterSareeImg,
    photoCount: 2,
    photos: [
      { id: 'kali-1', title: 'Born from Fire', filename: 'Born from Fire', imageUrl: getPlaceholderImage(1), year: '2024' },
      { id: 'kali-2', title: 'Endless Sari', filename: 'Endless Sari', imageUrl: getPlaceholderImage(0), year: '2024' },
    ],
  },
  {
    id: 'series-the-last-one',
    title: 'The Last One',
    slug: 'the-last-one',
    year: '2024',
    location: 'Atlantic Ocean',
    technique: 'Archival Silver Gelatin',
    description: 'An emotional narrative on solitude, breath, and the fragile memory of human presence submerged in dark waters.',
    coverImageUrl: heroImg,
    photoCount: 7,
    photos: [
      { id: 'last-1', title: 'Breath', filename: 'Breath', imageUrl: getPlaceholderImage(3), year: '2024' },
      { id: 'last-2', title: 'Fight', filename: 'Fight', imageUrl: getPlaceholderImage(2), year: '2024' },
      { id: 'last-3', title: 'Hope', filename: 'Hope', imageUrl: getPlaceholderImage(0), year: '2024' },
      { id: 'last-4', title: 'Light', filename: 'Light', imageUrl: getPlaceholderImage(1), year: '2024' },
      { id: 'last-5', title: 'Memory', filename: 'Memory', imageUrl: getPlaceholderImage(4), year: '2024' },
      { id: 'last-6', title: 'Soul', filename: 'Soul', imageUrl: getPlaceholderImage(2), year: '2024' },
      { id: 'last-7', title: 'Tear', filename: 'Tear', imageUrl: getPlaceholderImage(0), year: '2024' },
    ],
  },
  {
    id: 'series-moments',
    title: 'Moments',
    slug: 'moments',
    year: '2024',
    location: 'Shanghai & Lisbon',
    technique: 'Natural Light Portraiture',
    description: 'Intimate underwater portraits documenting presence, connection, and unscripted human emotion below the surface.',
    coverImageUrl: portraitWetsuitImg,
    photoCount: 4,
    photos: [
      { id: 'moments-1', title: 'Alexey', filename: 'Alexey', imageUrl: getPlaceholderImage(4), year: '2024' },
      { id: 'moments-2', title: 'Arno', filename: 'Arno', imageUrl: getPlaceholderImage(1), year: '2024' },
      { id: 'moments-3', title: 'Bruno', filename: 'Bruno', imageUrl: getPlaceholderImage(2), year: '2024' },
      { id: 'moments-4', title: 'Sara', filename: 'Sara', imageUrl: getPlaceholderImage(0), year: '2024' },
    ],
  },
  {
    id: 'series-same-planet-other-worlds',
    title: 'Same Planet, Other Worlds',
    slug: 'same-planet-other-worlds',
    year: '2024–2025',
    location: 'Worldwide Oceans',
    technique: 'In-Camera Freediving Photography',
    description: 'Rather than imagining another planet, the series asks us to look at this one differently. Water becomes a space where usual rules dissolve and new relationships emerge.',
    coverImageUrl: underwaterSplitImg,
    photoCount: 12,
    photos: [
      { id: 'same-planet-1', title: 'Driven by curiosity', filename: 'Driven by curiosity', imageUrl: getPlaceholderImage(0), year: '2025' },
      { id: 'same-planet-2', title: 'The unknown', filename: 'The unknown', imageUrl: getPlaceholderImage(1), year: '2025' },
      { id: 'same-planet-3', title: 'Beyond the horizon', filename: 'Beyond the horizon', imageUrl: getPlaceholderImage(2), year: '2025' },
      { id: 'same-planet-4', title: 'Falling_ Floating_ Flying_', filename: 'Falling_ Floating_ Flying_', imageUrl: getPlaceholderImage(3), year: '2025' },
      { id: 'same-planet-5', title: 'First contact', filename: 'First contact', imageUrl: getPlaceholderImage(4), year: '2025' },
      { id: 'same-planet-6', title: 'I am not scared', filename: 'I am not scared', imageUrl: getPlaceholderImage(0), year: '2025' },
      { id: 'same-planet-7', title: 'I am taken care of', filename: 'I am taken care of', imageUrl: getPlaceholderImage(1), year: '2025' },
      { id: 'same-planet-8', title: 'Lost to be found', filename: 'Lost to be found', imageUrl: getPlaceholderImage(2), year: '2025' },
      { id: 'same-planet-9', title: 'What if_ (COVER)', filename: 'What if_ (COVER)', imageUrl: getPlaceholderImage(0), year: '2025' },
      { id: 'same-planet-10', title: 'What to expect', filename: 'What to expect', imageUrl: getPlaceholderImage(3), year: '2025' },
      { id: 'same-planet-11', title: 'What was here before_', filename: 'What was here before_', imageUrl: getPlaceholderImage(4), year: '2025' },
      { id: 'same-planet-12', title: 'Where am I_', filename: 'Where am I_', imageUrl: getPlaceholderImage(2), year: '2025' },
    ],
  },
];

export function getSeriesBySlug(slug: string): SeriesData | undefined {
  return SERIES_LIST.find((s) => s.slug === slug);
}
