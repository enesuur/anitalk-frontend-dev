import { faker } from '@faker-js/faker';

export interface IBlogCardProps {
  _id: string;
  title: string;
  snippet: string;
  date: Date;
  img_url: string;
  author: string;
  slug?: string;
}

const TOTAL_BLOGS = 100;

const allBlogs: IBlogCardProps[] = Array.from({ length: TOTAL_BLOGS }, (_, index) => {
  const title = faker.lorem.sentence();
  const content = faker.lorem.paragraphs(2);
  return {
    _id: (index + 1).toString(),
    title,
    snippet: content.slice(0, 150) + '...',
    date: faker.date.past(),
    img_url: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
    author: faker.name.fullName(),
    slug: faker.helpers.slugify(title).toLowerCase(),
  };
});

export function getBlogsByPage(page: number, limit: number) {
  const start = (page - 1) * limit;
  const end = start + limit;
  const blogs = allBlogs.slice(start, end);
  return {
    blogs,
    total: TOTAL_BLOGS,
  };
}
