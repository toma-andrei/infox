import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { requestIP } from "../../env";
import { AuthContext } from "../../components/Layout/Layout";
import styles from "./SubchapterProblems.module.css";
import SubchapterProblemAbstract from "./SubchaperProblemAbstract/SubchapterProblemAbstract";
import { ProblemsContext } from "../../App";
import Loading from "../UI/Loading/Loading";

const SubchapterProblemsAbstract = (props) => {
  const { id } = useParams();
  const { jwt } = useContext(AuthContext);
  const [problems, setProblems] = useState([]);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: JSON.stringify({
        method: "get",
        url: "https://infox.ro/new/problems/problems/" + id,
        jwt: jwt,
      }),
    }).then((res) => {
      setProblems(res.data.problems);
    });
  }, []);

  useEffect(async () => {
    let requests = problems.map((problem) => {
      return axios.post(
        "http://" + requestIP,
        JSON.stringify({
          method: "get",
          url: "https://infox.ro/new/problems/full/" + problem.id,
          jwt: jwt,
        })
      );
    });

    let problemSolutions = [];
    await axios.all(requests).then((responses) => {
      problemSolutions = responses.map((response) => {
        return response.data.problem;
      });
    });

    setSolutions(problemSolutions);
  }, [problems]);

  let problemsList = [];
  console.log(solutions);
  if (solutions.length) {
    problemsList = solutions.map((solution, index) => {
      return (
        <SubchapterProblemAbstract
          key={solution.id}
          fullProblem={solutions[index]}
        />
      );
    });
  }

  let toBeShown = problemsList.length === 0 ? <Loading /> : problemsList;

  return (
    <main>
      <div className={styles.abstracts}>{toBeShown}</div>
    </main>
  );
};

export default SubchapterProblemsAbstract;
