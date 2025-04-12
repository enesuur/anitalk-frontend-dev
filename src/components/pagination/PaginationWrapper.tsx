'use client';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/pagination/Pagination';
import React from 'react';

interface IProps {
  currentPage: number;
  totalPages: number;
}

const PaginationWrapper = ({ currentPage, totalPages }: IProps) => {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
  );
};

export default React.memo(PaginationWrapper);
