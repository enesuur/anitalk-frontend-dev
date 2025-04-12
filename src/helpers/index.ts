import { PartialUser } from "@/types/user";

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


export const filter_followers = (
  my_followers: PartialUser[],
  other_followers: PartialUser[]
): (PartialUser & { is_following: boolean })[] => {
  const my_followers_set = new Set(my_followers.map((follower) => follower._id));

  return other_followers.map((user) => ({
    ...user,
    is_following: my_followers_set.has(user._id),
  }));
};

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
 * Truncate a string and add a trailing character if it exceeds max length
 *
 * @param text - The input string
 * @param maxLength - The maximum length before truncating
 * @param trailChar - The character(s) to append (default: '...')
 * @returns Truncated string with trailing character if needed
 */
export const truncateWithTrail = (text: string, maxLength: number = 25, trailChar = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + trailChar;
};

