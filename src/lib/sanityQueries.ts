import { sanityClient, urlFor } from './sanity';
import { SERIES_LIST, SeriesData, SeriesPhoto } from '../data/seriesData';
import { EXHIBITIONS_DATA, DIALOGUE_ITEMS, PRINTS_SERIES, ABOUT_PORTRAIT_URL, ABOUT_GALLERY_URL } from '../data/portfolioData';

// GROQ Queries
export const ALL_SERIES_QUERY = `*[_type == "series"] | order(sortOrder asc, year desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  year,
  location,
  technique,
  sortOrder,
  "coverImageUrl": coverImage.image,
  "photos": photos[] {
    "id": _key,
    title,
    caption,
    year,
    "filename": coalesce(filename, title),
    "imageUrl": image
  }
}`;

export const SERIES_BY_SLUG_QUERY = `*[_type == "series" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  year,
  location,
  technique,
  sortOrder,
  "coverImageUrl": coverImage.image,
  "photos": photos[] {
    "id": _key,
    title,
    caption,
    year,
    "filename": coalesce(filename, title),
    "imageUrl": image
  }
}`;

export const ABOUT_QUERY = `*[_type == "about"][0] {
  _id,
  title,
  subtitle,
  biography,
  "portraitImageUrl": portraitImage.image,
  "galleryImageUrl": galleryImage.image,
  exhibitions[] {
    year,
    title,
    venue,
    location,
    type
  },
  dialogues[] {
    question,
    answer,
    category
  },
  seo
}`;

export const CONTACT_QUERY = `*[_type == "contact"][0] {
  _id,
  title,
  email,
  phone,
  location,
  representation[] {
    city,
    gallery,
    website
  },
  socialLinks[] {
    label,
    url,
    isExternal
  },
  seo
}`;

export const PRINTS_QUERY = `*[_type == "prints"][0] {
  _id,
  title,
  subtitle,
  description,
  printSeries[] {
    "id": coalesce(_key, title),
    title,
    year,
    dimensions,
    medium,
    "imageUrl": image.image,
    "description": coalesce(image.caption, "Fine art vertical underwater study.")
  },
  seo
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  _id,
  siteTitle,
  siteDescription,
  author,
  mainNavigation[] {
    label,
    url
  },
  socialLinks[] {
    label,
    url
  },
  seo
}`;

// Fetch Functions with Fallback to local data
export async function getSanityAllSeries(): Promise<SeriesData[]> {
  try {
    const data = await sanityClient.fetch(ALL_SERIES_QUERY);
    console.log("SANITY RESPONSE:", data);
    if (data && Array.isArray(data) && data.length > 0) {
      console.log("DATA LENGTH:", data.length);
      return data.map((item: any) => {
        
        const photos: SeriesPhoto[] = (item.photos || []).map((p: any, idx: number) => {
          const url = p.imageUrl ? urlFor(p.imageUrl) : "";

          console.log("PHOTO URL", url);

          return {
           id: p.id || `photo-${idx}`,
           title: p.title || "Untitled",
           filename: p.filename || p.title || "Untitled",
           imageUrl: url,
           caption: p.caption,
           year: p.year || item.year,
          };
        });
        


        return {
          id: item._id || item.slug,
          title: item.title,
          slug: item.slug,
          description: item.description,
          year: item.year,
          location: item.location,
          technique: item.technique,
          coverImageUrl: item.coverImageUrl ? urlFor(item.coverImageUrl) : '',
          photoCount: photos.length,
          photos,
        };
      });
    }
  } catch (err) {
    console.warn('Sanity query getSanityAllSeries failed, using local dataset fallback', err);
  }
  return SERIES_LIST;
}




export async function getSanitySeriesBySlug(slug: string): Promise<SeriesData | undefined> {
  try {
    const item = await sanityClient.fetch(SERIES_BY_SLUG_QUERY, { slug });
    console.log("SERIES ITEM", item);
    if (item && item.title) {
      const photos: SeriesPhoto[] = (item.photos || []).map((p: any, idx: number) => {

        console.log("PHOTO OBJECT", p);

        const url = p.imageUrl ? urlFor(p.imageUrl) : "";

        console.log("PHOTO URL", url);

        return {
          id: p.id || `photo-${idx}`,
          title: p.title || "Untitled",
          filename: p.filename || p.title || "Untitled",
          imageUrl: url,
          caption: p.caption,
          year: p.year || item.year,
        };
      });

      return {
        id: item._id || item.slug,
        title: item.title,
        slug: item.slug,
        description: item.description,
        year: item.year,
        location: item.location,
        technique: item.technique,
        coverImageUrl: item.coverImageUrl ? urlFor(item.coverImageUrl) : '',
        photoCount: photos.length,
        photos,
      };
    }
  } catch (err) {
    console.warn('Sanity query getSanitySeriesBySlug failed, using local dataset fallback', err);
  }
  return SERIES_LIST.find((s) => s.slug === slug);
}

export async function getSanityAbout() {
  try {
    const data = await sanityClient.fetch(ABOUT_QUERY);
    if (data && data.title) {
      return {
        title: data.title,
        subtitle: data.subtitle,
        biography: data.biography,
        portraitImageUrl: data.portraitImageUrl ? urlFor(data.portraitImageUrl) : ABOUT_PORTRAIT_URL,
        galleryImageUrl: data.galleryImageUrl ? urlFor(data.galleryImageUrl) : ABOUT_GALLERY_URL,
        exhibitions: (data.exhibitions && data.exhibitions.length > 0) ? data.exhibitions : EXHIBITIONS_DATA,
        dialogues: (data.dialogues && data.dialogues.length > 0) 
          ? data.dialogues.map((d: any, idx: number) => ({
              id: `q-${idx}`,
              number: String(idx + 1).padStart(2, '0'),
              question: d.question,
              answer: d.answer,
              category: d.category || 'Dialogue'
            }))
          : DIALOGUE_ITEMS,
      };
    }
  } catch (err) {
    console.warn('Sanity query getSanityAbout failed, using local fallback', err);
  }
  return {
    title: "MARINA VALITOVA DIDN'T SET OUT TO BECOME AN ARTIST.",
    subtitle: '',
    biography: '',
    portraitImageUrl: ABOUT_PORTRAIT_URL,
    galleryImageUrl: ABOUT_GALLERY_URL,
    exhibitions: EXHIBITIONS_DATA,
    dialogues: DIALOGUE_ITEMS,
  };
}

export async function getSanityContact() {
  try {
    const data = await sanityClient.fetch(CONTACT_QUERY);
    if (data && data.email) {
      return {
        title: data.title || 'CONTACT',
        email: data.email || 'info@marinaphotography.com',
        phone: data.phone || '+351 912 345 678',
        location: data.location || 'Lisbon Studio · Paris Representation',
        representation: data.representation || [],
        socialLinks: data.socialLinks || [],
      };
    }
  } catch (err) {
    console.warn('Sanity query getSanityContact failed, using local fallback', err);
  }
  return {
    title: 'CONTACT',
    email: 'info@marinaphotography.com',
    phone: '+351 912 345 678',
    location: 'Lisbon Studio · Paris Representation',
    representation: [
      { city: 'Lisbon Studio', gallery: 'Rua do Século 14, Bairro Alto, Lisboa' },
      { city: 'Paris Representation', gallery: "Galerie d'Art Aquatique, Rue Saint-Honoré" },
    ],
    socialLinks: [
      { label: '@marina.photographs', url: 'https://instagram.com' }
    ],
  };
}

export async function getSanityPrints() {
  try {
    const data = await sanityClient.fetch(PRINTS_QUERY);
    if (data && data.title) {
      return {
        title: data.title || 'PRINTS & ARCHIVAL EDITIONS',
        subtitle: data.subtitle || '',
        description: data.description || 'Museum-grade archival pigment & silver gelatin prints, produced in signed, numbered limited editions.',
        printSeries: (data.printSeries && data.printSeries.length > 0)
          ? data.printSeries.map((item: any, idx: number) => ({
              id: item.id || `print-${idx}`,
              title: item.title,
              year: item.year || '2025',
              description: item.description || 'Fine art vertical underwater study.',
              imageUrl: item.imageUrl ? urlFor(item.imageUrl) : PRINTS_SERIES[idx % PRINTS_SERIES.length]?.imageUrl,
              aspectRatio: '3/4',
              dimensions: item.dimensions || '120 × 160 cm',
              medium: item.medium || 'Archival Print'
            }))
          : PRINTS_SERIES,
      };
    }
  } catch (err) {
    console.warn('Sanity query getSanityPrints failed, using local fallback', err);
  }
  return {
    title: 'PRINTS & ARCHIVAL EDITIONS',
    subtitle: '',
    description: 'Museum-grade archival pigment & silver gelatin prints, produced in signed, numbered limited editions.',
    printSeries: PRINTS_SERIES,
  };
}

export async function getSanitySiteSettings() {
  try {
    const data = await sanityClient.fetch(SITE_SETTINGS_QUERY);
    if (data && data.siteTitle) {
      return {
        siteTitle: data.siteTitle || 'MARINA',
        siteDescription: data.siteDescription || 'Editorial & Fine Art Photography · Lisbon / Paris',
        author: data.author || 'Marina Valitova',
        mainNavigation: data.mainNavigation || [
          { label: 'Portfolio', url: '/' },
          { label: 'About', url: '/about' },
          { label: 'Contacts', url: '/contacts' }
        ],
        socialLinks: data.socialLinks || [],
      };
    }
  } catch (err) {
    console.warn('Sanity query getSanitySiteSettings failed, using local fallback', err);
  }
  return {
    siteTitle: 'MARINA',
    siteDescription: 'Editorial & Fine Art Photography · Lisbon / Paris',
    author: 'Marina Valitova',
    mainNavigation: [
      { label: 'Portfolio', url: '/' },
      { label: 'About', url: '/about' },
      { label: 'Contacts', url: '/contacts' }
    ],
    socialLinks: [],
  };
}
