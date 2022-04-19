import styles from "./AddProblem.module.css";
import { useState, useContext, useEffect } from "react";
import ProblemSummary from "./Tabs/ProblemSummary/ProblemSummary";
import RequirementsAndPreview from "./Tabs/RequirementsAndPreview/RequirementsAndPreview";
import { ProblemsContext } from "../../../App";
import { AuthContext } from "../../../components/Layout/Layout";
import axios from "axios";
import { requestIP } from "../../../env";
import formatChapters from "../../../assets/js/parseProblemChapters";

const AddProblem = (props) => {
  //in ProblemSummary
  const fromProblemContext = useContext(ProblemsContext);
  const { jwt } = useContext(AuthContext);
  const [chapters, setChapters] = useState({ ...fromProblemContext.chapters });
  const [problemSummary, setProblemSummary] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemSource, setProblemSource] = useState("Folclor");

  const textareaSummaryValueModifiedHandler = (event) => {
    setProblemSummary(event.target.value);
  };

  const titleSummaryValueModifiedHandler = (event) => {
    setProblemTitle(event.target.value);
  };

  const chapterSummarySelectedHandler = (event) => {
    console.log(event.target.value);
  };

  const sourceSummaryInputModifiedHandler = (event) => {
    setProblemSource(event.target.value);
  };

  //in RequirementsAndPreview
  const [requirements, setRequirements] = useState(`### Cerință

  Aici se va introduce cerinta problemei
  
  ### Date de intrare
  
  - Aici se vor introduce detalii privind datele de intrare (tipul lor, ordinea in care sunt furnizate, etc.)
  - Un al doilea detaliu
  
  ### Date de ieșire
  
  - Aici se vor introduce detalii privind datele de iesire (tipul lor, ordinea in care se doresc, etc.)
  - Un al doilea detaliu
  
  ### Precizări
  
  Aici se vor adauga precizari suplimentare, restrictii, etc.
  
  ### Exemplu
  
  #### Intrare:
      Aici vor fi introduse datele de intrare pentru un exemplu.
  
  ---
  
  #### Ieșire:
      Aici vor fi introduse datele de iesire pentru inputul de mai sus.
  
  ---
  
  #### Explicații:
      Aici vor fi introduse explicații suplimentare relative la exemplul dat, dacă se consideră a fi necesare.
  `);

  const textareaPreviewValueModifiedHandler = (event) => {
    event.preventDefault();
    setRequirements(event.target.value);
  };

  useEffect(() => {
    const years = [];

    //if chapters were not fetched before, prepare for fetching
    if (fromProblemContext.chapters[9] === undefined) {
      years.push("9");
    }
    if (fromProblemContext.chapters[10] === undefined) {
      years.push("10");
    }
    if (fromProblemContext.chapters[11] === undefined) {
      years.push("11");
    }

    const fetchProblems = (year) => {
      return axios({
        method: "post",
        url: "http://" + requestIP,
        data: JSON.stringify({
          url: "https://infox.ro/new/problems/chapters/" + year,
          method: "get",
          jwt: jwt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

    //create an array of promises with response for each chapter
    let promises = years.map((year) =>
      chapters[year] === undefined ? fetchProblems(year) : null
    );

    //resolve all promises and set chapter state.
    //This will trigger useEffect to set chapters in context
    for (let i = 0; i < promises.length; i++) {
      if (promises[i]) {
        promises[i].then((res) => {
          let formatedChapters = formatChapters(
            res.data.chapters,
            res.data.chapters[0].class
          );
          setChapters((prev) => {
            return { ...prev, ...formatedChapters };
          });
        });
      }
    }
  }, []);

  //for each chapter, set chapters in problemContext
  useEffect(() => {
    fromProblemContext.setChapters(chapters);
  }, [chapters]);

  return (
    <main className={styles.addProblemBackground}>
      <h1 className={styles.title}>Adaugă o problemă</h1>
      <hr className={styles.horizontalRule}></hr>
      <ProblemSummary
        states={{
          chapters: chapters,
          setChapters: chapterSummarySelectedHandler,
          problemSummary: problemSummary,
          setProblemSummary: textareaSummaryValueModifiedHandler,
          problemTitle: problemTitle,
          setProblemTitle: titleSummaryValueModifiedHandler,
          problemSource: problemSource,
          setProblemSource: sourceSummaryInputModifiedHandler,
        }}
      />
      <hr className={styles.horizontalRule} style={{ marginTop: "20px" }}></hr>
      <h2 className={styles.title}>Cerința și previzualizare</h2>
      <hr
        className={styles.horizontalRule}
        style={{ marginBottom: "20px" }}
      ></hr>
      <RequirementsAndPreview
        req={{
          requirements: requirements,
          modifiedHandler: textareaPreviewValueModifiedHandler,
        }}
      />
    </main>
  );
};

export default AddProblem;
