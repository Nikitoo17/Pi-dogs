import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../../components/details/Detail";
import style from "./Details.module.css";

export default function Details() {
  const [details, setDetails] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dogs/${id}`)
      .then((response) => {
        const data = response.data;
        setDetails(data);
        if (data.dogDB) {
          if (data.dogAPI.reference_image_id) {
            dogImage(data.dogAPI.reference_image_id);
          }
        } else {
          if (data.reference_image_id) {
            dogImage(data.reference_image_id);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const dogImage = async (imageID) => {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/images/${imageID}`
    );

    const url = response.data.url;

    setImageUrl(url);
  };
  const isUUID = (id) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };

  return (
    <div className={style.details}>
      {isUUID(details.id) ? (
        <Detail
          id={details.id}
          image={
            details.image
              ? details.image
              : "https://i.pinimg.com/564x/15/da/40/15da4089fe96ee453673ca6b50fb73eb.jpg"
          }
          name={details.name}
          weight={details.weight}
          height={details.height}
          life_span={details.life_span}
          temperaments={
            details.temperament ? details.temperament.join(", ") : null
          }
        />
      ) : (
        <Detail
          id={details.id}
          image={
            imageUrl
              ? imageUrl
              : "https://i.pinimg.com/564x/15/da/40/15da4089fe96ee453673ca6b50fb73eb.jpg"
          }
          name={details.name}
          weight={
            details.weight && details.weight.metric
              ? details.weight.metric
              : "Desconocido"
          }
          height={
            details.height && details.height.metric
              ? details.height.metric
              : "Desconocido"
          }
          life_span={details.life_span}
          temperaments={details.temperament}
        />
      )}
    </div>
  );
}
