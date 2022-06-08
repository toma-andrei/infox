import styles from "../SpecificProblem.module.css";
import useKatexParser from "../../../../hooks/useKatexParser";
import parseMermaidText from "../../../../assets/js/parseMermaidText";
import Labels from "../../LabelsShort/Labels";
import { useEffect } from "react";
/**
 * Specific Problem Page Requirement Tab
 * Parse problem string
 */

const ProblemRequirements = (props) => {
  let problem = props.problem;
  if (typeof problem.metadata === "string")
    problem.metadata = JSON.parse(problem.metadata);
  const md = useKatexParser();
  let full = problem.full;
  let data = parseMermaidText(full);

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
        <div className={styles.problem_meta}>
          <h2
            dangerouslySetInnerHTML={{
              __html: problem.id + ". " + md(problem.title),
            }}
          />
          <Labels labels={props.problem.labels} />
          <div style={{ margin: "10px 0 10px 0" }}></div>
          <table
            className={[styles.problem_meta, styles.problem_page_table].join(
              " "
            )}
          >
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
                {props.metadataIdentifiers.map((th) => (
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
                        ? problem.metadata.limita_timp + " secunde" ??
                          "limita timp"
                        : th.corespondent === "memory"
                        ? problem.metadata.limita_memorie +
                          " MB / " +
                          problem.metadata.limita_memorie_pe_stiva +
                          " MB"
                        : ""
                      : problem[th.corespondent]}
                  </td>
                ))}
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
