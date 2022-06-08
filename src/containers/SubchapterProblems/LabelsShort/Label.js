import styles from "./Labels.module.css";
const Label = (props) => {
  return <span className={styles.label}> {props.name}</span>;
};

export default Label;
