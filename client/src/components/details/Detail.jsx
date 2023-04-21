import { Link } from "react-router-dom";
import style from "./Detail.module.css";

export default function Detail({
  id,
  image,
  name,
  weight,
  height,
  life_span,
  temperaments,
}) {
  return (
    <div className={style.detail}>
      <Link to="/home">
        <button>GO HOME</button>
      </Link>
      <div className={style.card}>
        <img className={style.image} src={image} alt="" />
        <div className={style.info}>
          <p>ID: {id}</p>
          <p>NOMBRE: {name}</p>
          <p>PESO: Entre {weight} Kg</p>
          <p>ALTURA: Entre {height} Cm</p>
          <p>AÑOS DE VIDA: {life_span}</p>
          <p>TEMPERAMENTOS </p>
          <p>{temperaments}</p>
        </div>
      </div>
    </div>
  );
}
