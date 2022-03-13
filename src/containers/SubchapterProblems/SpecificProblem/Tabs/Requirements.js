import styles from "../SpecificProblem.module.css";

/**
 * Specific Problem Page Requirement Tab
 */
const Requirements = (props) => {
  let problem = props.problem;
  let data = [];
  let delimiter = "### ";

  let lastDelimiterPosition = problem.full.indexOf("### Exemplu");

  let index = 0;

  while (true) {
    let delimiterAppearance = problem.full
      .split(delimiter, index + 1)
      .join(delimiter).length;

    if (delimiterAppearance !== lastDelimiterPosition) {
      data.push(
        problem.full
          .slice(
            delimiterAppearance + 4,
            problem.full.split(delimiter, index + 2).join(delimiter).length
          )
          .split("\n\n")
      );
    } else {
      data.push(
        problem.full
          .slice(
            problem.full.split(delimiter, index + 1).join(delimiter).length + 4,
            problem.full.length
          )
          .split("\n\n")
      );
      break;
    }
    index++;
  }

  console.log(problem.full);
  console.log(data);

  return (
    <div className={styles.tabcontent} style={{ display: "block" }}>
      <div className={styles.problem}>
        <div className={styles.problem_meta}>
          <h2>
            {problem.id}: {problem.title}
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
        <div className="problem_text">
          {data.map((title) => (
            <h3 key={title[0]}>{title[0]}</h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requirements;
