import styles from "./filterDogs.module.css";

export default function FilterDogs({ filterData }) {
  const handleAll = () => {
    filterData("all");
  };
  const handleApi = () => {
    filterData("api");
  };
  const handleDb = () => {
    filterData("db");
  };
  return (
    <div>
      <button className={styles.button} onClick={handleAll}>
        ALL
      </button>
      <button className={styles.button} onClick={handleApi}>
        API
      </button>
      <button className={styles.button} onClick={handleDb}>
        DB
      </button>
    </div>
  );
}
