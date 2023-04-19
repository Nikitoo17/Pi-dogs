import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../../components/details/Detail";

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
        console.log(data);
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

  return details.dogDB ? (
    <div>
      <Detail
        id={details.dogDB.id}
        image={
          details.dogDB.image
            ? details.dogDB.image
            : "https://i.pinimg.com/564x/15/da/40/15da4089fe96ee453673ca6b50fb73eb.jpg"
        }
        name={details.dogDB.name}
        weight={details.dogDB.weight ? details.dogDB.weight : "Desconocido"}
        height={details.dogDB.height ? details.dogDB.height : "Desconocido"}
        life_span={details.dogDB.life_span}
        temperaments={details.dogDB.temperament}
      />
      {details.dogAPI && (
        <Detail
          id={details.dogAPI.id}
          image={
            imageUrl
              ? imageUrl
              : "https://i.pinimg.com/564x/15/da/40/15da4089fe96ee453673ca6b50fb73eb.jpg"
          }
          name={details.dogAPI.name}
          weight={
            details.dogAPI.weight && details.dogAPI.weight.metric
              ? details.dogAPI.weight.metric
              : "Desconocido"
          }
          height={
            details.dogAPI.height && details.dogAPI.height.metric
              ? details.dogAPI.height.metric
              : "Desconocido"
          }
          life_span={details.dogAPI.life_span}
          temperaments={details.dogAPI.temperament}
        />
      )}
    </div>
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
  );
}
