import Cards from "../../components/cards/Cards";
import Pagination from "../../components/pagination/pages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import SearchBar from "../../components/searchbar/SearchBar";
import OrderDogs from "../../components/order/order";
import FilterTemperaments from "../../components/filter_temperaments/filterTemperaments";
import FilterDogs from "../../components/filter_dogs/filterDogs";
import { Link } from "react-router-dom";
import {
  fetchDogs,
  filterDogs,
  filterDogsByName,
  filterDogsByTemperament,
  orderDogs,
} from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchDogs());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleFilterDogsByName = (filtered) => {
    dispatch(filterDogsByName(filtered));
  };
  const handleOrderDogs = (order) => {
    dispatch(orderDogs(order));
  };
  const handleFilterTemperaments = (temperament) => {
    dispatch(filterDogsByTemperament(temperament));
  };
  const handleFilterDogs = (type) => {
    dispatch(filterDogs(type));
  };

  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  let currentDogs = [];
  if (dogs) {
    currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
    console.log("a");
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.home}>
      <div className={styles.bar}>
        <OrderDogs order={handleOrderDogs} />
        <SearchBar filterDogs={handleFilterDogsByName} />
        <FilterTemperaments filterTemps={handleFilterTemperaments} />
        <Link to="/form">
          <button className={styles.button}>CREAR</button>
        </Link>
      </div>
      <FilterDogs filterData={handleFilterDogs} />
      <Cards dogs={currentDogs}></Cards>
      <Pagination
        itemsPerPage={dogsPerPage}
        totalItems={dogs ? dogs.length : 0}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
