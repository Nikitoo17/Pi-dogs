import styles from "./form.module.css";
import axios from "axios";
import { useState } from "react";

export default function Form({ temperaments }) {
  const [errors, setErrors] = useState({
    name: "Se necesita Nombre",
    image: "",
    weight: "",
    height: "",
  });
  const isUrlValid = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const handleChangeName = (event) => {
    let name = event.target.value;
    if (!name || /\d/.test(name)) {
      console.log("a");
      if (!name) {
        setErrors({ ...errors, name: "Se necesita Nombre" });
      } else {
        setErrors({
          ...errors,
          name: "El nombre de la raza no puede contener números.",
        });
      }
    } else {
      setErrors({ ...errors, name: "" });
    }
  };
  const handleChangeImage = (event) => {
    let image = event.target.value;
    if (image && !isUrlValid(image)) {
      setErrors({ ...errors, image: "La url ingresada es incorrecta" });
    } else {
      setErrors({ ...errors, image: "" });
    }
  };
  const handleChangeHeight = () => {
    let heightMin = document.getElementById("altura-min").value;
    let heightMax = document.getElementById("altura-max").value;
    if (!heightMin || !heightMax || parseInt(heightMin) > parseInt(heightMax)) {
      if (!heightMin || !heightMax) {
        setErrors({ ...errors, height: "Se necesita Altura" });
      } else {
        setErrors({
          ...errors,
          height: "La altura mínima no puede ser mayor que la altura máxima.",
        });
      }
    } else {
      setErrors({ ...errors, height: "" });
    }
  };
  const handleChangeWeight = () => {
    let weightMin = document.getElementById("peso-min").value;
    let weightMax = document.getElementById("peso-max").value;
    if (!weightMin || !weightMax || parseInt(weightMin) > parseInt(weightMax)) {
      if (!weightMin || !weightMax) {
        setErrors({ ...errors, weight: "Se necesita Peso" });
      } else {
        setErrors({
          ...errors,
          weight: "El peso mínimo no puede ser mayor que el peso máximo.",
        });
      }
    } else {
      setErrors({ ...errors, weight: "" });
    }
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
    if (!errors.name && !errors.image && !errors.height && !errors.weight) {
      const body = {
        name,
        image,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        temperaments: Array.from(temperaments).map((option) => option.value),
      };
      return body;
    } else {
      throw new Error("Algo no salio bien");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = crearRaza();
      await axios.post(`dogs`, body);
      alert("Raza agregada exitosamente!");
      // ********** Limpiar los imputs ********
      document.getElementById("nombre").value = "";
      document.getElementById("image").value = "";
      document.getElementById("altura-min").value = "";
      document.getElementById("altura-max").value = "";
      document.getElementById("peso-min").value = "";
      document.getElementById("peso-max").value = "";
      document.getElementById("vida").value = "";
      document.getElementById("temperamentos").selectedIndex = -1;
    } catch (error) {
      alert("Verifica que los datos esten correctos");
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
            onChange={handleChangeName}
          />
          <span className={styles.error}>{errors.name}</span>
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
            onChange={handleChangeImage}
          />
          <span className={styles.error}>{errors.image}</span>
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
            onChange={handleChangeHeight}
          />
          <label>-</label>
          <input
            className={styles.input2}
            type="number"
            name="heightMax"
            id="altura-max"
            placeholder="Max"
            onChange={handleChangeHeight}
          />
        </div>
        <span className={styles.error}>{errors.height}</span>
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
            onChange={handleChangeWeight}
          />
        </div>
        <span className={styles.error}>{errors.weight}</span>
        <br />
        <div>
          <label>Años de vida: </label>
          <input
            className={styles.input}
            type="number"
            name="lfe_span"
            id="vida"
            placeholder="Tiempo de vida apox."
            onChange={handleChangeWeight}
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
