import Cards from "../../../components/cards/Cards";
import axios from "axios";
import Pagination from "../../../components/pages/pages";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import SearchBar from "../../../components/searchbar/SearchBar";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/dogs/`)
      .then((response) => {
        setDogs(response.data);
        console.log(response.data);
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

  return (
    <div className={styles.home}>
      <SearchBar filterDogs={filterDogs} />
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
