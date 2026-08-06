import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-sanity-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
};

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return '';
  // If it's already a direct URL string (e.g., imported local asset or external URL)
  if (typeof source === 'string') return source;
  // If source is a sanity image object or ref
  if (source.asset || source._ref || source._type === 'image') {
    try {
      return builder
        .image(source)
        .width(900)
        .fit('max')
        .auto('format')
        .quality(90)
        .url();
        } catch {
      return '';
    }
  }
  return '';
}
