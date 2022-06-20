import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../components/Layout/Layout";
import styles from "./SubchapterProblems.module.css";
import SubchapterProblemAbstract from "./SubchaperProblemAbstract/SubchapterProblemAbstract";
import { ProblemsContext } from "../../App";
import Loading from "../UI/Loading/Loading";
import NoExistentProblems from "./NoExistentProblem/NoExistentProblems";
import ajax from "../../assets/js/ajax";

const SubchapterProblemsAbstract = (props) => {
  const { id, searchString, labelId, authorId } = useParams();
  const { jwt } = useContext(AuthContext);
  const [problemsAbstract, setProblemsAbstract] = useState([]);
  const [problemsFull, setProblemsFull] = useState([]);
  const [areProblemsInThisSubchapter, setAreProblemsInThisSubchapter] =
    useState(true);
  const [authorHead, setAuthorHead] = useState(null);
  const [labelName, setLabelName] = useState(null);
  //fetch problems abstract requirements for this subchapter
  useEffect(() => {
    let shouldFetch = true;

    const url = searchString
      ? props.url + "?searchString=" + searchString
      : labelId
      ? props.url + labelId
      : authorId
      ? props.url + authorId
      : "https://infox.ro/new/problems/problems/" + id;

    ajax(url, "get", jwt, {}).then((res) => {
      if (shouldFetch) {
        if (res.data.problems.length === 0) {
          setAreProblemsInThisSubchapter(false);
        }
        if (shouldFetch) setProblemsAbstract(res.data.problems);
      }
    });
    if (authorId && shouldFetch) {
      ajax(
        "https://infox.ro/new/users/profile/head/" + authorId,
        "get",
        jwt,
        {}
      ).then((res) => {
        if (shouldFetch) setAuthorHead(res.data);
      });
    }

    if (labelId && shouldFetch) {
      ajax("https://infox.ro/new/labels/" + labelId, "get", jwt, {}).then(
        (res) => {
          if (shouldFetch) setLabelName(res.data);
        }
      );
    }
    return () => (shouldFetch = false);
  }, []);

  //create an array of post requests
  useEffect(async () => {
    let shouldFetch = true;
    let requests = problemsAbstract.map((problem) => {
      return ajax(
        "https://infox.ro/new/problems/full/" + problem.id,
        "get",
        jwt,
        {}
      );
    });

    let problemsFullFromRequest = [];

    await axios.all(requests).then((responses) => {
      problemsFullFromRequest = responses.map((response) => {
        return response?.data?.problem ?? null;
      });
    });

    if (shouldFetch)
      setProblemsFull(problemsFullFromRequest.filter((pr) => pr !== null));

    return () => (shouldFetch = false);
  }, [problemsAbstract]);

  let problemsList = [];

  if (problemsFull.length) {
    problemsList = problemsFull.map((problem, index) => {
      if (!problem) {
        return null;
      }
      return (
        <SubchapterProblemAbstract
          key={problem.id}
          fullProblem={problemsFull[index]}
        />
      );
    });
  }

  let toBeShown = !areProblemsInThisSubchapter ? (
    <NoExistentProblems />
  ) : problemsFull.length === 0 ? (
    <Loading />
  ) : (
    problemsList
  );

  return (
    <main>
      {authorId ? (
        <div className={styles.title}>
          Probleme adăugate de {authorHead?.nickname ?? ""}
        </div>
      ) : null}
      {labelId ? (
        <div className={styles.title}>
          Probleme cu eticheta {"'" + labelName?.label + "'" ?? ""}
        </div>
      ) : null}
      <div className={styles.abstracts}>{toBeShown}</div>
    </main>
  );
};

export default SubchapterProblemsAbstract;
