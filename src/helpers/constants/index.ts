import type { Category, Season } from '@/types/global';
/**
 * Placeholder URLs for avatar and background cover images.
 * These are used when user images are not available.
 *
 * @readonly
 * @type {Readonly<{ avatar_url: string, background_cover_url: string }>}
 */
const PLACE_HOLDERS: Readonly<{
  avatar_url: string;
  background_cover_url: string;
}> = {
  avatar_url: '/img/avatar.webp',
  background_cover_url: '/img/bg-cover.webp',
};

/**
 * List of categories for the site.
 * Each category has a unique id, path, label, and color.
 *
 * @readonly
 * @type {Category[]}
 */
const CATEGORIES: readonly Category[] = [
  { id: 0, path: '/anime', label: 'Anime', color: 'blue' },
  { id: 1, path: '/manga', label: 'Manga', color: 'green' },
  { id: 2, path: '/donghua', label: 'Donghua', color: 'red' },
  { id: 3, path: '/novels', label: 'Novels', color: 'purple' },
  { id: 4, path: '/lightnovels', label: 'Light Novels', color: 'yellow' },
  { id: 5, path: '/manhwa', label: 'Manhwa', color: 'pink' },
  { id: 6, path: '/manhua', label: 'Manhua', color: 'teal' },
  { id: 7, path: '/cartoons', label: 'Cartoons', color: 'brown' },
  { id: 8, path: '/seiyu', label: 'Seiyu', color: 'purple' },
  { id: 9, path: '/actors', label: 'Actors', color: 'green' },
  { id: 10, path: '/studios', label: 'Studios', color: 'blue' },
  { id: 11, path: '/reviews', label: 'Reviews', color: 'yellow' },
  { id: 12, path: '/news', label: 'News', color: 'red' },
  { id: 13, path: '/events', label: 'Events', color: 'orange' },
  { id: 14, path: '/cosplay', label: 'Cosplay', color: 'brown' },
  { id: 15, path: '/expos', label: 'Expos', color: 'brown' },
  { id: 16, path: '/conventions', label: 'Conventions', color: 'blue' },
  { id: 17, path: '/figures', label: 'Figures', color: 'green' },
  { id: 18, path: '/games', label: 'Games', color: 'red' },
  { id: 19, path: '/music', label: 'Music', color: 'purple' },
];

/**
 * List of seasons for the year.
 * This array contains the four main seasons: Winter, Spring, Summer, and Fall.
 *
 * @readonly
 * @type {readonly Season[]}
 */
type Season = 'Winter' | 'Spring' | 'Summer' | 'Fall';

const SEASONS: readonly Season[] = ['Winter', 'Spring', 'Summer', 'Fall'];

Object.freeze([PLACE_HOLDERS, CATEGORIES, SEASONS]);

export { PLACE_HOLDERS, CATEGORIES, SEASONS };
