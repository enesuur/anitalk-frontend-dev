import BlogCard from './_components/card/BlogCard';
import { Blog as BlogIcon } from '@/assets/icons/index';
import Scroller from '@/shared/ui/scroller/Scroller';
import PaginationWrapper from '@/components/pagination/PaginationWrapper';
import Carousel from '@/components/carousel/Carousel';
import { H1 } from '@/shared/ui/headings';
import { getBlogsByPage } from '@/lib/fakeBlog';
import clsx from '@/lib/cn';
import { Filter } from 'lucide-react';
import React from 'react';
import { iconStyles } from '@/helpers';
import Link from 'next/link';
import styles from './_styles/Page.module.css';

type Props = {
  searchParams: { page?: string };
};

const BlogsPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 10;

  const { blogs, total } = getBlogsByPage(page, limit);
  const totalPages = Math.ceil(total / limit);
  const slides = Array.from({ length: 10 }, (_, i) => (
    <div
      key={i}
      style={{
        width: '100vw',
        height: '576px',
      }}
    >
      Slide {i + 1}
    </div>
  ));

  // TODO: Infinite scroll
  return (
    <React.Fragment>
      <Carousel slides={slides} />
      <section>
        <div className={clsx(styles.heroSection, 'container')}>
          <H1 className={styles.heroHeader}>
            <BlogIcon />
            Blogs
          </H1>
          <Link className={styles.btnFilter} href={'filter-blogs'}>
            <Filter {...iconStyles} />
            Filter Blogs
          </Link>
          <div className={styles.gridContainer}>
            {blogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))}
          </div>
        </div>
      </section>

      <PaginationWrapper currentPage={page} totalPages={totalPages} />
      <Scroller />
    </React.Fragment>
  );
};

export default BlogsPage;
