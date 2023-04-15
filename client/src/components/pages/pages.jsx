import styles from "./pages.module.css";

export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.page}>
      {pageNumbers.map((number) => (
        <p key={number}>
          <button
            className={`page-link ${number === currentPage ? "active" : ""}`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        </p>
      ))}
    </nav>
  );
}
