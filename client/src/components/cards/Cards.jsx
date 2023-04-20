import axios from "axios";
import Card from "../card/Card";
import styles from "./Cards.module.css";
export default function Cards({ dogs }) {
  const dogImage = async (imageID) => {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/images/${imageID}`
    );

    const url = response.data.url;

    return url;
  };
  const perros = dogs.map((dog, index) => {
    if (Array.isArray(dog)) {
      return dog.map((dogDb) => (
        <Card
          key={dogDb.id}
          id={dogDb.id}
          name={dogDb.name}
          temperament={dogDb.temperament}
          image={dogDb.image}
          weight={dogDb.weight}
        />
      ));
    } else {
      return (
        <Card
          key={dog.id}
          id={dog.id}
          name={dog.name}
          temperament={dog.temperament}
          image={
            dog.reference_image_id ? dogImage(dog.reference_image_id) : null
          }
          weight={
            dog.weight && dog.weight.metric ? dog.weight.metric : dog.weight
          }
        />
      );
    }
  });
  return <div className={styles.cards}>{perros}</div>;
}
