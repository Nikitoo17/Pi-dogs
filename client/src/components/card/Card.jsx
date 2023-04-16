import styles from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, temperament, weight, id }) {
  return (
    <Link to={`/details/${id}`}>
      <div className={styles.CardContainer}>
        <div>
          <div>
            <h3>{name}</h3>
            <div
              className={styles.CardImage}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            ></div>
            <h3>Entre {weight} Kg</h3>
            {temperament ? (
              temperament.split(",").map((temp) => <p>{temp}</p>)
            ) : (
              <p>Desconocido</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
