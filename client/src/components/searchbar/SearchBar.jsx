import axios from "axios";
import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ filterDogs }) {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    axios
      .get(`dogs/?name=${inputValue}`)
      .then((response) => {
        filterDogs(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <input
        className={styles.input}
        type="text"
        name="name"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyUp={handleSearch}
        placeholder="Buscar raza de perro por nombre"
      />
    </div>
  );
}
