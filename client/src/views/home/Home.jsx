import Cards from "../../components/cards/Cards";
import axios from "axios";
import Pagination from "../../components/pagination/pages";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import SearchBar from "../../components/searchbar/SearchBar";
import OrderDogs from "../../components/order/order";
import FilterTemperaments from "../../components/filter_temperaments/filterTemperaments";
import FilterDogs from "../../components/filter_dogs/filterDogs";
import { Link } from "react-router-dom";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [originalDogs, setOriginalDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/dogs/`)
      .then((response) => {
        setDogs(response.data);
        setOriginalDogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterDogs = (filtered) => {
    setDogs(filtered);
  };
  const orderDogs = (order) => {
    const dogCopy = [...dogs];
    if (order === "nombre-min") {
      dogCopy.sort((a, b) => a.name.localeCompare(b.name));
      setDogs(dogCopy);
      console.log("a");
    } else if (order === "nombre-max") {
      dogCopy.sort((a, b) => b.name.localeCompare(a.name));
      setDogs(dogCopy);
      console.log("b");
    } else if (order === "peso-min") {
      dogCopy.sort((a, b) => {
        const weightA = peso(a.weight);
        const weightB = peso(b.weight);
        return weightA - weightB;
      });
      setDogs(dogCopy);
      console.log("c");
    } else if (order === "peso-max") {
      dogCopy.sort((a, b) => {
        const weightA = peso(a.weight);
        const weightB = peso(b.weight);
        return weightB - weightA;
      });
      setDogs(dogCopy);
      console.log("d");
    } else {
      return dogs;
    }
  };
  const peso = (weight) => {
    const weightValueA = weight.metric
      ? weight.metric.split("-")[0] && !isNaN(weight.metric.split("-")[0])
        ? weight.metric.split("-")[0]
        : 0
      : weight.split("-")[0];
    const weightValueB = weight.metric
      ? weight.metric.split("-")[1] && !isNaN(weight.metric.split("-")[1])
        ? weight.metric.split("-")[1]
        : 0
      : weight.split("-")[1];
    const weightAvg = (parseInt(weightValueA) + parseInt(weightValueB)) / 2;
    return weightAvg;
  };
  const filterTemps = (temperament) => {
    if (temperament !== "") {
      temperament = temperament.toLowerCase();
      const filteredDogs = dogs.filter((dog) => {
        const temperaments =
          dog.temperament &&
          dog.temperament.split(",").map((t) => t.toLowerCase().trim());
        return temperaments && temperaments.includes(temperament);
      });
      console.log(filteredDogs);
      setDogs(filteredDogs);
    } else {
      setDogs(originalDogs);
    }
  };
  const isUUID = (id) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };
  const filterData = (type) => {
    if (type === "all") {
      setDogs(originalDogs);
    } else if (type === "api") {
      const apiDogs = originalDogs.filter((dog) => {
        return !isUUID(dog.id);
      });
      setDogs(apiDogs);
    } else if (type === "db") {
      const dbDogs = originalDogs.filter((dog) => {
        return isUUID(dog.id);
      });
      setDogs(dbDogs);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.bar}>
        <OrderDogs order={orderDogs} />
        <SearchBar filterDogs={filterDogs} />
        <FilterTemperaments filterTemps={filterTemps} />
        <Link to="/form">
          <button className={styles.button}>CREAR</button>
        </Link>
      </div>
      <FilterDogs filterData={filterData} />
      <Cards dogs={currentDogs}></Cards>
      <Pagination
        itemsPerPage={dogsPerPage}
        totalItems={dogs.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
