import { useEffect, useState } from "react";
import ajax from "../../../assets/js/ajax";
import useAuth from "../../../hooks/useAuth";
import styles from "./AcceptProblems.module.css";
import AcceptProblem from "./AcceptProblem";

const AcceptProblems = (props) => {
  const [problems, setProblems] = useState([]);
  const [authors, setAuthors] = useState({});
  const { jwt } = useAuth();
  useEffect(() => {
    ajax("https://infox.ro/new/new/authors/unapproved", "get", jwt, {}).then(
      (res) => {
        if (res?.data?.success) {
          setProblems(res.data.problems);

          res.data.problems.forEach((pr) => {
            if (!Object.keys(authors).includes(pr.author_id)) {
              ajax(
                "https://infox.ro/new/users/profile/head/" + pr.author_id,
                "get",
                jwt,
                {}
              ).then((res) => {
                if (res?.data?.success) {
                  setAuthors((prevState) => ({
                    ...prevState,
                    [pr.author_id]: res.data,
                  }));
                }
              });
            }
          });
        }
      }
    );
  }, []);

  return (
    <main>
      <div className={styles.title}>Probleme de acceptat</div>
      <div className={styles.allProblemsWrapper}>
        {problems.map((pr) => (
          <AcceptProblem
            key={pr.id}
            title={pr.title}
            abstract={pr.abstract}
            id={pr.id}
            type={pr.type}
            problem={{ problem: pr, author: { ...authors[pr.author_id] } }}
          />
        ))}
      </div>
    </main>
  );
};

export default AcceptProblems;
