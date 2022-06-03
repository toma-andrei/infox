import styles from "./Buttons.module.css";
const Buttons = (props) => {
  return (
    <div className={styles.buttonsWrapper}>
      <button
        className={[styles.button, styles.saveButton].join(" ")}
        onClick={() => props.toggleModal(1)}
      >
        Salvează
      </button>
      <button className={styles.button} onClick={() => props.toggleModal(2)}>
        Finalizează
      </button>
    </div>
  );
};

export default Buttons;
