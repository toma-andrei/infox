import styles from "./Unauthorized.module.css";
import { useNavigate } from "react-router-dom";

const Unauthorized = (props) => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/", { replace: true });
  };

  return (
    <main>
      <div className={styles.UnauthorizedTitle}>
        Nu ești autorizat pentru această pagină
        <hr className={styles.hrStyles} />
      </div>
      <div className={styles.goToMainButtonWrapper}>
        <button className={styles.goToMainButton} onClick={goToMainPage}>
          <span className={styles.goToMainAnchor}>
            Mergi la pagina principală
          </span>
        </button>
      </div>
    </main>
  );
};

export default Unauthorized;
