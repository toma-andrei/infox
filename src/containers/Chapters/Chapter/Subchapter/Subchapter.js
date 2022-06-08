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
  const [triedCount, setTriedCount] = useState(0);

  //fetch problems for this subchapter to check problem number and solved status
  useState(() => {
    let shouldFetch = true;
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: JSON.stringify({
        jwt: jwt,
        method: "get",
        url: "https://infox.ro/new/problems/problems/" + props.id,
      }),
    }).then((res) => {
      if (shouldFetch) setProblems([...res.data.problems]);
    });

    //this function returned here is called when component unmounts
    return () => (shouldFetch = false);
  });

  //when problems and solvedProblems are loaded, count solved problems
  useEffect(() => {
    let shouldFetch = true;
    if (problems.length > 0 && props.solvedProblemsIds) {
      const ids = props.solvedProblemsIds;
      let solved = 0;
      let tried = 0;

      // count solved and tried problems
      problems.forEach((problem) => {
        let idd = ids.find((id) => id.problem_id === problem.id);
        if (idd && parseInt(idd.points) === 100) solved++;
        else tried++;
      });

      if (shouldFetch) {
        let problemData = problems.filter((pr) => {
          return true;
        });

        setSolvedCount(solved);
        setTriedCount(tried);
      }

      return () => (shouldFetch = false);
    }
  }, [props.solvedProblemsIds, problems]);

  return (
    <Link
      className={styles.card}
      to={"/problems/display_subchapter/" + props.id}
    >
      <div className={styles.card_title}>{props.title}</div>
      <div className={styles.stats}>
        Probleme existente: {problems.length} <br /> Probleme rezolvate:{" "}
        {solvedCount} <br />{" "}
        {triedCount !== 0 ? "Probleme încercate: " + triedCount : null}
        <br />
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
