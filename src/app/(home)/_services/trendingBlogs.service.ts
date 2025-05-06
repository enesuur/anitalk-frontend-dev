import { remoteInstance } from '@/http/axios';

const fetchBlogs = async (pageParam: number, pageSize: number) => {
  const start = pageParam * pageSize;
  const blogs = Array.from({ length: pageSize }).map((_, index) => ({
    _id: `blog-${start + index}`,
    title: `Blog Title ${start + index + 1}`,
    img_url: `https://via.placeholder.com/400x200?text=Blog+${start + index + 1}`,
    comments: Array.from({ length: Math.floor(Math.random() * 50) }),
    snippet: 'This is a snippet of the blog post...',
    read_time: 5,
    date: '22-04-2032',
    author: 'Author Name',
    label: { title: 'Trending', color: 'blue' },
    slug: `blog-${start + index + 1}`,
  }));

  return new Promise<{ items: typeof blogs; nextOffset: number }>((resolve) =>
    setTimeout(() => resolve({ items: blogs, nextOffset: start + pageSize }), 1000),
  );
};

export { fetchBlogs };
