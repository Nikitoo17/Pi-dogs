import { useState } from "react";
import styles from "./filterTemperaments.module.css";

export default function FilterTemperaments({ filterTemps }) {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    filterTemps(inputValue);
    setInputValue("");
  };
  const handleRefresh = () => {
    filterTemps("");
  };

  return (
    <div>
      <input
        className={styles.input}
        id="temp"
        type="text"
        name="temperament"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Buscar raza de perro por temperamento"
      />
      <button className={styles.button} onClick={handleSearch}>
        BUSCAR
      </button>
      <button className={styles.button} onClick={handleRefresh}>
        LIMPIAR
      </button>
    </div>
  );
}
