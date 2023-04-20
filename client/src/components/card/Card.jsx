import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Card({ name, image, temperament, weight, id }) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    async function getImageUrl() {
      const url = image
        ? await image
        : "https://i.pinimg.com/564x/15/da/40/15da4089fe96ee453673ca6b50fb73eb.jpg";
      setImageUrl(url);
    }
    getImageUrl();
  }, [image]);
  return (
    <Link to={`/details/${id}`}>
      <div className={styles.CardContainer}>
        <div>
          <div>
            <h3>{name}</h3>
            {imageUrl ? (
              <div
                className={styles.CardImage}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                }}
              ></div>
            ) : (
              <div
                className={styles.CardImage}
                style={{
                  backgroundImage: `url("https://i.pinimg.com/564x/15/da/40/15da4089fe96ee453673ca6b50fb73eb.jpg")`,
                }}
              ></div>
            )}
            <h3>Entre {weight} Kg</h3>
            {temperament ? (
              temperament
                .split(",")
                .map((temp, index) => <p key={index}>{temp}</p>)
            ) : (
              <p key="unknown">Desconocido</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
