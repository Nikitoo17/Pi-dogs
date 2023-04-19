import styles from "./Landing.module.css";
import ButtonHome from "../../components/button_home/Button";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className={styles.landing}>
      <Link to={`/home`}>
        <ButtonHome />
      </Link>
    </div>
  );
}
