import axios from "axios";
import { useState } from "react";

export default function SearchBar({ filterDogs }) {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    axios
      .get(`http://localhost:3001/dogs/?name=${inputValue}`)
      .then((response) => {
        filterDogs(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Buscar raza de perro por nombre"
      />
      <button onClick={handleSearch}>BUSCAR</button>
    </div>
  );
}
