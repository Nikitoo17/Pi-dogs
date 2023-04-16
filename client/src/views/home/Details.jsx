import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Detail from "../../components/details/Detail";

export default function Details() {
  const [details, setDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dogs`)
      .then((response) => {
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == id) {
            const filterDetails = data[i];
            setDetails(filterDetails);
            console.log(filterDetails);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <Detail
      id={details.id}
      image={details.image && details.image.url ? details.image.url : ""}
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
