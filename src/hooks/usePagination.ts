import { useState } from "react";

interface UsePaginationResult<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  setCurrentPage: (page: number) => void;
}

const usePagination = <T>(
  items: T[],
  itemsPerPage: number
): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setCurrentPage,
  };
};

export default usePagination;
