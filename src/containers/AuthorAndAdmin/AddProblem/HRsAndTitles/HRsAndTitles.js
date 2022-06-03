import styles from "./HRsAndTitles.module.css";

// UI elements for the horizontal rulers and titles
const HRsAndTitles = (props) => {
  return (
    <>
      <hr className={styles.horizontalRule} style={{ marginTop: "20px" }}></hr>
      <h2 className={styles.title}>{props.title}</h2>
      <hr
        className={styles.horizontalRule}
        style={{ marginBottom: "20px" }}
      ></hr>{" "}
    </>
  );
};

export default HRsAndTitles;
