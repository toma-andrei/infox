import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

const NotFound = (props) => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/", { replace: true });
  };

  return (
    <main>
      <div className={styles.NotFoundTitle}>
        Pagina căutată nu a fost găsită
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

export default NotFound;
