import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./TriedProblem.module.css";

const TriedProblem = (props) => {
  const [problems, setProblems] = useState([]);

  let triedProblemStyles = [styles.problem];
  parseInt(props.score) === 100
    ? triedProblemStyles.push(styles.success)
    : triedProblemStyles.push(styles.tried);

  let scoreStyles = [styles.score];
  parseInt(props.score) === 100
    ? scoreStyles.push(styles.fullScore)
    : scoreStyles.push(styles.partialScore);

  return (
    <Link
      to={"/problems/display_problem/" + props.id}
      className={triedProblemStyles.join(" ")}
    >
      <div>
        <b className={styles.title}>{props.id + ": " + props.title}</b>
        <sup className={scoreStyles.join(" ")}>{props.score}</sup>
      </div>
      <p className={styles.abstract}>{props.abstract}</p>
    </Link>
  );
};

export default TriedProblem;
