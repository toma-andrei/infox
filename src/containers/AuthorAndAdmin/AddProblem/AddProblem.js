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
import { useParams } from "react-router";

const AddProblem = (props) => {
  // ################# PROBLEM SUMMARY COMPONENT #################
  const id = useParams().id;
  const fromProblemContext = useContext(ProblemsContext);
  const { jwt } = useContext(AuthContext);
  const [chapters, setChapters] = useState({ ...fromProblemContext.chapters });
  const [selectedChapter, setSelectedChapter] = useState(-1);
  const [problemSummary, setProblemSummary] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemSource, setProblemSource] = useState("Folclor");
  const [showHelp, setShowHelp] = useState(false);
  const [problemId, setProblemId] = useState(parseInt(id));
  // 0 - no, 1 - Save button, 2 - Finalize button
  const [showButtonModal, setShowButtonModal] = useState(0);
  const [savedWithSuccess, setSavedWithSuccess] = useState(false);
  const [finalizedWithSuccess, setFinalizedWithSuccess] = useState(false);

  //if the url has an id, it means that the problem is being edited
  useEffect(() => {
    if (problemId) {
      axios({
        method: "post",
        url: "http://" + requestIP,
        data: {
          method: "get",
          problemId: problemId,
          jwt: jwt,
          url: "https://infox.ro/new/authors/problems/" + problemId,
        },
      }).then((res) => {
        let meta =
          typeof res.data.problem.metadata === "string"
            ? JSON.parse(res.data.problem.metadata)
            : res.data.problem.metadata;

        let tests = Object.keys(meta.teste).map((key, index) => {
          return {
            id: index,
            input: meta.teste[key].in,
            output: meta.teste[key].ok,
            score: meta.teste[key].scor,
            isExample: meta.teste[key].example,
          };
        });

        setProblemTitle(res.data.problem.title);
        setProblemSource(res.data.problem.source);
        setSelectedChapter(res.data.problem.subchapter_id);
        setProblemSummary(res.data.problem.abstract);
        setRequirements(res.data.problem.full);
        setHints(res.data.problem.tips);
        setProponentSource(res.data.problem.proposer_code);
        setMemoryLimit(res.data.problem.limit_memory);
        setStackMemoryLimit(res.data.problem.limit_stack);
        setTimeLimit(res.data.problem.limit_time);
        setTests(tests);
        setProblemType(res.data.problem.type);
      });

      axios({
        method: "post",
        url: "http://" + requestIP,
        data: {
          method: "get",
          jwt: jwt,
          url: "https://infox.ro/new/lables/problem/" + problemId,
        },
      }).then((res) => {
        setLabels({
          selectedLabels: res.data.labels.map((label) => label.id),
          customLabel: labels.customLabel,
        });
      });
    }
  }, [problemId]);

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
  // ################# END PROBLEM SUMMARY COMPONENT #################

  // ################# REQUIREMENT & PREVIEW COMPONENT #################
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
  // ################# END REQUIREMENT & PREVIEW COMPONENT #################

  // ################# PROPONENT SOURCE COMPONENT #################
  //in case of function, proponentSource is used for the incomplete program
  const [proponentSource, setProponentSource] = useState("");
  const [functionCode, setFunctionCode] = useState("");
  const [outputVerificationCode, setOutputVerificationCode] = useState("");
  const sourceModifiedHandler = (event) => {
    event.preventDefault();
    const source = event.target.value;
    setProponentSource(source);
  };

  const outputVerificationCodeModifiedHandler = (event) => {
    event.preventDefault();
    const code = event.target.value;
    setOutputVerificationCode(code);
  };

  const functionCodeModifiedHandler = (code) => {
    setFunctionCode(code);
  };
  // ################# END PROPONENT SOURCE COMPONENT #################

  // ################# SETTINGS COMPONENT #################
  const [timeLimit, setTimeLimit] = useState(10); // Miliseconds
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
  // ################# END SETTINGS COMPONENT #################

  // ################# LABELS COMPONENT #################
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
  // ################# END LABELS COMPONENT #################

  // ################# HINTS COMPONENT #################
  const [hints, setHints] = useState(
    "Această problemă nu are indicații de rezolvare."
  );

  const hintsModifiedHandler = (event) => {
    const value = event.target.value;
    setHints(value);
  };
  // ################# END HINTS COMPONENT #################

  // ################# TOGGLE MODAL #################
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
  // ################# END TOGGLE MODAL #################

  // ################# PROBLEM TYPE #################
  const [problemType, setProblemType] = useState("console_io");

  const problemTypeModifiedHandler = (problemTypeParam) => {
    setProblemType(problemTypeParam);
  };
  // ################# END PROBLEM TYPE #################

  // ################# SENT TO COMPILE - TESTS COMPONENT #################
  //{id: tests.length, compiled: false, input: "", output: "" ,memory: 0, stackMemory: 0, time: 0, score: 0, obtainedScore: 0, isExample: false}
  const [tests, setTests] = useState([]);

  const addTestHandler = (test) => {
    setTests([...tests, test]);
  };

  const updateTestHandler = (tests) => {
    setTests([...tests]);
  };

  const compileSingleTest = (id) => {
    // console.log("compile test with id " + id);
    const test = tests.find((test) => test.id === id);
  };
  const compileAllTests = () => {
    const body = {
      testsNumber: tests.length,
      inputType: problemType,
      code: proponentSource,
    };
    console.log(body);
    for (let i = 0; i < tests.length; i++) {
      body[i + "-data"] = tests[i].input;
    }
    console.log(body);
    console.log("sending...");

    axios({
      method: "post",
      url: "http://" + requestIP,
      data: {
        ...body,
        jwt: jwt,
        url: "https://infox.ro/new/new/solution/output",
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ################# END SENT TO COMPILE - TESTS COMPONENT #################

  // ################# SUBMIT PROBLEM #################
  const saveProblemHandler = () => {
    const problem = {
      title: problemTitle,
      source: problemSource,
      abstract: problemSummary,
      full: requirements,
      tips: hints,
      subchapterId: parseInt(selectedChapter),
      proposerCode: problemType === "function" ? functionCode : proponentSource,
      type: problemType,
      functionTemplate: proponentSource,
      check_outpu: "",
      checkOutput: "",
      timeLimit: parseInt(timeLimit),
      memoryLimit: parseInt(memoryLimit),
      stackMemoryLimit: parseInt(stackMemoryLimit),
    };

    let testsModified = {};
    for (let i = 0; i < tests.length; i++) {
      let testName = i < 10 ? "test0" + i : "test" + i;
      testsModified[testName + "-in"] = tests[i].input;
      testsModified[testName + "-score"] = parseInt(tests[i].score);
      testsModified[testName + "-example"] = tests[i].isExample;
      testsModified[testName + "-out"] = tests[i].output;
    }

    axios({
      method: "post",
      url: "http://" + requestIP,
      data: {
        jwt: jwt,
        ...problem,
        url: "https://infox.ro/new/new/authors/problem/" + problemId,
      },
    }).then((res) => {
      console.log("problem:");
      console.log(res.data);
    });

    let constLabels = [];
    for (let i = 0; i < labels.selectedLabels.length; i++) {
      constLabels.push(parseInt(labels.selectedLabels[i]));
    }

    axios({
      method: "post",
      url: "http://" + requestIP,
      data: {
        problemId: problemId,
        labels: constLabels,
        jwt: jwt,
        url: "https://infox.ro/new/new/authors/labels/problem",
      },
    }).then((res) => {
      console.log("labels");
      console.log(res.data);
    });
  };

  // function called when the problem is being finalized
  const finalizeProblemHandler = () => {
    console.log("uncomment code in VSCode to finalize problem");
    return;
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: {
        jwt: jwt,
        url: "https://infox.ro/new/authors/" + problemId + "/finalize",
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const submitProblemHandler = (saveOrFinalize) => {
    if (saveOrFinalize === "save") {
      saveProblemHandler();
    } else {
      finalizeProblemHandler();
    }
  };
  // ################# END SUBMIT PROBLEM #################

  return (
    <>
      {showButtonModal === 1 ? (
        <Modal
          message="Dacă salvați progresul, veți avea posibilitatea de a relua adăugarea problemei din stadiul curent. Doriți salvarea progresului?"
          toggleModal={toggleButtonsModal}
          onYesClicked={() => submitProblemHandler("save")}
        />
      ) : showButtonModal === 2 ? (
        <Modal
          message="Prin finalizarea problemei, aceasta va fi trimisă administratorului pentru aprobare. Doriți finalizarea problemei? "
          toggleModal={toggleButtonsModal}
          onYesClicked={() => submitProblemHandler("finalize")}
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
          problemType={problemType}
          changed={problemTypeModifiedHandler}
        />

        <ProblemToBeAdded
          problemType={problemType}
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
          tests={tests}
          addTestHandler={addTestHandler}
          compileSingleTest={compileSingleTest}
          compileAllTests={compileAllTests}
          updateTestHandler={updateTestHandler}
          labels={labels}
          labelsModifiedHandler={labelsModifiedHandler}
          customLabelModifiedHandler={customLabelModifiedHandler}
          hints={hints}
          hintsModifiedHandler={hintsModifiedHandler}
          proponentSource={proponentSource}
          functionCode={functionCode}
          verificationCode={outputVerificationCode}
          verificationCodeModified={outputVerificationCodeModifiedHandler}
          functionCodeModifiedHandler={functionCodeModifiedHandler}
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
