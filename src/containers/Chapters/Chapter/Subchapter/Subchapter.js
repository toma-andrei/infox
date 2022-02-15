import styles from "../../Chapters.module.css";

const Subchapter = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_title}>{props.title}</div>
      <div className={styles.stats}>
        Probleme existente: 3 <br /> Probleme rezolvate 2 <br /> <br />
      </div>
      <div className={styles.percent}>55%</div>
    </div>
  );
};

export default Subchapter;
