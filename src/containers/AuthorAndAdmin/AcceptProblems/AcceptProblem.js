import styles from "./AcceptProblems.module.css";
import useKatexParser from "../../../hooks/useKatexParser";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ajax from "../../../assets/js/ajax";
import useAuth from "../../../hooks/useAuth";

const AcceptProblems = (props) => {
  const navigate = useNavigate();
  const parser = useKatexParser();
  const [labels, setLabels] = useState();
  const { jwt } = useAuth();

  useEffect(() => {
    ajax(
      "https://infox.ro/new/lables/problem/" + props.id,
      "get",
      jwt,
      {}
    ).then((res) => {
      if (res?.data?.succes ?? false) {
        setLabels(res.data.labels);
      }
    });
  });

  const types = {
    console_io: "Date de la consolă",
    file_io: "Date scrise și citite din fișier",
    function: "Problemă de tip funcție",
    multiple_output: "Problemă cu output multiplu",
  };
  return (
    <div
      className={styles.problemWrapper}
      onClick={() =>
        navigate("/accept_problem/" + props.id, {
          state: { problem: { ...props.problem, labels: labels } },
        })
      }
    >
      <div>
        <b
          className={styles.problemTitle}
          dangerouslySetInnerHTML={{
            __html: parser(props.id + ": " + props.title),
          }}
        />
        <p className={styles.author}>
          Adăugată de <strong>{props.problem.author?.nickname}</strong>
        </p>
      </div>
      <p>
        <strong>Tipul problemei:</strong> <u>{types[props.type]}</u>
      </p>
      <p
        className={styles.abstract}
        dangerouslySetInnerHTML={{ __html: parser(props.abstract) }}
      />
    </div>
  );
};

export default AcceptProblems;
