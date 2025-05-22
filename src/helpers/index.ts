import { IUser } from '@/types/global';
import { IconStyles } from '@/types/global';
import swears from '@/data/swears.json';
import { Crown, Shield, Megaphone, CheckCircle, User, Sparkles } from 'lucide-react';

/**
 * Calculate the age based on the provided birthdate.
 *
 * @param {Date} birthDate - The birthdate of the user.
 * @returns {number} The age calculated based on the current date.
 * If the birth date is in the future, it returns 0.
 */
const calculateAge = (birthDate: Date): number => {
  const currentDate = new Date();

  if (birthDate > currentDate) return 0;

  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  let age = currentYear - birthYear;

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  return Math.max(age, 0);
};

/**
 * Filter a list of users to determine which ones the current user is following.
 *
 * @param {Partial<IUser>[]} my_followers - The list of users that the current user is following.
 * @param {Partial<IUser>[]} other_followers - The list of other users to check against.
 * @returns {(Partial<IUser> & { is_following: boolean })[]} A new array of users with an additional `is_following` property
 * indicating whether the current user is following them.
 */
const filter_followers = (
  my_followers: Partial<IUser>[],
  other_followers: Partial<IUser>[],
): (Partial<IUser> & { is_following: boolean })[] => {
  const my_followers_set = new Set(my_followers.map((follower) => follower._id));

  return other_followers.map((user) => ({
    ...user,
    is_following: my_followers_set.has(user._id),
  }));
};

/**
 * Convert a date to a string formatted as 'MM/DD/YYYY'.
 *
 * @param {string | Date} [date] - The date to be converted.
 * @returns {string} A formatted string representing the date, or 'N/A' if no date is provided.
 * If the date is invalid, it returns 'Invalid Date'.
 */

const dateConverter = (date?: string | Date) => {
  if (!date) return 'N/A';

  const validDate = date instanceof Date ? date : new Date(date);
  if (isNaN(validDate.getTime())) return 'Invalid Date';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(validDate);
};

/**
 * Truncate a string to a specified maximum length and append a trailing character if it exceeds the limit.
 *
 * @param {string} text - The string to be truncated.
 * @param {number} [maxLength=25] - The maximum length before truncating the string.
 * @param {string} [trailChar='...'] - The character(s) to append if the string is truncated.
 * @returns {string} The truncated string with the trailing character if necessary.
 */
const truncateWithTrail = (text: string, maxLength: number = 25, trailChar = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + trailChar;
};

/**
 * Default styles for icons, including width, height, opacity, and color.
 *
 * @type {IconStyles}
 */
const iconStyles: IconStyles = {
  width: 20,
  height: 20,
  opacity: 0.8,
  color: '#FFFFFF',
};

/**
 * Filter a text for swearing words based on Turkish and English swear words
 * from the swears.json file.
 *
 * @param {string} text - The text to check for swearing.
 * @param {string} locale - The language to check for (either 'tr' or 'en').
 * @returns {boolean} - Returns true if a swear word is found, otherwise false.
 */
const filterSwears = (text: string, locale: 'tr' | 'en'): boolean => {
  const localSwearWords = swears[locale];
  const localRegex = new RegExp(`\\b(${localSwearWords.join('|')})\\b`, 'i');

  if (locale === 'en') {
    return localRegex.test(text);
  }

  if (localRegex.test(text)) {
    return true;
  }

  const englishSwearWords = swears['en'];
  const englishRegex = new RegExp(`\\b(${englishSwearWords.join('|')})\\b`, 'i');

  return englishRegex.test(text);
};

/**
 * Converts the first character of a string to uppercase.
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} A new string with the first character capitalized.
 * If the input is an empty string, returns an empty string.
 *
 * @example
 * capitalize('hello'); // 'Hello'
 * capitalize('world'); // 'World'
 * capitalize('');      // ''
 */
const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Badge map that defines user levels and special roles.
 *
 * @type {Record<number, { title: string;icon?: React.ElementType }>}
 */
/**
 * Badge map that defines user levels and special roles.
 */
const BADGE_MAP = Object.freeze({
  0: { title: 'Admin', icon: Crown },
  [-1]: { title: 'Moderator', icon: Shield },
  [-2]: { title: 'Collaborator', icon: Megaphone },
  [-3]: { title: 'Verified', icon: CheckCircle },
  1: { title: 'Rookie', icon: User },
  2: { title: 'Bunny', icon: User },
  3: { title: 'Fan', icon: User },
  4: { title: 'Otaku', icon: Sparkles },
  5: { title: 'Veteran', icon: Sparkles },
  6: { title: 'Expert', icon: Sparkles },
  7: { title: 'Sensei', icon: Sparkles },
  8: { title: 'Yuusha', icon: Sparkles },
  9: { title: 'Sparkle', icon: Sparkles },
  10: { title: 'Shinigami', icon: Crown },
});

export type BadgeMap = typeof BADGE_MAP;

/**
 * Sorts an array of objects alphabetically by a specified key.
 *
 * @template T - The type of the objects in the array.
 * @template K - The key within the object used for sorting.
 * @param {T[]} items - The array of objects to be sorted.
 * @param {K} key - The key to sort by (its value should be a string or convertible to string).
 * @param {boolean} [isAscending=true] - Whether to sort in ascending (A–Z) order. Default is true.
 * @returns {T[]} A new array sorted alphabetically by the specified key.
 */
function sortAlphabetically<T, K extends keyof T>(
  items: T[],
  key: K,
  isAscending: boolean = true,
): T[] {
  return [...items].sort((a, b) => {
    const aVal = String(a[key]);
    const bVal = String(b[key]);
    return isAscending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });
}

/**
 * Sorts an array of objects based on a date-like value under a specified key.
 *
 * @template T - The type of the objects in the array.
 * @template K - The key within the object used for sorting (should be a date string or Date object).
 * @param {T[]} items - The array of objects to be sorted.
 * @param {K} key - The key to sort by (its value must be parsable by Date).
 * @param {boolean} [isAscending=true] - Whether to sort in ascending (oldest–newest) order. Default is true.
 * @returns {T[]} A new array sorted by date based on the specified key.
 */
function sortByDate<T, K extends keyof T>(items: T[], key: K, isAscending: boolean = true): T[] {
  return [...items].sort((a, b) => {
    const aDate = new Date(a[key] as unknown as string).getTime();
    const bDate = new Date(b[key] as unknown as string).getTime();
    return isAscending ? aDate - bDate : bDate - aDate;
  });
}

export {
  calculateAge,
  filter_followers,
  dateConverter,
  truncateWithTrail,
  iconStyles,
  filterSwears,
  BADGE_MAP,
  capitalize,
  sortAlphabetically,
  sortByDate,
};
