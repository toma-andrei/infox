import { useEffect } from "react";
import styles from "./SavedWithSuccess.module.css";
const SavedWithSuccess = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.moveToFalse();
    }, 4000);
  }, []);
  let stylesInline = props.error !== "" ? { backgroundColor: "#d33131" } : {};
  return (
    <div className={[styles.wrapperDiv]} styles={stylesInline}>
      <span>{props.text}</span>
    </div>
  );
};

export default SavedWithSuccess;
