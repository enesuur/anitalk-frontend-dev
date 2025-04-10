import { faker } from '@faker-js/faker';

export const generateMockBlogs = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    _id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    snippet: faker.lorem.paragraph(),
    date: faker.date.recent(),
    img_url: faker.image.urlPicsumPhotos({ width: 800, height: 500 }),
    author: faker.person.fullName(),
    slug: `/blog/${faker.lorem.slug()}`,
  }));
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
