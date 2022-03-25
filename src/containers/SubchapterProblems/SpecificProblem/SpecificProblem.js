import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useLocation, useParams } from "react-router";
import { AuthContext } from "../../../components/Layout/Layout";
import { requestIP } from "../../../env";
import Loading from "../../UI/Loading/Loading";
import Unapproved from "./Unapproved/Unapproved";
import styles from "./SpecificProblem.module.css";
import Requirements from "./Tabs/Requirements";
import OwnSolutions from "./Tabs/OwnSolutions";
import ProblemHints from "./Tabs/ProblemHints";
import CorrectSolutions from "./Tabs/CorrectSolutions";
import ProblemDiscussions from "./Tabs/ProblemDiscussions";

/**
 * @param props empty object (nothing given from parent component)
 */

const SpecificProblem = (props) => {
  const [problem, setProblem] = useState(useLocation().state);
  const { id } = useParams();
  const { jwt } = useContext(AuthContext);

  const [tabs, setTabs] = useState([
    { className: [styles.tablink, styles.active], text: "Enunț", show: true },
    {
      className: [styles.tablink],
      text: "Soluțiile tale + Adaugă soluție",
      show: false,
    },
    {
      className: [styles.tablink],
      text: "Indicații + Teste de evaluare",
      show: false,
    },
    { className: [styles.tablink], text: "Soluții corecte", show: false },
    { className: [styles.tablink], text: "Discuții", show: false },
  ]);

  //table heads on problem tabs and its corespondent in data fetched from server
  const tHeads = [
    { th: "Autor", corespondent: "author_id" },
    { th: "Sursa problemei", corespondent: "source" },
    { th: "Clasa", corespondent: "" },
    { th: "Capitol", corespondent: "" },
    { th: "Subcapitol", corespondent: "" },
    { th: "Limită de timp", corespondent: "" },
    { th: "Limită de memorie", corespondent: "" },
  ];

  const fetchProblemSolutions = async () => {
    const response = await axios.post("http://" + requestIP, {
      method: "get",
      jwt: jwt,
      url: "https://infox.ro/new/solutions/problem/" + id,
    });

    //sort solutions for the current problem by date it was created
    problem.solutions = response.data.solutions.sort((a, b) => {
      let aa = new Date(a.created_at);
      let bb = new Date(b.created_at);

      return aa < bb ? 1 : aa > bb ? -1 : 0;
    });

    setProblem(problem);
  };

  const fetchProblemRequirements = async () => {
    let answer = null;

    let axiosPostAnswer = await axios.post(
      "http://" + requestIP,
      JSON.stringify({
        method: "get",
        url: "https://infox.ro/new/problems/full/" + id,
        jwt: jwt,
      })
    );

    answer = axiosPostAnswer.data.problem;

    return answer;
  };

  useEffect(() => {
    if (problem === null) {
      fetchProblemRequirements().then((response) => {
        setProblem(response);
      });
    }
  }, []);

  useEffect(() => {
    fetchProblemSolutions();
  }, [problem]);

  /**
   * Sets styles to the active tab
   */
  const toggleActive = (index) => {
    let tabsCopy = tabs.map((tab) => {
      return { className: [styles.tablink], text: tab.text, show: false };
    });
    tabsCopy[index].className.push(styles.active);
    tabsCopy[index].show = true;
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
        <Requirements
          problem={problem}
          metadataIdentifiers={tHeads}
          show={tabs[0].show}
        />
        <OwnSolutions
          show={tabs[1].show}
          solutions={problem.solutions}
          jwt={jwt}
          id={id}
        />
        <ProblemHints show={tabs[2].show} />
        <CorrectSolutions show={tabs[3].show} />
        <ProblemDiscussions show={tabs[4].show} />
      </div>
    )
  ) : (
    <Loading />
  );

  return <main>{toBeShown}</main>;
};

export default SpecificProblem;
