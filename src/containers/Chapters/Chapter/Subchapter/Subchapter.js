import { useState, useEffect } from "react";
import styles from "../../Chapters.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { requestIP } from "../../../../env";
import useAuth from "../../../../hooks/useAuth";

//card for each chapter (like Structura liniara, Structura repetitiva)
const Subchapter = (props) => {
  const [problems, setProblems] = useState([]);
  const { jwt } = useAuth();
  const [solvedCount, setSolvedCount] = useState(0);
  //fetch problems for this subchapter to check problem number and solved status
  useState(() => {
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: JSON.stringify({
        jwt: jwt,
        method: "get",
        url: "https://infox.ro/new/problems/problems/" + props.id,
      }),
    }).then((res) => {
      setProblems([...res.data.problems]);
    });
  });

  //when problems and solvedProblems are loaded, count solved problems
  useEffect(() => {
    if (problems.length > 0 && props.solvedProblemsIds) {
      const ids = props.solvedProblemsIds.map((pr) => {
        return pr.problem_id;
      });

      const solved = problems.filter((pr) => ids.includes(pr.id));
      setSolvedCount(solved.length);
    }
  }, [props.solvedProblemsIds, problems]);

  return (
    <Link
      className={styles.card}
      to={"/problems/display_subchapter/" + props.id}
    >
      <div className={styles.card_title}>{props.title}</div>
      <div className={styles.stats}>
        Probleme existente: {problems.length} <br /> Probleme rezolvate{" "}
        {solvedCount} <br /> <br />
      </div>
      <div className={styles.percent}>
        {problems.length / solvedCount
          ? ((solvedCount / problems.length) * 100).toFixed(0)
          : 0}{" "}
        %
      </div>
    </Link>
  );
};

export default Subchapter;
