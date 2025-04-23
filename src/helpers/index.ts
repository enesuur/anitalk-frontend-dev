import { PartialUser } from '@/types/user';
import { IconStyles } from '@/types/global';

/**
 * Calculate the age based on the provided birthdate.
 *
 * @param {Date} birthDate - The birthdate of the user.
 * @returns {number} The age calculated based on the current date.
 * If the birth date is in the future, it returns 0.
 */
export const calculateAge = (birthDate: Date): number => {
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
 * @param {PartialUser[]} my_followers - The list of users that the current user is following.
 * @param {PartialUser[]} other_followers - The list of other users to check against.
 * @returns {(PartialUser & { is_following: boolean })[]} A new array of users with an additional `is_following` property
 * indicating whether the current user is following them.
 */
export const filter_followers = (
  my_followers: PartialUser[],
  other_followers: PartialUser[],
): (PartialUser & { is_following: boolean })[] => {
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
export const dateConverter = (date?: string | Date) => {
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
export const truncateWithTrail = (
  text: string,
  maxLength: number = 25,
  trailChar = '...',
): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + trailChar;
};

/**
 * Default styles for icons, including width, height, opacity, and color.
 *
 * @type {IconStyles}
 */
export const iconStyles: IconStyles = {
  width: 20,
  height: 20,
  opacity: 0.8,
  color: '#FFFFFF',
};
