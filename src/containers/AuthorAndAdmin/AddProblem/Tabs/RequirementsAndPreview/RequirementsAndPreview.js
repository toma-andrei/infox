import styles from "./RequirementsAndPreview.module.css";
import parseProblemRequirements from "../../../../../assets/js/parseProblemRequirements";
import parseMermaidText from "../../../../../assets/js/parseMermaidText";

const RequirementsAndPreview = (props) => {
  const parsedMermaidText = parseMermaidText(props.req.requirements);

  return (
    <div className={styles.problem}>
      <div className={"form-group row " + styles.addSpaces}>
        <label
          className={"col-sm-2 col-form-label " + styles.changeLabel}
          htmlFor="requirements"
        >
          Textul problemei:
        </label>
        <div className={styles.ReqAndPrevDiv}>
          <textarea
            id="requirements"
            onChange={props.req.modifiedHandler}
            className={styles.ReqAndPrevTextarea}
            value={props.req.requirements}
          ></textarea>
          <div
            className={styles.previewDiv}
            dangerouslySetInnerHTML={{
              __html: parseProblemRequirements(parsedMermaidText),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsAndPreview;
