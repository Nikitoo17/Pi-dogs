import { useState } from "react";

export default function FilterTemperaments({ filterTemps }) {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    filterTemps(inputValue);
  };
  const handleRefresh = () => {
    filterTemps("");
  };

  return (
    <div>
      <input
        type="text"
        name="temperament"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Buscar raza de perro por temperamento"
      />
      <button onClick={handleSearch}>BUSCAR</button>
      <button onClick={handleRefresh}>LIMPIAR</button>
    </div>
  );
}
