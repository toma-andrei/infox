import parseProblemRequirements from "../../../../assets/js/parseProblemRequirements";
import styles from "../SpecificProblem.module.css";

/**
 * Specific Problem Page Requirement Tab
 * Parse problem string
 */

const ProblemRequirements = (props) => {
  let problem = props.problem;

  let data = parseProblemRequirements(problem.full);
  console.log(data);
  return (
    <div
      className={styles.tabcontent}
      style={{ display: props.show ? "block" : "none" }}
    >
      <div className={styles.problem}>
        <div className={styles.problem_meta}>
          <h2>
            {problem.id}. {problem.title}
          </h2>
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
