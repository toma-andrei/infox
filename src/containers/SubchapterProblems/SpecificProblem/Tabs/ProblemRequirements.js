import parseProblemRequirements from "../../../../assets/js/parseProblemRequirements";
import styles from "../SpecificProblem.module.css";
import useKatexParser from "../../../../hooks/useKatexParser";
/**
 * Specific Problem Page Requirement Tab
 * Parse problem string
 */

const ProblemRequirements = (props) => {
  let problem = props.problem;
  const md = useKatexParser();
  let data = parseProblemRequirements(problem.full);

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
          <table
            className={[styles.problem_meta, styles.problem_page_table].join(
              " "
            )}
          >
            <thead>
              <tr>
                {props.metadataIdentifiers.map((th) => (
                  <th key={th.th}>{th.th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {props.metadataIdentifiers.map((th) => (
                  <td data-label={th.th} key={th.th}>
                    {problem[th.corespondent] === undefined
                      ? "???"
                      : problem[th.corespondent]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="problem_text"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </div>
  );
};

export default ProblemRequirements;
