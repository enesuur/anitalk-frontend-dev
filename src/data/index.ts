import { faker } from '@faker-js/faker';

/**
 * Generate a mock list of talks.
 *
 * @param count - Number of talks to generate.
 * @returns An array of mock talks.
 */
export const generateMockTalks = (count: number) => {
  return Array.from({ length: count }, () => ({
    title: faker.lorem.sentence(),
    snippet: faker.lorem.paragraph(),
    date: faker.date.recent(),
    username: faker.person.fullName(),
    count: faker.number.int({ min: 0, max: 100 }),
    content: faker.lorem.paragraph(),
    downvote: faker.number.int({ min: 0, max: 20 }),
    upvote: faker.number.int({ min: 0, max: 40 }),
  }));
};

/**
 * Generates a list of mock blogs.
 *
 * @param {number} count - The number of mock blogs to generate.
 * @returns {Array} An array of mock blog objects.
 * Each blog will have the following properties:
 * - `_id`: A unique string ID.
 * - `title`: A random sentence as the blog title.
 * - `snippet`: A random paragraph as the blog snippet.
 * - `date`: A random date in the past.
 * - `img_url`: A URL to a random image.
 * - `author`: A random full name of the blog author.
 * - `slug`: A URL-friendly string slug for the blog.
 */
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
 * Generates a list of mock comments.
 *
 * @param {number} count - The number of mock comments to generate.
 * @returns {Array} An array of mock comment objects.
 * Each comment will have the following properties:
 * - `_id`: A unique string ID.
 * - `text`: A random string of sentences for the comment content.
 * - `date`: A random date in the past.
 * - `username`: A random full name of the user who posted the comment.
 * - `avatar_url`: A URL to a random avatar image.
 * - `upvote`: A random integer representing the number of upvotes (0-100).
 * - `downvote`: A random integer representing the number of downvotes (0-20).
 */
export const generateMockComments = (count: number) => {
  return Array.from({ length: count }, () => ({
    _id: faker.string.uuid(),
    text: faker.lorem.sentences({ min: 1, max: 3 }),
    date: faker.date.recent(),
    username: faker.person.fullName(),
    avatar_url: faker.image.avatar(),
    upvote: faker.number.int({ min: 0, max: 100 }),
    downvote: faker.number.int({ min: 0, max: 20 }),
  }));
};
