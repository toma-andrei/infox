import styles from "./Labels.module.css";
import { useNavigate } from "react-router";
const Label = (props) => {
  const navigate = useNavigate();

  const goToLabelProblems = () => {
    navigate("/problems/label/" + props.id);
  };

  return (
    <span className={styles.label} onClick={goToLabelProblems}>
      {" "}
      {props.name}
    </span>
  );
};

export default Label;
