import React, { useState } from 'react';
import { ArrowDown01, ArrowUp01, CalendarArrowDown, CalendarArrowUp } from 'lucide-react';
import styles from './Sort.module.css';

const Sort: React.FC = () => {
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc'>('asc');
  const [sortByNumber, setSortByNumber] = useState<'asc' | 'desc'>('asc');

  const handleDateSort = () => {
    setSortByDate((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleNumberSort = () => {
    setSortByNumber((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className={styles.sortBox}>
      <div className={styles.sortOption} onClick={handleDateSort}>
        <span>Date</span>
        {sortByDate === 'asc' ? <CalendarArrowDown size={18} /> : <CalendarArrowUp size={18} />}
      </div>
      <div className={styles.sortOption} onClick={handleNumberSort}>
        <span>Number</span>
        {sortByNumber === 'asc' ? <ArrowDown01 size={18} /> : <ArrowUp01 size={18} />}
      </div>
    </div>
  );
};

export default Sort;
