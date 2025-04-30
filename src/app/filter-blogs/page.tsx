'use client';
import React, { useState, useCallback } from 'react';
import BlogCard from '../blogs/_components/card/BlogCard';
import Button from '@/shared/ui/button/Button';
import Pagination from '@/components/pagination/Pagination';
import { generateMockBlogs } from '@/data';
import styles from './_styles/Page.module.css';
import InpSearch from '@/shared/ui/input/search/InpSearch';
import useDebounce from '@/hooks/useDebounce';
import { H1 } from '@/shared/ui/headings';
import { Funnel, Timer, FunnelX } from 'lucide-react';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import { CATEGORIES } from '@/helpers/constants';
import { iconStyles } from '@/helpers';
import Select from '@/shared/ui/input/select/Select';
import NotFoundComponent from '@/shared/ui/not-found/NotFound';
import BreadCrumb from '@/shared/ui/breadcrumb/BreadCrumb';
import SliderInput from '@/shared/ui/input/slider/InpSlider';
import Swiper from '@/shared/ui/swiper/Swiper';

const fakeBlogs = generateMockBlogs(50);

const Page = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categorySearchTerm, setCategorySearchTerm] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [readTime, setReadTime] = useState<number>(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedCategorySearchTerm = useDebounce(categorySearchTerm, 500);

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
    const matchesSearchTerm =
      blog.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      blog.snippet.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(blog.categoryId);

    return matchesSearchTerm && matchesCategory;
  });

  const blogsPerPage = 10;
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage,
  );

  const filteredCategories = CATEGORIES.filter((category) =>
    category.label?.toLowerCase().includes(debouncedCategorySearchTerm.toLowerCase()),
  );

  return (
    <React.Fragment>
      {/* --- Hero Section --- */}
      <section>
        <div className='container'>
          <H1>
            <span className={styles.highlightText}>Latest </span>
            blogs
          </H1>
          <Swiper />
        </div>
      </section>

      {/* --- Main Section of filtering --- */}
      <section>
        <div className='container'>
          <H1>Filter Blogs</H1>
          <BreadCrumb />
          <div className={styles.heroBox}></div>

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
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <Checkbox
                      key={category.id}
                      label={category.label}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                  ))
                ) : (
                  <p style={{ color: '#999', fontSize: '0.875rem' }}>
                    No matching categories found.
                  </p>
                )}
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

              <SliderInput
                min={0}
                max={100}
                label='Read time'
                step={1}
                value={readTime}
                icon={<Timer width={16} height={16} opacity={1} color={'#FFFFFF'} />}
                onChange={(val) => setReadTime(val)}
              />

              <Button
                text='Reset filters'
                icon={<FunnelX {...iconStyles} />}
                onClick={() => {
                  setSearchTerm('');
                  setCategorySearchTerm('');
                  setSelectedCategories([]);
                  setSelectedSeason('');
                  setReadTime(1);
                  setCurrentPage(1);
                }}
              />
            </aside>

            <div className={styles.verticalBox}>
              <InpSearch
                placeholder='Search blogs by title or snippet...'
                value={searchTerm}
                onChange={handleQueryChange}
                containerClassName={styles.searchBlogBox}
              />
              <div className={`${paginatedBlogs.length > 0 ? styles.blogsBox : styles.notfound}`}>
                {paginatedBlogs.length > 0 ? (
                  paginatedBlogs.map((item, idx) => <BlogCard key={idx} {...item} />)
                ) : (
                  <NotFoundComponent text={'Blogs'} />
                )}
              </div>

              {paginatedBlogs.length > 0 && (
                <Pagination
                  totalPages={Math.ceil(filteredBlogs.length / blogsPerPage)}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Page;
