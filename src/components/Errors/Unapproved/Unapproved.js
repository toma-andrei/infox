import styles from "./Unapproved.module.css";
import { useNavigate } from "react-router";

const Unapproved = () => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/", { replace: true });
  };

  return (
    <main>
      <div className={styles.UnauthorizedTitle}>
        Această problemă nu a fost aprobată încă.
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

export default Unapproved;
