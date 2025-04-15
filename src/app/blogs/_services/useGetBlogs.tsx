import { useEffect, useState, useMemo } from 'react';
import { faker } from '@faker-js/faker';

type Blog = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
};

const TOTAL_BLOGS = 100;

// Tüm blogları bir kere oluştur
const generateAllBlogs = (): Blog[] => {
  return Array.from({ length: TOTAL_BLOGS }, (_, index) => ({
    id: index + 1,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    author: faker.person.fullName(),
    createdAt: faker.date.past(),
  }));
};

const allBlogs = generateAllBlogs();

const useGetBlogs = (page: number, limit: number) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(TOTAL_BLOGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // "Server-side" fetch simülasyonu
    const timer = setTimeout(() => {
      const startIndex = (page - 1) * limit;
      const paginatedBlogs = allBlogs.slice(startIndex, startIndex + limit);

      setBlogs(paginatedBlogs);
      setLoading(false);
    }, 500); // isteğe bağlı gecikme simülasyonu

    return () => clearTimeout(timer);
  }, [page, limit]);

  return { blogs, total, loading };
};

export default useGetBlogs;