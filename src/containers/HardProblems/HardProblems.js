import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/Layout/Layout";
import Loading from "../UI/Loading/Loading";
import SubchapterProblemAbstract from "../SubchapterProblems/SubchaperProblemAbstract/SubchapterProblemAbstract";
import stylesProblemList from "../SubchapterProblems/SubchapterProblems.module.css";
import Pagination from "../UI/Pagination/Pagination";
import ajax from "../../assets/js/ajax";

const HardProblems = (props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [problemsAbstract, setProblemsAbstract] = useState([]);
  const [loading, setLoading] = useState(false);
  const { jwt } = useContext(AuthContext);
  const [problemsFull, setProblemsFull] = useState([]);
  useEffect(() => {
    let shouldFetch = true;
    setLoading(true);
    if (shouldFetch) {
      ajax(
        "https://infox.ro/new/problems/hard?index=" + pageIndex * 50,
        "get",
        jwt,
        {}
      ).then((res) => {
        setProblemsAbstract(res.data.problems);
        setLoading(false);
      });
    }
    return () => {
      shouldFetch = false;
    };
  }, [pageIndex]);

  useEffect(async () => {
    let shouldFetch = true;
    setLoading(true);
    if (shouldFetch) {
      let requests = problemsAbstract.map((problem) => {
        return ajax(
          "https://infox.ro/new/problems/full/" + problem.id,
          "get",
          jwt,
          {}
        );
      });

      let problemsFullFromRequest = [];
      if (shouldFetch) {
        await axios.all(requests).then((responses) => {
          problemsFullFromRequest = responses.map((response) => {
            return response?.data.problem ?? null;
          });
        });
      }

      if (shouldFetch)
        setProblemsFull(problemsFullFromRequest.filter((pr) => pr !== null));
      setLoading(false);
    }
    return () => (shouldFetch = false);
  }, [problemsAbstract]);

  const incDecPageIndex = (value) => {
    if (!loading && pageIndex + value >= 0) {
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
      <div className={stylesProblemList.abstracts}>{toBeShown}</div>
      {loading ? null : (
        <Pagination nextPage={incDecPageIndex} pageIndex={pageIndex} />
      )}
    </main>
  );
};

export default HardProblems;
