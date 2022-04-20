import styles from "./NoExistentProblems.module.css";
import { useNavigate } from "react-router-dom";
const NoExistentProblems = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.styleDiv}>
        Nu există probleme pentru acest subcapitol
      </div>
      <hr className={styles.styleHr} />
      <button
        className={styles.styleButton}
        onClick={() => {
          navigate(-1);
        }}
      >
        Mergi la pagina anterioară
      </button>
    </>
  );
};

export default NoExistentProblems;
