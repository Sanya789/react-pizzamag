import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

export const Pagination = () => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      // onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      // pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
