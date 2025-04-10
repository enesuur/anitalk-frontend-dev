import React from 'react';
import styles from './_styles/Page.module.css';
import { generateMockBlogs } from './_helpers/index';
import BlogCard from './_components/card/BlogCard';

export const revalidate = 1;

const mockBlogs = generateMockBlogs(6);

const Page = () => {
  return (
    <section>
      <div className={`${styles.heroSection} container`}>
        <h1 className='h-1'>Blogs</h1>
        <div className={styles.gridContainer}>
          {mockBlogs.map((blog) => (
            <BlogCard key={blog._id} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
