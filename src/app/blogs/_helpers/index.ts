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