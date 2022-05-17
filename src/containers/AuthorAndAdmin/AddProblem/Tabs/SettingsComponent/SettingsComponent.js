import styles from "./SettingsComponent.module.css";

/**
 * Compenent that handles settings of problem like Time limit, Memory limit etc.
 */
const SettingsComponent = (props) => {
  return (
    <div>
      <div className={"form-group row " + styles.addSpaces}>
        <label
          className={"col-sm-2 col-form-label " + styles.changeLabel}
          htmlFor="timeLimit"
        >
          Limita de timp <i>(secunde)</i>:
        </label>
        <div className={"col-sm-10 " + styles.inputWidth}>
          <input
            onChange={props.modifiedTimeLimit}
            type="number"
            className={
              "form-control " +
              styles.changeInput +
              " " +
              styles.centerInputElement
            }
            id="timeLimit"
            value={props.timeLimit}
          />
        </div>
      </div>

      <div className={"form-group row " + styles.addSpaces}>
        <label
          className={"col-sm-2 col-form-label " + styles.changeLabel}
          htmlFor="memoryLimit"
        >
          Limită maximă de memorie <i>(MB)</i>:
        </label>
        <div className={"col-sm-10 " + styles.inputWidth}>
          <input
            onChange={props.modifiedMemoryLimit}
            type="number"
            className={
              "form-control " +
              styles.changeInput +
              " " +
              styles.centerInputElement
            }
            id="memoryLimit"
            value={props.memoryLimit}
          />
        </div>
      </div>

      <div className={"form-group row " + styles.addSpaces}>
        <label
          className={"col-sm-2 col-form-label " + styles.changeLabel}
          htmlFor="stackMemoryLimit"
        >
          Limită maximă de memorie pe stivă <i>(MB)</i>:
        </label>
        <div className={"col-sm-10 " + styles.inputWidth}>
          <input
            onChange={props.modifiedStackMemoryLimit}
            type="number"
            className={
              "form-control " +
              styles.changeInput +
              " " +
              styles.centerInputElement
            }
            id="stackMemoryLimit"
            value={props.stackMemoryLimit}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
