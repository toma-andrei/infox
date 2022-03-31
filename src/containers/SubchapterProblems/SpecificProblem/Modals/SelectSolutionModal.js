import styles from "./SelectSolutionModal.module.css";

/**
 * Component showing modal when user press load solution button
 * @param {*} props data from OwnSolution Component: function toggleModal, function choiceFromModal, solutionId
 */
const SelectSolutionModal = (props) => {
  return (
    <>
      <div
        className={styles.modalBackground}
        onClick={() => props.toggleModal()}
      ></div>
      <div className={styles.modal}>
        <div className={styles.modalText}>
          Doriți să înlocuiți codul scris cu sursa selectata?
          <div className={styles.yesNoButtonWrapper}>
            <button
              className={[styles.yesNoButton, styles.yesButton].join(" ")}
              onClick={() => props.choiceFromModal("yes", props.solutionId)}
            >
              Da
            </button>
            <button
              className={[styles.yesNoButton, styles.noButton].join(" ")}
              onClick={() => props.toggleModal()}
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
