import styles from "./AddProblem.module.css";
import { useState, useContext, useEffect } from "react";
import { ProblemsContext } from "../../../App";
import { AuthContext } from "../../../components/Layout/Layout";
import axios from "axios";
import { requestIP } from "../../../env";
import formatChapters from "../../../assets/js/parseProblemChapters";
import TypeOfProblem from "./Tabs/TypeOfProblem/TypeOfProblem";
import HelpModal from "./Tabs/HelpModal/HelpModal";
import HRsAndTitles from "./HRsAndTitles/HRsAndTitles";
import Buttons from "./Buttons/Buttons";
import Modal from "./Buttons/Modal/Modal";
import ProblemToBeAdded from "./ProblemToBeAdded/ProblemToBeAdded";
const AddProblem = (props) => {
  //in ProblemSummary
  const fromProblemContext = useContext(ProblemsContext);
  const { jwt } = useContext(AuthContext);

  const [chapters, setChapters] = useState({ ...fromProblemContext.chapters });
  const [selectedChapter, setSelectedChapter] = useState(-1);
  const [problemSummary, setProblemSummary] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemSource, setProblemSource] = useState("Folclor");
  const [showHelp, setShowHelp] = useState(false);
  // 0 - no, 1 - Save button, 2 - Finalize button
  const [showButtonModal, setShowButtonModal] = useState(0);

  const textareaSummaryValueModifiedHandler = (event) => {
    setProblemSummary(event.target.value);
  };

  const titleSummaryValueModifiedHandler = (event) => {
    setProblemTitle(event.target.value);
  };

  const chapterSummarySelectedHandler = (event) => {
    setSelectedChapter(event.target.value);
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

  //in ProponentSource
  const [proponentSource, setProponentSource] = useState("");
  const sourceModifiedHandler = (event) => {
    event.preventDefault();
    const source = event.target.value;
    setProponentSource(source);
  };

  // in SettingsComponent\
  const [timeLimit, setTimeLimit] = useState(0.01); // Seconds
  const [memoryLimit, setMemoryLimit] = useState(32); // MB
  const [stackMemoryLimit, setStackMemoryLimit] = useState(32); // MB

  const timeLimitModifiedHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setTimeLimit(value);
  };

  const memoryLimitModifiedHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setMemoryLimit(value);
  };

  const stackMemoryLimitModifiedHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setStackMemoryLimit(value);
  };

  // in Labels
  const [labels, setLabels] = useState({
    selectedLabels: [],
    customLabel: "",
  });

  const labelsModifiedHandler = (event) => {
    const value = event.target.value;
    // if label does not exist add it, else remove it
    if (!labels.selectedLabels.includes(value)) {
      setLabels({
        selectedLabels: [...labels.selectedLabels, value],
        customLabel: labels.customLabel,
      });
    } else {
      setLabels({
        selectedLabels: labels.selectedLabels.filter(
          (label) => label !== value
        ),
        customLabel: labels.customLabel,
      });
    }
  };

  const customLabelModifiedHandler = (event) => {
    const value = event.target.value;
    setLabels({
      selectedLabels: labels.selectedLabels,
      customLabel: value,
    });
  };

  // in Hints
  const [hints, setHints] = useState(
    "Această problemă nu are indicații de rezolvare."
  );

  const hintsModifiedHandler = (event) => {
    const value = event.target.value;
    setHints(value);
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

    //set default selected chapter to the first chapter in 9th year
    if (chapters["9"]) {
      const defaultId = chapters["9"][Object.keys(chapters["9"])[0]][0].id;
      setSelectedChapter(defaultId);
    }
  }, [chapters]);

  //when help modal is opened, image on the back cannot be scrolled
  const toggleHelpModal = () => {
    if (!showHelp) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }

    setShowHelp(!showHelp);
  };

  const toggleButtonsModal = (cod) => {
    setShowButtonModal(cod);
  };

  // ################# PROBLEM TYPE #################
  const [typeOfProblem, setTypeOfProblem] = useState("keyboardInput"); // may be: "keyboardInput", "fileInput", "function";

  const problemTypeModifiedHandler = (problemType) => {
    setTypeOfProblem(problemType);
    console.log(problemType);
  };
  // ################# END PROBLEM TYPE #################

  return (
    <>
      {showButtonModal === 1 ? (
        <Modal
          message="Dacă salvați progresul, veți avea posibilitatea de a relua adăugarea problemei din stadiul curent. Doriți salvarea progresului?"
          toggleModal={toggleButtonsModal}
        />
      ) : showButtonModal === 2 ? (
        <Modal
          message="Prin finalizarea problemei, aceasta va fi trimisă administratorului pentru aprobare. Doriți finalizarea problemei? "
          toggleModal={toggleButtonsModal}
        />
      ) : null}
      <Buttons toggleModal={toggleButtonsModal} />
      {showHelp ? <HelpModal toggleModal={toggleHelpModal} /> : null}
      <main className={styles.addProblemBackground}>
        <div className={styles.titleWrapper}>
          <span style={{ visibility: "hidden" }} className={styles.helpButton}>
            ajutor 📚
          </span>
          <h1 className={styles.title}>Adaugă o problemă</h1>
          <span className={styles.helpButton} onClick={toggleHelpModal}>
            ajutor 📚
          </span>
        </div>
        <HRsAndTitles title={"Tipul problemei"} />
        <TypeOfProblem
          problemType={typeOfProblem}
          changed={problemTypeModifiedHandler}
        />

        <ProblemToBeAdded
          inputType={typeOfProblem}
          chapters={chapters}
          selectedChapter={selectedChapter}
          chapterSummarySelectedHandler={chapterSummarySelectedHandler}
          problemSummary={problemSummary}
          textareaSummaryValueModifiedHandler={
            textareaSummaryValueModifiedHandler
          }
          problemTitle={problemTitle}
          titleSummaryValueModifiedHandler={titleSummaryValueModifiedHandler}
          problemSource={problemSource}
          sourceSummaryInputModifiedHandler={sourceSummaryInputModifiedHandler}
          requirements={requirements}
          textareaPreviewValueModifiedHandler={
            textareaPreviewValueModifiedHandler
          }
          labels={labels}
          labelsModifiedHandler={labelsModifiedHandler}
          customLabelModifiedHandler={customLabelModifiedHandler}
          hints={hints}
          hintsModifiedHandler={hintsModifiedHandler}
          proponentSource={proponentSource}
          sourceModifiedHandler={sourceModifiedHandler}
          timeLimit={timeLimit}
          timeLimitModifiedHandler={timeLimitModifiedHandler}
          memoryLimit={memoryLimit}
          memoryLimitModifiedHandler={memoryLimitModifiedHandler}
          stackMemoryLimit={stackMemoryLimit}
          stackMemoryLimitModifiedHandler={stackMemoryLimitModifiedHandler}
        />
      </main>
    </>
  );
};

export default AddProblem;
