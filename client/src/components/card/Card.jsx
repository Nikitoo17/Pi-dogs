import styles from "./Card.module.css";

export default function Card({ name, image, temperament, weight, id }) {
  return (
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
          <h3>{weight}</h3>
          <h3 className={styles.temperament}>{temperament}</h3>
        </div>
      </div>
    </div>
  );
}
