import { Link } from "react-router-dom";
import styles from "./ProposedProblem.module.css";
import useKatexParser from "../../../../hooks/useKatexParser";
import { useNavigate } from "react-router";
import SpecificProblem from "../../../SubchapterProblems/SpecificProblem/SpecificProblem";
const ProposedProblem = (props) => {
  let proposedProblemStyles = [styles.problem];
  const md = useKatexParser();
  const navigate = useNavigate();
  proposedProblemStyles.push(
    props.approved ? styles.approved : styles.unapproved
  );

  return (
    // <Link
    //   to={"/problems/display_problem/" + props.id}
    //   className={proposedProblemStyles.join(" ")}
    // >
    <div className={[styles.wrapper, ...proposedProblemStyles].join(" ")}>
      <div>
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
      </div>
      <div className={styles.downButtons}>
        <button
          className={styles.button}
          onClick={() => navigate("/addProblem/editor/" + props.id)}
        >
          Editeaza
        </button>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/problems/display_problem/" + props.id, {
              replace: false,
            });
          }}
        >
          Pagina problemei
        </button>
      </div>
    </div>
    // </Link>
  );
};

export default ProposedProblem;
