'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import clsx from '@/lib/cn';
import { IBlog } from '@/types/global';
import Image from 'next/image';
import { H3 } from '@/shared/ui/headings';
import { truncateWithTrail } from '@/helpers';
import { PLACE_HOLDERS } from '@/helpers/constants';
import { Chat } from '@/assets/icons/index';
import NotFound from '@/shared/ui/not-found/NotFound';
import styles from './styles.module.css';

const PAGE_SIZE = 10;

// Mock data fetcher
const fetchBlogs = async (pageParam: number, pageSize: number) => {
  const start = pageParam * pageSize;
  const blogs = Array.from({ length: pageSize }).map((_, index) => ({
    _id: `blog-${start + index}`,
    title: `Blog Title ${start + index + 1}`,
    img_url: `https://via.placeholder.com/400x200?text=Blog+${start + index + 1}`,
    comments: Array.from({ length: Math.floor(Math.random() * 50) }),
    snippet: 'This is a snippet of the blog post...',
    read_time: 5,
    date: '22-04-2032', // String date format for server-side
    author: 'Author Name',
    label: { title: 'Trending', color: 'blue' },
    slug: `blog-${start + index + 1}`,
  }));

  return new Promise<{ items: typeof blogs; nextOffset: number }>((resolve) =>
    setTimeout(() => resolve({ items: blogs, nextOffset: start + pageSize }), 1000),
  );
};

interface ITrendingBlogCardProps {
  blog: Partial<IBlog>;
}

const TrendingBlogCard: React.FC<ITrendingBlogCardProps> = ({ blog }: ITrendingBlogCardProps) => {
  return (
    <div className={clsx(styles.cardBox)}>
      <figure>
        <picture>
          <Image
            alt={blog?.title || 'Awesome image'}
            src={blog.img_url || PLACE_HOLDERS.background_cover_url}
            fill={true}
          />
        </picture>
      </figure>

      <article>
        {/* <H3>{truncateWithTrail(blog.title || 'Awesome title', 50)}</H3> */}
        <p>
          {/* <Chat /> */}
          {/* <span>{blog.comments?.length || 0}</span> */}
        </p>
      </article>
    </div>
  );
};

interface ITrendingBlogs {
  trending_blogs: Partial<IBlog>;
}

const TrendingBlogs: React.FC<ITrendingBlogs> = ({ trending_blogs }: ITrendingBlogs) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [blogsWithDates, setBlogsWithDates] = useState<Partial<IBlog>[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data?.pages) {
      const updatedBlogs = data.pages.flatMap((page) =>
        page.items.map((blog) => ({
          ...blog,
          date: new Date(blog.date), // Convert the date string to Date object after mounting
        })),
      );
      setBlogsWithDates(updatedBlogs);
    }
  }, [data]);

  const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['trending_blogs'],
      queryFn: ({ pageParam = 0 }) => fetchBlogs(pageParam, PAGE_SIZE),
      getNextPageParam: (lastPage) => {
        return lastPage.items.length < PAGE_SIZE ? undefined : lastPage.nextOffset;
      },
      initialPageParam: 0,
    });

  const items = blogsWithDates || [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? items.length + 1 : items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (!virtualItems.length) return;

    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem.index === items.length && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, items.length, rowVirtualizer, fetchNextPage]);

  if (!mounted) return null;
  return (
    <aside ref={parentRef} className={styles.trendingBlogsBox}>
      {items.length === 0 ? (
        <NotFound />
      ) : (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
            width: '100%',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index === items.length;
            const style = {
              position: 'absolute' as const,
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            };

            return (
              <div key={virtualRow.key} style={style}>
                {isLoaderRow ? (
                  isFetchingNextPage ? (
                    <div className={styles.loader}>Loading more...</div>
                  ) : (
                    <div className={styles.loader}>No more blogs</div>
                  )
                ) : (
                  <TrendingBlogCard blog={items[virtualRow.index]} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default TrendingBlogs;
