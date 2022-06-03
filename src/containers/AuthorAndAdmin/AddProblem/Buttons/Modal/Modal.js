import styles from "./Modal.module.css";

/**
 * Component showing modal when user press load solution button
 * @param {*} props data from OwnSolution Component: function toggleModal, function choiceFromModal, solutionId
 */
const Modal = (props) => {
  return (
    <>
      <div
        className={styles.modalBackground}
        onClick={() => props.toggleModal(0)}
      ></div>
      <div className={styles.modal}>
        <div className={styles.modalText}>
          {props.message}
          <div className={styles.yesNoButtonWrapper}>
            <button
              className={[styles.yesNoButton, styles.yesButton].join(" ")}
              onClick={() => props.choiceFromModal("yes", props.solutionId)}
            >
              Da
            </button>
            <button
              className={[styles.yesNoButton, styles.noButton].join(" ")}
              onClick={() => props.toggleModal(0)}
            >
              Nu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
