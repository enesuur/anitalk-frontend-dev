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

export const generateMockComments = (count: number) => {
  return Array.from({ length: count }, () => ({
    _id: faker.string.uuid(),
    text: faker.lorem.sentences({ min: 1, max: 3 }),
    date: faker.date.recent(),
    username: faker.person.fullName(),
    avatar_url: faker.image.avatar(),
    upVote: faker.number.int({ min: 0, max: 100 }),
    downVote: faker.number.int({ min: 0, max: 20 }),
  }));
};
