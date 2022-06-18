import { useState, useEffect } from "react";
import useAuth from "../../../../../hooks/useAuth";
import styles from "./Labels.module.css";
import ajax from "../../../../../assets/js/ajax";

const Labels = (props) => {
  const [labels, setLabels] = useState([]);
  const { jwt } = useAuth();

  useEffect(() => {
    ajax("https://infox.ro/new/labels", "get", jwt, {}).then((res) => {
      setLabels(res.data.labels.sort((a, b) => a.name.localeCompare(b.name)));
    });
  }, []);

  const toShow = labels.map((label) => {
    return (
      <div key={label.id} className={styles.groupWrapper}>
        <input
          type="checkbox"
          id={label.id}
          name={label.name}
          value={label.id}
          checked={props.selectedLabels.includes(label.id)}
          onChange={props.labelsModifiedHandler}
          className={styles.input}
        />
        <label className={styles.label} htmlFor={label.id}>
          {label.name}
        </label>
      </div>
    );
  });

  return (
    <>
      <div className={styles.labelsWrapperDiv}>
        <div>
          {toShow}
          <div style={{ clear: "both" }}>&nbsp;</div>
        </div>
      </div>
      <>
        <label
          className={"col-sm-2 col-form-label " + styles.changeLabel}
          htmlFor="customLabel"
        >
          Adaugă o nouă etichetă:
        </label>
        <div className={styles.ReqAndPrevDiv}>
          <textarea
            placeholder=""
            id="customLabel"
            onChange={props.changeCustomLabel}
            className={styles.customLabelStyle}
            value={props.customLabel}
          ></textarea>
        </div>
      </>
    </>
  );
};

export default Labels;
