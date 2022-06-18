import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TriedProblem from "./TriedProblem/TriedProblem";
import styles from "./UserTriedProblems.module.css";
import { AuthContext } from "../../../components/Layout/Layout";
import Loading from "../../UI/Loading/Loading";
import { ProblemsContext } from "../../../App";
import ajax from "../../../assets/js/ajax";

const UserTriedProblems = (props) => {
  const { jwt } = useContext(AuthContext);
  const fromProblemContex = useContext(ProblemsContext);
  const [solvedProblems, setSolvedProblems] = useState(
    fromProblemContex.solvedProblems
  );
  // fetch solved problems from server
  const fetchData = async () => {
    let answer = null;

    let problemIdsAndScore = await ajax(
      "https://infox.ro/new/users/problems",
      "get",
      jwt,
      {}
    );

    // for each problem id, get full problem requirements
    let requests = problemIdsAndScore.data.problemHistory.map((entry) =>
      ajax(
        "https://infox.ro/new/problems/full/" + entry.problem_id,
        "get",
        jwt,
        {}
      )
    );

    let problems = await axios.all(requests);
    answer = problems.map((respons, index) => {
      if (respons.data.success)
        return {
          id: respons.data.problem.id,
          title: respons.data.problem.title,
          score: problemIdsAndScore.data.problemHistory[index].points,
          abstract: respons.data.problem.abstract,
        };
    });

    fromProblemContex.setSolvedProblems({
      solvedProblemsArray: answer,
      lastFetched: Date.now(),
    });
  };

  useEffect(() => {
    if (
      fromProblemContex.solvedProblems.solvedProblemsArray === null ||
      Date.now() - fromProblemContex.solvedProblems.lastFetched >= 10000
    ) {
      fetchData();
    }
  }, [solvedProblems]);

  let problemList = [];

  if (
    fromProblemContex.solvedProblems.solvedProblemsArray !== null &&
    fromProblemContex.solvedProblems.solvedProblemsArray.length !== 0
  ) {
    problemList = fromProblemContex.solvedProblems.solvedProblemsArray.map(
      (problem) => {
        if (problem)
          return (
            <TriedProblem
              key={problem.id + Math.random().toString()}
              abstract={problem.abstract}
              score={problem.score}
              id={problem.id}
              title={problem.title}
            />
          );
      }
    );
  }
  problemList = problemList.length === 0 ? <Loading /> : problemList;

  return (
    <main>
      <div className={styles.title}>Probleme încercate sau rezolvate</div>
      <div className={styles.shapeProblem}>{problemList}</div>
    </main>
  );
};

export default UserTriedProblems;
