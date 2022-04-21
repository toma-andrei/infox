import styles from "./ProponentSource.module.css";

const ProponentSource = (props) => {
  return (
    <>
      <label
        className={"col-sm-2 col-form-label " + styles.changeLabel}
        htmlFor="sourceCode"
      >
        Sursa oficială a problemei:
      </label>
      <div className={styles.ReqAndPrevDiv}>
        <textarea
          placeholder="Aici se introduce sursa oficială, care va fi folosită la generarea testelor"
          id="sourceCode"
          onChange={props.sourceModifiedHandler}
          className={styles.sourceCodeStyle}
          value={props.source}
        ></textarea>
      </div>
    </>
  );
};

export default ProponentSource;
