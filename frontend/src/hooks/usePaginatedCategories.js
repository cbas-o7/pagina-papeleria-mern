import { useState } from "react";

// Custom hook para manejar la paginación de categorías
export const usePaginatedCategories = (categories, itemsPerPage = 6) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice de inicio y fin para la paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedCategories = categories.slice(startIndex, endIndex);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const goToNextPage = () => {
    if (hasNextPage) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) setCurrentPage(currentPage - 1);
  };

  return {
    paginatedCategories,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
  };
};