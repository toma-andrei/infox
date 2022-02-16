import { useParams } from "react-router";
import styles from "../../Chapters.module.css";
import { Link } from "react-router-dom";
const Subchapter = (props) => {
  return (
    <Link
      className={styles.card}
      to={"/problems/display_subchapter/" + props.id}
    >
      <div className={styles.card_title}>{props.title}</div>
      <div className={styles.stats}>
        Probleme existente: 3 <br /> Probleme rezolvate 2 <br /> <br />
      </div>
      <div className={styles.percent}>55%</div>
    </Link>
  );
};

export default Subchapter;
