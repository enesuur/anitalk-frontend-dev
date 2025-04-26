'use client';
import React, { useCallback } from 'react';
import styles from './Pagination.module.css';
import SelectInput from '@/shared/ui/input/select/Select';
import Button from '@/shared/ui/button/Button';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  style?: React.CSSProperties;
  containerClassName?: string;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  containerClassName,
}: IPaginationProps) => {
  const handlePageChange = useCallback(
    (action: 'first' | 'prev' | 'next' | 'last' | 'select', value?: number) => {
      switch (action) {
        case 'first':
          onPageChange(1);
          break;
        case 'prev':
          onPageChange(Math.max(currentPage - 1, 1));
          break;
        case 'next':
          onPageChange(Math.min(currentPage + 1, totalPages));
          break;
        case 'last':
          onPageChange(totalPages);
          break;
        case 'select':
          if (value) {
            onPageChange(value);
          }
          break;
        default:
          break;
      }
    },
    [currentPage, totalPages, onPageChange],
  );

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`${styles.pagination} ${containerClassName || ''}`}>
      <Button
        onClick={() => handlePageChange('first')}
        isDisabled={currentPage === 1}
        text={'<<'}
      />
      <Button onClick={() => handlePageChange('prev')} isDisabled={currentPage === 1} text={'<'} />
      <SelectInput
        name='pagination'
        value={currentPage.toString()}
        onChange={(e) => handlePageChange('select', Number(e.target.value))}
        options={pages.map((p) => ({
          label: `${p}`,
          value: p.toString(),
        }))}
      />
      <div className={styles.pageLocator}>
        <span style={{ opacity: 1 }}>{currentPage}</span>
        <span style={{ opacity: 0.5 }}> / {totalPages}</span>
      </div>
      <Button
        onClick={() => handlePageChange('next')}
        isDisabled={currentPage === totalPages}
        text={'>'}
      />
      <Button
        onClick={() => handlePageChange('last')}
        isDisabled={currentPage === totalPages}
        text={'>>'}
      />
    </div>
  );
};

export default React.memo(Pagination);
