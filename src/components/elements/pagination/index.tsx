"use client";

import React from "react";
import { PaginationProps } from "@/types/interface";

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisiblePages = 3;
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 mx-1 border rounded-md ${
              currentPage === i
                ? "bg-line-50 text-white"
                : "bg-white text-black"
            }`}>
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-3 py-1 mx-1 border rounded-md ${
            currentPage === 1 ? "bg-line-50 text-white" : "bg-white text-black"
          }`}>
          1
        </button>
      );

      if (currentPage > maxVisiblePages) {
        pages.push(
          <span key="start-ellipsis" className="mx-1">
            ...
          </span>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 mx-1 border rounded-md ${
              currentPage === i
                ? "bg-black-80 text-white"
                : "bg-white text-black"
            }`}>
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - (maxVisiblePages - 1)) {
        pages.push(
          <span key="end-ellipsis" className="mx-1">
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 mx-1 border rounded-md ${
            currentPage === totalPages
              ? "bg-black-80 text-white"
              : "bg-white text-black"
          }`}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md bg-white text-black disabled:opacity-50">
        &lt;
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md bg-white text-black disabled:opacity-50">
        &gt;
      </button>
    </div>
  );
};

export default PaginationComponent;
