import styles from "./SubchapterProblemAbstract.module.css";
import { Link } from "react-router-dom";
import Label from "../LabelsShort/Labels";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { requestIP } from "../../../env";
import Labels from "../LabelsShort/Labels";
const tm = require("markdown-it-texmath");
const md = require("markdown-it")({ html: true }).use(tm, {
  engine: require("katex"),
  delimiters: "dollars",
  katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
});

/*
 * Abstract problem component on route /problems/display_subchapter/id
 */
const SubchapterProblemAbstract = (props) => {
  //compute success rate based on data from server
  let successRate = (
    (props.fullProblem.correct / props.fullProblem.submitted) *
    100
  ).toFixed(0);
  successRate = successRate === "NaN" ? 50 : successRate;
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
          __html: md.render(props.fullProblem.abstract),
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
      state={props.fullProblem}
      className={styles.problem_title_and_abstract}
    >
      <b>{props.fullProblem.id + ": " + props.fullProblem.title}</b>
      <sup className="bg bg-success"></sup>
      <div
        className="abstract_requirements"
        dangerouslySetInnerHTML={{
          __html: md.render(props.fullProblem.abstract),
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
