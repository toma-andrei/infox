import { Link } from "react-router-dom";
import styles from "./ProposedProblem.module.css";
import useKatexParser from "../../../../hooks/useKatexParser";

const ProposedProblem = (props) => {
  let proposedProblemStyles = [styles.problem];
  const md = useKatexParser();

  proposedProblemStyles.push(
    props.approved ? styles.approved : styles.unapproved
  );

  return (
    <Link
      to={"/problems/display_problem/" + props.id}
      className={proposedProblemStyles.join(" ")}
    >
      <div>
        <b
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: props.id + ": " + md(props.title),
          }}
        ></b>
      </div>
      <p
        className={proposedProblemStyles.abstract}
        dangerouslySetInnerHTML={{ __html: md(props.abstract) }}
      />
    </Link>
  );
};

export default ProposedProblem;
