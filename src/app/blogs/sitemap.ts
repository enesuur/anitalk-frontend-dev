import { MetadataRoute } from 'next';
import CONFIG from '@/config/index';

const TOTAL_BLOGS = 123456;
const SEGMENT_SIZE = 50000;

export async function generateSitemaps() {
  const SEGMENTS = Math.ceil(TOTAL_BLOGS / SEGMENT_SIZE);
  return Array.from({ length: SEGMENTS }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const start = id * SEGMENT_SIZE;
  const end = Math.min(start + SEGMENT_SIZE, TOTAL_BLOGS);

  const blogs = getMockBlogs(start, end);

  return blogs.map((blog) => ({
    url: `${CONFIG.BASE_URL}/blogs/${blog.slug}`,
    lastModified: blog.date,
  }));
}

function getMockBlogs(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => {
    const index = start + i;
    return {
      slug: `mock-blog-${index}`,
      date: new Date(Date.now() - index * 86400000).toISOString(),
    };
  });
}
