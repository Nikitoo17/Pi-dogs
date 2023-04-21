import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/form/form.jsx";
import { getTemperaments } from "../redux/actions.js";

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
    </div>
  );
}
