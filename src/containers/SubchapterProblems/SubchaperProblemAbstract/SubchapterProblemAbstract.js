import styles from "./SubchapterProblemAbstract.module.css";
import { Link } from "react-router-dom";

const SubchapterProblemAbstract = (props) => {
  let successRate = (
    (props.fullProblem.correct / props.fullProblem.submitted) *
    100
  ).toFixed(0);

  successRate = successRate === "NaN" ? 50 : successRate;

  return (
    <Link
      to={"/problems/display_problem/" + props.fullProblem.id}
      state={props.fullProblem}
      className={styles.problem_title_and_abstract}
    >
      <b>{props.fullProblem.id + ": " + props.fullProblem.title}</b>
      <sup className="bg bg-success"></sup>
      <div className="abstract_requirements">{props.fullProblem.abstract}</div>
      <div className="progress">
        <div
          className={"progress-bar bg-success"}
          role="progressbar"
          style={{ width: successRate.toString() + "%" }}
          aria-valuenow={successRate.toString()}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          Rată succes: {successRate}
        </div>
      </div>
    </Link>
  );
};

export default SubchapterProblemAbstract;
