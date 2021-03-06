import styles from "./SingleTest.module.css";

const SingleTest = (props) => {
  return (
    <>
      <div></div>
      <div className={styles.wrapper}>
        <div className={styles.titleAndExit}>
          <label className={styles.testNumber}>Test {props.id + 1}</label>
          <span onClick={props.removeTest}>✖</span>
        </div>
        <div className={"form-group row " + styles.addSpaces}>
          <label className={styles.changeLabel} htmlFor="firstTextarea">
            {props.problemType === "files_io" ? " data.in:" : " Input:"}
          </label>
          <textarea
            className={styles.textareaField}
            id="firstTextarea"
            value={props.input}
            onChange={props.updateInput}
          ></textarea>
          {props.problemType === "files_io" ? (
            <div className={styles.chooseFile}>
              <label htmlFor={"file" + props.id}>
                Încarcă fișierul data.in
              </label>
              <input
                type="file"
                id={"file" + props.id}
                className={styles.chooseFileInput}
                onChange={(event) => {
                  props.loadFile(props.id, event);
                }}
              />
            </div>
          ) : null}
        </div>
        <div className={"form-group row " + styles.addSpaces}>
          <label className={styles.changeLabel} htmlFor="secondTextarea">
            {props.problemType === "files_io" ? " data.out:" : " Output:"}
          </label>
          <textarea
            className={styles.textareaField}
            id="secondTextarea"
            value={props.output}
            readOnly={true}
            placeholder="Outputul va fi generat automat pe baza inputului"
          ></textarea>
        </div>
        <div className={styles.bottomContainerWrapper}>
          <div className={styles.scoreWrapper}>
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
          <div className={styles.scoreWrapper}>
            <button
              className={styles.compileButton}
              onClick={() => props.compileSingleTest(props.id)}
              disabled={props.loading ? true : false}
            >
              {props.loading
                ? "Testul se compilează..."
                : "Compilează acest test"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTest;
