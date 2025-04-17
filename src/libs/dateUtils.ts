import { formatDistanceToNow } from 'date-fns';

/**
 * Formats a given date as a human-readable relative time string
 * (e.g., "3 days ago", "in 2 hours").
 *
 * @param date - The date to format. Can be a Date object, timestamp, or ISO string.
 * @returns A relative time string with suffix (e.g., "5 minutes ago", "in 1 day").
 */
export function formatRelativeDate(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
