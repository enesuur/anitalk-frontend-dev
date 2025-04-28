'use client';
import React, { useState, useCallback } from 'react';
import BlogCard from '../blogs/_components/card/BlogCard';
import Button from '@/shared/ui/button/Button';
import Pagination from '@/components/pagination/Pagination';
import { generateMockBlogs } from '@/data';
import styles from './_styles/Page.module.css';
import InpSearch from '@/shared/ui/input/search/InpSearch';
import useDebounce from '@/hooks/useDebounce';
import { H1, H2, H3 } from '@/shared/ui/headings';
import { Funnel } from 'lucide-react';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import { CATEGORIES } from '@/helpers/constants';
import { iconStyles } from '@/helpers';
import Select from '@/shared/ui/input/select/Select';
import { FunnelX } from 'lucide-react';

const fakeBlogs = generateMockBlogs(50);

const Page = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categorySearchTerm, setCategorySearchTerm] = useState<string>(''); // Separate state for category search
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedCategorySearchTerm = useDebounce(categorySearchTerm, 500); // Debounced value for category search
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season);
  };

  const handleQueryChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryQueryChange = useCallback((value: string) => {
    setCategorySearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleCategoryChange = useCallback((categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  }, []);

  const filteredBlogs = fakeBlogs.filter((blog) => {
    const matchesSearchTerm = blog.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesCategorySearchTerm =
      categorySearchTerm === '' ||
      blog.category.toLowerCase().includes(debouncedCategorySearchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(blog.categoryId);
    return matchesSearchTerm && matchesCategorySearchTerm && matchesCategory;
  });

  const blogsPerPage = 10;
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage,
  );

  return (
    <section>
      <div className='container'>
        <div className={styles.heroBox}>
          <H1>Filter blogs</H1>
          <InpSearch
            placeholder='Search blogs by title...'
            value={searchTerm}
            onChange={handleQueryChange}
          />
        </div>

        <div className={styles.pageBox}>
          <aside className={styles.filterBox}>
            <div className={styles.verticalBox}>
              <div className={styles.titleBox}>
                <Funnel />
                <p>Search by Category</p>
              </div>
              <InpSearch
                placeholder='Search by category...'
                value={categorySearchTerm}
                onChange={handleCategoryQueryChange}
              />
            </div>
            <div className={styles.checkboxContainer}>
              {CATEGORIES.map((category) => (
                <Checkbox
                  key={category.id}
                  label={category.label}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                />
              ))}
            </div>

            <div className={styles.seasonBox}>
              <Select
                name='season'
                label='Season'
                value={selectedSeason}
                onChange={handleSeasonChange}
                options={[
                  { label: 'Select a season', value: 'Select a season' },
                  ...['Summer', 'Winter', 'Fall', 'Spring'].map((season) => ({
                    label: season,
                    value: season.toLowerCase(),
                  })),
                ]}
              />
            </div>
            <Button text='Reset filters' icon={<FunnelX {...iconStyles} />} />
          </aside>

          <div className={styles.verticalBox}>
            <div className={styles.blogsBox}>
              {paginatedBlogs.length > 0 ? (
                paginatedBlogs.map((item, idx) => <BlogCard key={idx} {...item} />)
              ) : (
                <p>No blogs found.</p>
              )}
            </div>
            <Pagination
              totalPages={Math.ceil(filteredBlogs.length / blogsPerPage)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
