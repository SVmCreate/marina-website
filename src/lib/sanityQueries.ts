import { sanityClient } from './sanity';

/**
 * Нормализует код языка в формат 'en' | 'ru'
 */
const normalizeLang = (lang?: string): 'en' | 'ru' => {
  if (!lang) return 'en';
  const l = lang.toLowerCase();
  if (l.includes('ru') || l === 'rus') return 'ru';
  return 'en';
};

/**
 * Запрос данных для раздела About
 */
export async function getSanityAbout(lang: string = 'en') {
  const currentLang = normalizeLang(lang);

  const query = `*[_type == "about"][0]{
    "title": coalesce(
      title[$lang],
      title[_key == $lang][0].value,
      title_ru,
      title.ru,
      title.en,
      title
    ),

    "subtitle": coalesce(
      subtitle[$lang],
      subtitle[_key == $lang][0].value,
      subtitle_ru,
      subtitle.ru,
      subtitle.en,
      subtitle
    ),

    "biography": coalesce(
      biography[$lang],
      biography[_key == $lang][0].value,
      biography_ru,
      biography.ru,
      biography.en,
      biography
    ),

    "portraitImageUrl": coalesce(portraitImage.image.asset->url, portraitImage.asset->url),
    "galleryImageUrl": coalesce(galleryImage.image.asset->url, galleryImage.asset->url),

    "exhibitions": exhibitions[] {
      "title": coalesce(
        title[$lang],
        title[_key == $lang][0].value,
        title_ru,
        title.ru,
        title.en,
        title
      ),
      venue,
      location,
      type,
      year
    },

    "dialogues": dialogues[] {
      categoryKey,
      "category": coalesce(
        category[$lang],
        category[_key == $lang][0].value,
        category.ru,
        category.en,
        category
      ),
      "question": coalesce(
        question[$lang],
        question[_key == $lang][0].value,
        question.ru,
        question.en,
        question
      ),
      "answer": coalesce(
        answer[$lang],
        answer[_key == $lang][0].value,
        answer.ru,
        answer.en,
        answer
      )
    }
  }`;

  try {
    return await sanityClient.fetch(query, { lang: currentLang });
  } catch (error) {
    console.error('Error fetching Sanity About:', error);
    return null;
  }
}

/**
 * Запрос основных настроек сайта (заголовок, меню)
 */
export async function getSanitySiteSettings(lang: string = 'en') {
  const currentLang = normalizeLang(lang);

  const query = `*[_type == "siteSettings"][0]{
    "siteTitle": coalesce(siteTitle[$lang], siteTitle.ru, siteTitle.en, siteTitle, 'MARINA'),
    "siteDescription": coalesce(siteDescription[$lang], siteDescription.ru, siteDescription.en, siteDescription),
    "mainNavigation": mainNavigation[] {
      "label": coalesce(
        label[$lang],
        label[_key == $lang][0].value,
        label.ru,
        label.en,
        label
      ),
      url
    }
  }`;

  try {
    return await sanityClient.fetch(query, { lang: currentLang });
  } catch (error) {
    console.error('Error fetching Sanity Site Settings:', error);
    return null;
  }
}

/**
 * Запрос всех серий для главной страницы (Home.tsx / MainGallery.tsx)
 */
export async function getSanityAllSeries(lang: string = 'en') {
  const currentLang = normalizeLang(lang);

  const query = `*[_type == "series"] | order(sortOrder asc){
    _id,
    "title": coalesce(title[$lang], title.ru, title.en, title),
    "slug": slug.current,
    "coverImageUrl": coalesce(coverImage.image.asset->url, coverImage.asset->url)
  }`;

  try {
    return await sanityClient.fetch(query, { lang: currentLang });
  } catch (error) {
    console.error('Error fetching Sanity All Series:', error);
    return [];
  }
}

/**
 * Запрос конкретной серии по slug (для SeriesDetail.tsx)
 */
export async function getSanitySeriesBySlug(
  slug: string,
  lang: string = 'en'
) {
  const currentLang = normalizeLang(lang);

  const query = `*[_type == "series" && slug.current == $slug][0]{
    _id,
    "title": coalesce(title[$lang], title.ru, title.en, title),
    "description": coalesce(description[$lang], description.ru, description.en, description),
    year,
    "location": coalesce(location[$lang], location.ru, location.en, location),
    "technique": coalesce(technique[$lang], technique.ru, technique.en, technique),
    "coverImageUrl": coalesce(coverImage.image.asset->url, coverImage.asset->url),
    "photos": photos[] {
      "id": _key,
      "title": coalesce(title[$lang], title.ru, title.en, title),
      "caption": coalesce(caption[$lang], caption.ru, caption.en, caption),
      year,
      "filename": coalesce(filename, title[$lang], title.ru, title.en, title),
      "imageUrl": coalesce(image.asset->url, image.image.asset->url, asset->url)
    }
  }`;

  try {
    return await sanityClient.fetch(query, {
      slug,
      lang: currentLang,
    });
  } catch (error) {
    console.error('Error fetching Sanity Series by Slug:', error);
    return null;
  }
}

/**
 * Запрос данных для контактной карточки (ContactCard.tsx)
 */
export async function getSanityContact(lang: string = 'en') {
  const currentLang = normalizeLang(lang);

  const query = `*[_type == "contact"][0]{
    "title": coalesce(title[$lang], title.ru, title.en, title),
    email,
    phone,
    "location": coalesce(location[$lang], location.ru, location.en, location),
    representation,
    socialLinks,
    socials
  }`;

  try {
    return await sanityClient.fetch(query, { lang: currentLang });
  } catch (error) {
    console.error('Error fetching Sanity Contact:', error);
    return null;
  }
}

/**
 * Запрос данных для раздела Prints (ContactCard.tsx / PrintsSection.tsx)
 */
export async function getSanityPrints(lang: string = 'en') {
  const currentLang = normalizeLang(lang);

  const query = `*[_type == "prints"][0]{
    "title": coalesce(title[$lang], title.ru, title.en, title),
    "description": coalesce(description[$lang], description.ru, description.en, description),
    "printSeries": printSeries[] {
      id,
      "title": coalesce(title[$lang], title.ru, title.en, title),
      "description": coalesce(description[$lang], description.ru, description.en, description),
      year,
      dimensions,
      medium,
      "imageUrl": coalesce(image.asset->url, image.image.asset->url, asset->url)
    }
  }`;

  try {
    return await sanityClient.fetch(query, { lang: currentLang });
  } catch (error) {
    console.error('Error fetching Sanity Prints:', error);
    return null;
  }
}