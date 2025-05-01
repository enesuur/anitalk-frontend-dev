'use client';
import React, { useCallback, useState } from 'react';
import { ArrowDown01, ArrowUp01, CalendarArrowDown, CalendarArrowUp } from 'lucide-react';
import styles from './styles.module.css';

const Sort: React.FC = () => {
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc'>('asc');
  const [sortByNumber, setSortByNumber] = useState<'asc' | 'desc'>('asc');

  const handleDateSort = useCallback(() => {
    setSortByDate((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleNumberSort = useCallback(() => {
    setSortByNumber((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  return (
    <div className={styles.sortBox}>
      <div className={styles.filterTitle}>Filter</div>
      <div className={styles.optionsWrapper}>
        <div
          role='button'
          aria-label={`Sort by date, currently ${
            sortByDate === 'asc' ? 'ascending' : 'descending'
          }`}
          aria-pressed={sortByDate === 'asc'}
          className={styles.optionBox}
          onClick={handleDateSort}
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleDateSort()} // Handle Enter key
        >
          {sortByDate === 'asc' ? <CalendarArrowDown /> : <CalendarArrowUp />}
          <span>Date</span>
        </div>
        <div
          role='button'
          aria-label={`Sort by number, currently ${
            sortByNumber === 'asc' ? 'ascending' : 'descending'
          }`}
          aria-pressed={sortByNumber === 'asc'}
          className={styles.optionBox}
          onClick={handleNumberSort}
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleNumberSort()} // Handle Enter key
        >
          {sortByNumber === 'asc' ? <ArrowDown01 /> : <ArrowUp01 />}
          <span>Number</span>
        </div>
      </div>
    </div>
  );
};

export default Sort;
