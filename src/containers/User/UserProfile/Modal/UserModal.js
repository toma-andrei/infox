import styles from "./UserModal.module.css";

/**
 * Component showing modal when user press load solution button
 * @param {*} props data from OwnSolution Component: function toggleModal, function choiceFromModal, solutionId
 */
const UserModal = (props) => {
  return (
    <>
      <div
        className={styles.modalBackground}
        onClick={() => props.toggleModal()}
      ></div>
      <div className={styles.modal}>
        <div className={styles.modalText}>
          {props.text}
          <div className={styles.yesNoButtonWrapper}>
            {!props.authorBought ? (
              <>
                <button
                  className={[styles.yesNoButton, styles.yesButton].join(" ")}
                  onClick={() => props.choiceFromModal()}
                >
                  Da
                </button>
                <button
                  className={[styles.yesNoButton, styles.noButton].join(" ")}
                  onClick={() => props.toggleModal()}
                >
                  Nu
                </button>
              </>
            ) : (
              <button
                className={[styles.yesNoButton, styles.yesButton].join(" ")}
                onClick={() => props.toggleModal()}
              >
                Ok
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
