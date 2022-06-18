import { useEffect, useState } from "react";
import axios from "axios";
import { requestIP } from "../../../../env";
import styles from "./ProblemHints.module.css";
import useAuth from "../../../../hooks/useAuth";
import useKatexParser from "../../../../hooks/useKatexParser";

const ProblemHints = (props) => {
  const { jwt } = useAuth();
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");
  const parseHints = useKatexParser();

  useEffect(() => {
    let shouldFetch = true;
    if (shouldFetch) {
      axios({
        method: "post",
        url: "http://" + requestIP,
        data: JSON.stringify({
          method: "get",
          url: "https://infox.ro/new/tests/" + props.id,
          jwt: jwt,
        }),
      }).then((response) => {
        if (!response.data.success) {
          setError(
            "A apărut o eroare la încărcarea testelor de evaluare. Lucrăm pentru remedierea acestei probleme."
          );
        } else {
          if (response.data.length !== 0) {
            let temp = [];
            for (let i in Object.keys(response.data)) {
              if (response.data[i]) {
                temp.push(response.data[i]);
              }
            }
            setTests(temp);
          }
        }
      });
    }
  }, []);

  useEffect(() => {}, [tests]);

  return (
    <div
      className={styles.hintsPage}
      style={!props.show ? { display: "none" } : {}}
    >
      <div className={styles.title}>Indicații de rezolvare</div>
      <div
        className={styles.hintText}
        dangerouslySetInnerHTML={{
          __html: parseHints(
            props.hints?.length === 0
              ? "Această problemă nu are indicații de rezolvare."
              : props.hints
          ),
        }}
      />
      <div className={styles.title}>Teste de evaluare</div>
      <div className={styles.tests}>
        {error !== ""
          ? error
          : tests.map((test, index) => {
              const file = new Blob([test.in], { type: "text/plain" });
              return (
                <div className={styles.testWrapper} key={index}>
                  <span className={styles.testText}>Testul {index}: </span>
                  <a
                    href={URL.createObjectURL(file)}
                    download={index + "-in.txt"}
                  >
                    {index + "-in.txt"}
                  </a>
                  <br />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ProblemHints;
