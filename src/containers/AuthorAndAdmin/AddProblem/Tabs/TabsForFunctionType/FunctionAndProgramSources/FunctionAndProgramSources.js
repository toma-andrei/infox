import styles from "./FunctionAndProgramSources.module.css";

const FunctionAndProgramSources = (props) => {
  return (
    <div className={styles.wrapperDiv}>
      <div className={styles.groupWrapper}>
        <label
          className={"col-sm-2 col-form-label " + styles.changeLabel}
          htmlFor="sourceCode"
        >
          Funcția ce urmează a fi inserată în programul de test:
        </label>
        <textarea
          placeholder="Aici se introduce funcția ce urmează a fi inserată în programul de test"
          id="sourceCode"
          onChange={(event) => props.setFunctionCode(event.target.value)}
          className={styles.textareaStyle}
          value={props.functionCode}
        ></textarea>
      </div>
      <div className={styles.groupWrapper}>
        <label
          className={"col-sm-2 col-form-label " + styles.changeLabel}
          htmlFor="sourceCode"
        >
          Programul de test (locul în care va fi plasată funcția se va indica
          prin șirul{" "}
          <strong>
            <i>"&amp;&amp;===&amp;&amp;"</i>
          </strong>
          )
        </label>
        <textarea
          placeholder="Aici se introduce codul de test în care va fi inserată și testată funcția"
          id="sourceCode"
          onChange={props.sourceModifiedHandler}
          className={styles.textareaStyle}
          value={props.proponentSource}
          spellCheck="false"
        ></textarea>
      </div>
    </div>
  );
};

export default FunctionAndProgramSources;
