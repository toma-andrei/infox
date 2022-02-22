import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { requestIP } from "../../env";
import { AuthContext } from "../../components/Layout/Layout";
import Loading from "../UI/Loading/Loading";
import SubchapterProblemAbstract from "../SubchapterProblems/SubchaperProblemAbstract/SubchapterProblemAbstract";
import stylesProblemList from "../SubchapterProblems/SubchapterProblems.module.css";
import styles from "./HardProblems.module.css";

const HardProblems = (props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [problemsAbstract, setProblemsAbstract] = useState([]);
  const [loading, setLoading] = useState(false);
  const { jwt } = useContext(AuthContext);
  const [problemsFull, setProblemsFull] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: {
        method: "get",
        url: "https://infox.ro/new/problems/hard?index=" + pageIndex * 50,
        jwt: jwt,
      },
    }).then((res) => {
      setProblemsAbstract(res.data.problems);
      setLoading(false);
    });
  }, [pageIndex]);

  useEffect(async () => {
    setLoading(true);
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

    // console.log(problemsFullFromRequest);
    setProblemsFull(problemsFullFromRequest);
    setLoading(false);
  }, [problemsAbstract]);

  const incDecPageIndex = (value) => {
    if (pageIndex != 0) {
      setPageIndex(pageIndex + value);
    }
  };

  let toBeShown = loading ? (
    <Loading />
  ) : (
    problemsFull.map((problem) => {
      if (problem !== undefined) {
        return (
          <SubchapterProblemAbstract key={problem.id} fullProblem={problem} />
        );
      }
    })
  );

  return (
    <main>
      <div className={styles.arrows}>
        <div className={styles.arrowSpans}>
          <span className={styles.arrow}>{"<"}</span>
          <span className={styles.number}>{pageIndex}</span>
          <span className={styles.right}>{">"}</span>
        </div>
      </div>
      <div className={stylesProblemList.abstracts}>{toBeShown}</div>
    </main>
  );
};

export default HardProblems;
