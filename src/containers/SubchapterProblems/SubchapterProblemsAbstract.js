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
  const [problemsAbstract, setProblemsAbstract] = useState([]);
  const [problemsFull, setProblemsFull] = useState([]);

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
      setProblemsAbstract(res.data.problems);
    });
  }, []);

  useEffect(async () => {
    let requests = problemsAbstract.map((problem) => {
      return axios.post(
        "http://" + requestIP,
        JSON.stringify({
          method: "get",
          url: "https://infox.ro/new/problems/full/" + problem.id,
          jwt: jwt,
        })
      );
    });

    let problemsFullFromRequest = [];
    await axios.all(requests).then((responses) => {
      problemsFullFromRequest = responses.map((response) => {
        return response.data.problem;
      });
    });
    setProblemsFull(problemsFullFromRequest);
  }, [problemsAbstract]);

  let problemsList = [];

  if (problemsFull.length) {
    problemsList = problemsFull.map((problem, index) => {
      return (
        <SubchapterProblemAbstract
          key={problem.id}
          fullProblem={problemsFull[index]}
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
