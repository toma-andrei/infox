import styles from "./SelectSolutionModal.module.css";

const SelectSolutionModal = (props) => {
  return (
    <>
      <div className={styles.modalBackground}></div>
      <div className={styles.modal}>
        <div className={styles.modalText}>
          Doriți să înlocuiți codul scris cu sursa selectata?
          <div className={styles.yesNoButtonWrapper}>
            <button
              className={[styles.yesNoButton, styles.yesButton].join(" ")}
              onClick={props.openModal("yes")}
            >
              Da
            </button>
            <button
              className={[styles.yesNoButton, styles.noButton].join(" ")}
              onClick={props.openModal("no")}
            >
              Nu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectSolutionModal;
