import styles from "./SubchapterProblemAbstract.module.css";
import { Link } from "react-router-dom";
import Label from "../LabelsShort/Labels";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { requestIP } from "../../../env";
import Labels from "../LabelsShort/Labels";
import useKatexParser from "../../../hooks/useKatexParser";

/*
 * Abstract problem component on route /problems/display_subchapter/id
 */
const SubchapterProblemAbstract = (props) => {
  const md = useKatexParser();
  const { jwt } = useAuth();
  const [successRate, setSuccessRate] = useState(0);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: {
        method: "get",
        jwt: jwt,
        url: "https://infox.ro/new/solutions/problem/" + props.fullProblem.id,
      },
    }).then((res) => {
      const temp = res.data.solutions.sort((a, b) => {
        let aa = new Date(a.created_at);
        let bb = new Date(b.created_at);

        return aa < bb ? 1 : aa > bb ? -1 : 0;
      });
      setSolutions(temp);
    });
  }, []);

  useEffect(() => {
    //get all solutions with score == 100 to compute success rate
    let solvedNumber = solutions.filter((solution) => {
      return parseInt(solution.points) === 100;
    }).length;

    let successRateNum = Math.round((solvedNumber / solutions.length) * 100);
    setSuccessRate(successRateNum);
  }, [solutions]);

  //compute success rate based on data from server
  return props.shouldNotRedirect ? (
    <div
      className={styles.problem_title_and_abstract}
      style={props.custom_style}
    >
      <b>{props.fullProblem.id + ": " + props.fullProblem.title}</b>
      <sup className="bg bg-success"></sup>
      <div
        className="abstract_requirements"
        dangerouslySetInnerHTML={{
          __html: md(props.fullProblem.abstract),
        }}
      />
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
    </div>
  ) : (
    <Link
      to={"/problems/display_problem/" + props.fullProblem.id}
      state={{ ...props.fullProblem, solutions: solutions }}
      className={styles.problem_title_and_abstract}
    >
      <b>{props.fullProblem.id + ": " + props.fullProblem.title}</b>
      <sup className="bg bg-success"></sup>
      <div
        className="abstract_requirements"
        dangerouslySetInnerHTML={{
          __html: md(props.fullProblem.abstract),
        }}
      />
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
      <div style={{ marginTop: "20px" }}>
        <Labels labels={props.fullProblem.labels} />
      </div>
    </Link>
  );
};

export default SubchapterProblemAbstract;
