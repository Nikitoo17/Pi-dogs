import styles from "./form.module.css";
import axios from "axios";

export default function Form({ temperaments }) {
  const crearRaza = () => {
    let name = document.getElementById("nombre").value;
    let heightMin = document.getElementById("altura-min").value;
    let heightMax = document.getElementById("altura-max").value;
    let weightMin = document.getElementById("peso-min").value;
    let weightMax = document.getElementById("peso-max").value;
    let life_span = document.getElementById("vida").value;
    let temperaments = document.getElementById("temperamentos").selectedOptions;
    if (/\d/.test(name)) {
      alert("El nombre de la raza no puede contener números.");
      return;
    }

    if (parseInt(heightMin) > parseInt(heightMax)) {
      alert("La altura mínima no puede ser mayor que la altura máxima.");
      return;
    }

    if (parseInt(weightMin) > parseInt(weightMax)) {
      alert("El peso mínimo no puede ser mayor que el peso máximo.");
      return;
    }

    const body = {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      temperaments: Array.from(temperaments).map((option) => option.value),
    };

    return body;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = crearRaza();
      await axios.post(`http://localhost:3001/dogs`, body);
      console.log(body);
      alert("Raza agregada exitosamente!");
    } catch (error) {
      console.error(error);
      alert("Error al agregar la raza.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre: </label>
      <input type="text" name="name" id="nombre" />
      <br />
      <label>Altura: </label>

      <input type="number" name="heightMin" id="altura-min" />
      <input type="text" name="heightMax" id="altura-max" />
      <br />
      <label>Peso: </label>
      <input type="text" name="weightMin" id="peso-min" />
      <input type="text" name="weightMax" id="peso-max" />
      <br />
      <label>Años de vida: </label>
      <input type="text" name="lfe_span" id="vida" />
      <br />
      <label>Temperamentos </label>
      <br />
      <select
        className={styles.select}
        name="temperaments"
        multiple
        id="temperamentos"
      >
        {temperaments &&
          temperaments.map((temp) => (
            <option className={styles.option} key={temp} value={temp}>
              {temp}
            </option>
          ))}
      </select>
      <br />
      <button type="submit">AGREGAR</button>
    </form>
  );
}
