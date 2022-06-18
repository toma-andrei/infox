import styles from "../SpecificProblem.module.css";
import useKatexParser from "../../../../hooks/useKatexParser";
import parseMermaidText from "../../../../assets/js/parseMermaidText";
import Labels from "../../LabelsShort/Labels";
import { useEffect } from "react";
import { useNavigate } from "react-router";
/**
 * Specific Problem Page Requirement Tab
 * Parse problem string
 */

const ProblemRequirements = (props) => {
  let problem = props.problem;
  const md = useKatexParser();
  let full = problem.full;
  let data = parseMermaidText(full);

  const navigate = useNavigate();

  useEffect(() => {
    let shouldFetch = true;
    if (shouldFetch) window.scrollTo(0, 0);

    return () => {
      shouldFetch = false;
    };
  }, []);

  return (
    <div
      className={styles.tabcontent}
      style={{ display: props.show ? "block" : "none" }}
    >
      <div className={styles.problem}>
        <div className={styles.metas}>
          <h2
            dangerouslySetInnerHTML={{
              __html: problem.id + ". " + md(problem.title),
            }}
          />
          <Labels labels={props.problem.labels} />
          <div style={{ margin: "10px 0 10px 0" }}></div>
          <table className={[styles.metas, styles.metaTable].join(" ")}>
            <thead>
              <tr>
                {props.metadataIdentifiers.map((th) => (
                  <th key={th.th} style={{ width: "fit-content" }}>
                    {th.th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  data-label={props.metadataIdentifiers[0].th}
                  key={props.metadataIdentifiers[0].th}
                  className={styles.isLink}
                  onClick={() => {
                    navigate("/problems/author/" + props.problemCreator.id);
                  }}
                >
                  {props.problemCreator?.nickname ?? "autor"}
                </td>
                <td
                  data-label={props.metadataIdentifiers[1].th}
                  key={props.metadataIdentifiers[1].th}
                >
                  {props.problem?.source ?? "sursa"}
                </td>
                <td
                  data-label={props.metadataIdentifiers[2].th}
                  key={props.metadataIdentifiers[2].th}
                >
                  {props.problemMeta?.class ?? "clasa"}
                </td>
                <td
                  data-label={props.metadataIdentifiers[3].th}
                  key={props.metadataIdentifiers[3].th}
                >
                  {props.problemMeta?.subchapter ?? "subcapitol"}
                </td>
                <td
                  data-label={props.metadataIdentifiers[4].th}
                  key={props.metadataIdentifiers[4].th}
                >
                  {props.problemMeta?.chapter ?? "capitol"}
                </td>
                <td
                  data-label={props.metadataIdentifiers[5].th}
                  key={props.metadataIdentifiers[5].th}
                >
                  {props.problem?.limit_time +
                    (props.problem?.limit_time >= 1
                      ? " milisecunde"
                      : " secunde") ?? "limita timp"}
                </td>
                <td
                  data-label={props.metadataIdentifiers[6].th}
                  key={props.metadataIdentifiers[6].th}
                >
                  {props.problem?.limit_memory + " MB" ?? "memorie"} /{" "}
                  {props.problem?.limit_stack + " MB" ?? "stiva"}
                </td>
                {/* {props.metadataIdentifiers.map((th) => (
                  <td data-label={th.th} key={th.th}>
                    {problem[th.corespondent] === undefined
                      ? th.corespondent === "nickname"
                        ? props.problemCreator?.nickname ?? "autor"
                        : th.corespondent === "class"
                        ? props.problemMeta?.class ?? "clasa"
                        : th.corespondent === "subchapter"
                        ? props.problemMeta?.subchapter ?? "subcapitol"
                        : th.corespondent === "chapter"
                        ? props.problemMeta?.chapter ?? "capitol"
                        : th.corespondent === "time"
                        ? problem.limit_memory + " secunde" ?? "limita timp"
                        : th.corespondent === "memory"
                        ? problem.limit_memory +
                          " MB / " +
                          problem.limit_stack +
                          " MB"
                        : ""
                      : problem[th.corespondent]}
                  </td>
                ))} */}
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="problem_text"
          dangerouslySetInnerHTML={{ __html: md(data) }}
        ></div>
      </div>
    </div>
  );
};

export default ProblemRequirements;
