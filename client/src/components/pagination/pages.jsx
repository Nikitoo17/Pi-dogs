import styles from "./pages.module.css";

export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let startPage = 1;
  let endPage = 4;

  if (currentPage > 2) {
    startPage = currentPage - 1;
    endPage = currentPage + 2;
  }

  if (endPage > totalPages - 1) {
    startPage = totalPages - 2;
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.page}>
      <p>
        <button
          className="page-link"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
      </p>
      {pageNumbers.map((number) => (
        <p key={number}>
          <button className={styles.button} onClick={() => paginate(number)}>
            {number}
          </button>
        </p>
      ))}
      <p>
        <button
          className="page-link"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        >
          Next
        </button>
      </p>
    </nav>
  );
}
