import styles from "./form.module.css";
import axios from "axios";

export default function Form({ temperaments }) {
  const isUrlValid = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };
  const crearRaza = () => {
    let name = document.getElementById("nombre").value;
    let image = document.getElementById("image").value;
    let heightMin = document.getElementById("altura-min").value;
    let heightMax = document.getElementById("altura-max").value;
    let weightMin = document.getElementById("peso-min").value;
    let weightMax = document.getElementById("peso-max").value;
    let life_span = document.getElementById("vida").value;
    let temperaments = document.getElementById("temperamentos").selectedOptions;
    if (!name || /\d/.test(name)) {
      console.log("a");
      if (!name) {
        alert("Se necesita Nombre");
        throw new Error("Se necesita Nombre");
      } else {
        alert("El nombre de la raza no puede contener números.");
        throw new Error("El nombre de la raza no puede contener números.");
      }
    } else {
      if (image && !isUrlValid(image)) {
        alert("La url ingresada es incorrecta");
        throw new Error("La url ingresada es incorrecta");
      } else {
        if (
          !heightMin ||
          !heightMax ||
          parseInt(heightMin) > parseInt(heightMax)
        ) {
          if (!heightMin || !heightMax) {
            alert("Se necesita Altura");
            throw new Error("Se necesita Altura");
          } else {
            alert("La altura mínima no puede ser mayor que la altura máxima.");
            throw new Error(
              "La altura mínima no puede ser mayor que la altura máxima."
            );
          }
        } else {
          if (
            !weightMin ||
            !weightMax ||
            parseInt(weightMin) > parseInt(weightMax)
          ) {
            if (!weightMin || !weightMax) {
              alert("Se necesita Peso");
              throw new Error("Se necesita Peso");
            } else {
              alert("El peso mínimo no puede ser mayor que el peso máximo.");
              throw new Error(
                "El peso mínimo no puede ser mayor que el peso máximo."
              );
            }
          } else {
            const body = {
              name,
              image,
              heightMin,
              heightMax,
              weightMin,
              weightMax,
              life_span,
              temperaments: Array.from(temperaments).map(
                (option) => option.value
              ),
            };
            return body;
          }
        }
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = crearRaza();
      await axios.post(`http://localhost:3001/dogs`, body);
      console.log(body);
      alert("Raza agregada exitosamente!");
      // ********** Limpiar los imputs ********
      document.getElementById("nombre").value = "";
      document.getElementById("altura-min").value = "";
      document.getElementById("altura-max").value = "";
      document.getElementById("peso-min").value = "";
      document.getElementById("peso-max").value = "";
      document.getElementById("vida").value = "";
      document.getElementById("temperamentos").selectedIndex = -1;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>AGREGAR RAZA</h1>
        <div>
          <label>Nombre: </label>
          <input
            className={styles.input}
            type="text"
            name="name"
            id="nombre"
            placeholder="Nombre de la Raza"
          />
        </div>
        <br />
        <div>
          <label>Imagen: </label>
          <input
            className={styles.input}
            type="text"
            name="image"
            id="image"
            placeholder="Ingrese la URL de la imagen"
          />
        </div>
        <br />
        <div>
          <label>Altura: </label>
          <input
            className={styles.input2}
            type="number"
            name="heightMin"
            id="altura-min"
            placeholder="Min"
          />
          <label>-</label>
          <input
            className={styles.input2}
            type="number"
            name="heightMax"
            id="altura-max"
            placeholder="Max"
          />
        </div>
        <br />
        <div>
          <label>Peso: </label>
          <input
            className={styles.input2}
            type="number"
            name="weightMin"
            id="peso-min"
            placeholder="Min"
          />
          <label>-</label>
          <input
            className={styles.input2}
            type="number"
            name="weightMax"
            id="peso-max"
            placeholder="Max"
          />
        </div>
        <br />
        <div>
          <label>Años de vida: </label>
          <input
            className={styles.input}
            type="number"
            name="lfe_span"
            id="vida"
            placeholder="Tiempo de vida apox."
          />
        </div>
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
        <button className={styles.button} type="submit">
          AGREGAR
        </button>
      </form>
    </div>
  );
}
