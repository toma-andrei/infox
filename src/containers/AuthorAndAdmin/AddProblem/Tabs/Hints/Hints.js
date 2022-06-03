import useKatexParser from "../../../../../hooks/useKatexParser";
import styles from "./Hints.module.css";
const Hints = (props) => {
  const parseHints = useKatexParser();
  return (
    <div className={styles.hintsWrapper}>
      <label
        className={"col-sm-2 col-form-label " + styles.changeLabel}
        htmlFor="hints"
      >
        Indicații pentru rezolvarea problemei:
      </label>
      <div className={styles.textareasWrapper}>
        <textarea
          id="hints"
          className={styles.textarea}
          value={props.hints}
          onChange={props.hintsModifiedHandler}
        />
        <div
          id="hints"
          className={styles.textarea}
          readOnly={true}
          value=""
          dangerouslySetInnerHTML={{ __html: parseHints(props.hints) }}
        />
      </div>
    </div>
  );
};

export default Hints;
