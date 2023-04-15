import Card from "../card/Card";
import styles from "./Cards.module.css";
export default function Cards({ dogs }) {
  const perros = dogs.map((dog) => (
    <Card
      key={dog.id}
      name={dog.name}
      temperament={dog.temperament}
      image={dog.image}
      weight={dog.weight.imperial}
    />
  ));
  return <div className={styles.cards}>{perros}</div>;
}
