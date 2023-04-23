import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/form/form.jsx";
import { getTemperaments } from "../../redux/actions.js";
import styles from "./FromPage.module.css";
import { Link } from "react-router-dom";

export default function FormPage() {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  useEffect(() => {
    if (temperaments.length === 0) {
      dispatch(getTemperaments());
    }
  }, [dispatch, temperaments]);

  console.log(temperaments);

  return (
    <div>
      <Form temperaments={temperaments} />
      <Link to="/home">
        <button className={styles.button}> GO HOME</button>
      </Link>
    </div>
  );
}
