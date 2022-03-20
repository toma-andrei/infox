import { Link } from "react-router-dom";
import styles from "./ProposedProblem.module.css";
const ProposedProblem = (props) => {
  let proposedProblemStyles = [styles.problem];

  proposedProblemStyles.push(
    props.approved ? styles.approved : styles.unapproved
  );

  return (
    <Link
      to={"/problems/display_problem/" + props.id}
      className={proposedProblemStyles.join(" ")}
    >
      <div>
        <b className={styles.title}>{props.id + ": " + props.title}</b>
      </div>
      <p className={proposedProblemStyles.abstract}>{props.abstract}</p>
    </Link>
  );
};

export default ProposedProblem;
