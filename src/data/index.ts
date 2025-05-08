import { faker } from '@faker-js/faker';
import { IMiniTalk, ITalk } from '@/types/global';
import { CATEGORY_COLORS } from '@/shared/ui/blog-label/BlogLabel';

/**
 * Generates a random pastel color from a predefined set of pastel colors.
 *
 * A pastel color is a light, soft color, often used for aesthetic or calming designs.
 * The function randomly selects a color from an array of pastel colors.
 *
 * @returns {string} A hex code representing a random pastel color.
 */
const getPastelColor = () => {
  const pastelColors = [
    '#FFB3BA',
    '#FFDFBA',
    '#FFFFBA',
    '#BAFFC9',
    '#BAE1FF',
    '#FFB3FF',
    '#FFD1DC',
    '#C7FFEB',
    '#D3B8AE',
    '#E6C9D1',
  ];
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

/**
 * Returns a random category with its corresponding color from CATEGORY_COLORS.
 */
export const getRandomCategory = () => {
  const titles = Object.keys(CATEGORY_COLORS) as (keyof typeof CATEGORY_COLORS)[];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  return {
    title: randomTitle,
    color: CATEGORY_COLORS[randomTitle],
  };
};

/**
 * Generate a mock list of talks.
 *
 * @param count - Number of talks to generate.
 * @returns An array of mock talks.
 */
export const generateMockTalks = (count: number) => {
  return Array.from({ length: count }, () => ({
    _id: faker.string.uuid(),
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
 * Generates a list of mock blog entries with associated comments.
 *
 * @param {number} count - Number of blog objects to generate.
 * @returns {Array<Object>} An array of mock blog objects, each with:
 * - `_id` (string): Unique blog ID.
 * - `title` (string): Blog title.
 * - `snippet` (string): Short excerpt from the blog content.
 * - `read_time` (number): Estimated time (in minutes) to read the blog.
 * - `date` (Date): Random recent publication date.
 * - `img_url` (string): Blog cover image URL.
 * - `author` (string): Author's full name.
 * - `slug` (string): URL-friendly slug for the blog.
 * - `label` (Object): Blog label info.
 *    - `title` (string): Capitalized noun used as label name.
 *    - `color` (string): Random pastel color string.
 * - `comments` (Array<Object>): List of comments for the blog.
 *    - Each comment object includes:
 *      - `_id` (string): Unique comment ID.
 *      - `text` (string): Comment content (random sentences).
 *      - `date` (Date): Random date for the comment.
 *      - `username` (string): Username of the commenter.
 *      - `avatar_url` (string): URL to the commenter's avatar image.
 *      - `upvote` (number): Number of upvotes for the comment (0-100).
 *      - `downvote` (number): Number of downvotes for the comment (0-20).
 */
export const generateMockBlogs = (count: number) => {
  return Array.from({ length: count }, () => ({
    _id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    snippet: faker.lorem.paragraph(),
    read_time: faker.number.int({ min: 1, max: 10 }),
    date: faker.date.recent(),
    img_url: faker.image.urlPicsumPhotos({ width: 800, height: 500 }),
    author: faker.person.fullName(),
    slug: `/blog/${faker.lorem.slug()}`,
    label: {
      title: faker.word.noun().charAt(0).toUpperCase() + faker.word.noun().slice(1),
      color: getPastelColor(),
    },
    comments: generateMockComments(faker.number.int({ min: 1, max: 5 })), // Add random comments
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

/**
 * Generates an array of mock mini talk entries.
 *
 * @param {number} count - The number of entries to generate.
 * @returns {IMiniTalk[]} An array of mock talk data.
 */
export const generateMiniTalk = (count: number): IMiniTalk[] => {
  return Array.from({ length: count }, () => ({
    _id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 7 }),
    slug: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()),
    comment_count: faker.number.int({ min: 0, max: 300 }),
  }));
};

/**
 * Generates an array of mock talk entries.
 *
 * @param {number} count - The number of entries to generate.
 * @returns {ITalk[]} An array of mock talk data.
 */
export const generateTalk = (count: number): ITalk[] => {
  return Array.from({ length: count }, () => ({
    _id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 7 }),
    snippet: faker.lorem.paragraph(),
    date: faker.date.past(),
    username: faker.person.fullName(),
    upvote: faker.number.int({ min: 0, max: 100 }),
    downvote: faker.number.int({ min: 0, max: 20 }),
    content: faker.lorem.paragraphs(),
  }));
};
