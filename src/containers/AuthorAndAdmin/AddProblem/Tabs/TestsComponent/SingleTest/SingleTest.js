import styles from "./SingleTest.module.css";

const SingleTest = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleAndExit}>
        <label className={styles.testNumber}>Test {props.id + 1}</label>
        <span onClick={props.removeTest}>✖</span>
      </div>
      <div className={"form-group row " + styles.addSpaces}>
        <label className={styles.changeLabel} htmlFor="firstTextarea">
          {" Input:"}
        </label>
        <textarea
          className={styles.textareaField}
          id="firstTextarea"
          value={props.input}
          onChange={props.updateInput}
        ></textarea>
      </div>
      <div className={"form-group row " + styles.addSpaces}>
        <label className={styles.changeLabel} htmlFor="secondTextarea">
          {" Output:"}
        </label>
        <textarea
          className={styles.textareaField}
          id="secondTextarea"
          value={props.output}
          readOnly={true}
          placeholder="Outputul va fi generat automat pe baza inputului"
        ></textarea>
      </div>
      <div>
        <label className={styles.changeInlineLabel} htmlFor="score">
          {" Scorul testului:"}
        </label>
        <input
          type="number"
          className={styles.inputWidth + " form-control"}
          id="score"
          placeholder="20"
          value={props.score === -1 ? "" : props.score}
          onChange={props.updateScore}
        />
      </div>

      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          id="exemple"
          className={styles.checkbox}
          checked={props.isExemple}
          onChange={props.updateIsExemple}
        />
        <label className={styles.changeInlineLabel} htmlFor="exemple">
          {"Exemplu?"}
        </label>
      </div>
    </div>
  );
};

export default SingleTest;
