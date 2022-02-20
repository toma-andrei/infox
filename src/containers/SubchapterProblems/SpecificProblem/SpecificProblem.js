import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useLocation, useParams } from "react-router";
import { AuthContext } from "../../../components/Layout/Layout";
import { requestIP } from "../../../env";
import Loading from "../../UI/Loading/Loading";
import Unapproved from "./Unapproved/Unapproved";
import styles from "./SpecificProblem.module.css";

const SpecificProblem = (props) => {
  const [problem, setProblem] = useState(useLocation().state);

  const [tabs, setTabs] = useState([
    { className: [styles.tablink, styles.active], text: "Enunț" },
    { className: [styles.tablink], text: "Soluțiile tale + Adaugă soluție" },
    { className: [styles.tablink], text: "Indicații + Teste de evaluare" },
    { className: [styles.tablink], text: "Soluții corecte" },
    { className: [styles.tablink], text: "Discuții" },
  ]);

  const { id } = useParams();
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    if (problem === null) {
      const getProblem = async () => {
        let problemPromise = null;
        await axios
          .post(
            "http://" + requestIP,
            JSON.stringify({
              method: "get",
              url: "https://infox.ro/new/problems/full/" + id,
              jwt: jwt,
            })
          )
          .then((response) => {
            problemPromise = response.data.problem;
          });

        return problemPromise;
      };
      getProblem().then((response) => {
        setProblem(response);
      });
    }
  }, []);

  const toggleActive = (index) => {
    let tabsCopy = tabs.map((tab) => {
      return { className: [styles.tablink], text: tab.text };
    });
    tabsCopy[index].className.push(styles.active);

    setTabs(tabsCopy);
  };

  let toBeShown = problem ? (
    problem.approved === "0" ? (
      <Unapproved />
    ) : (
      <div className={styles.problem_page}>
        <div className="tab">
          {tabs.map((tab, index) => (
            <button
              className={tab.className.join(" ")}
              key={tab.text}
              onClick={() => toggleActive(index)}
            >
              {tab.text}
            </button>
          ))}
        </div>
      </div>
    )
  ) : (
    <Loading />
  );

  return <main>{toBeShown}</main>;
};

export default SpecificProblem;