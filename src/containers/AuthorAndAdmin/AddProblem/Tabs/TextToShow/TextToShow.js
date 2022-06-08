import styles from "./TextToShow.module.css";

const TextToShow = (props) => {
  return (
    <div className={styles.textWrapperDiv}>
      <div
        className={styles.textToShow}
        dangerouslySetInnerHTML={{ __html: props.text }}
      ></div>
    </div>
  );
};

export default TextToShow;
