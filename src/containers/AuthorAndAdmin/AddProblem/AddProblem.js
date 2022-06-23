import styles from "./AddProblem.module.css";
import { useState, useContext, useEffect } from "react";
import { ProblemsContext } from "../../../App";
import { AuthContext } from "../../../components/Layout/Layout";
import formatChapters from "../../../assets/js/parseProblemChapters";
import TypeOfProblem from "./Tabs/TypeOfProblem/TypeOfProblem";
import HelpModal from "./Tabs/HelpModal/HelpModal";
import HRsAndTitles from "./HRsAndTitles/HRsAndTitles";
import Buttons from "./Buttons/Buttons";
import Modal from "./Buttons/Modal/Modal";
import ProblemToBeAdded from "./ProblemToBeAdded/ProblemToBeAdded";
import SavedWithSuccess from "./SavedWithSuccess/SavedWithSuccess";
import { useParams } from "react-router";
import { saveProblem } from "./ajax";
import ajax from "../../../assets/js/ajax";

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
  const [problemId, setProblemId] = useState(parseInt(id) ?? null);
  // 0 - no, 1 - Save button, 2 - Finalize button
  const [showButtonModal, setShowButtonModal] = useState(0);
  const [problemSaved, setProblemSaved] = useState(false);
  const [labelsSaved, setLabelsSaved] = useState(false);
  const [testsSaved, setTestsSaved] = useState(false);

  const [finalizedWithSuccess, setFinalizedWithSuccess] = useState(false);

  //if the url has an id, it means that the problem is being edited
  useEffect(() => {
    if (problemId) {
      ajax(
        "https://infox.ro/new/authors/problems/" + problemId,
        "get",
        jwt,
        {}
      ).then((res) => {
        setProblemTitle(res?.data?.problem.title ?? "");
        setProblemSource(res?.data?.problem.source ?? "");
        setSelectedChapter(res?.data?.problem.subchapter_id ?? "");
        setProblemSummary(res?.data?.problem.abstract ?? "");
        setRequirements(res?.data?.problem.full ?? "");
        setHints(res?.data?.problem.tips ?? "");
        if (res?.data?.problem.type === "function" ?? "") {
          setProponentSource(res?.data?.problem.functions_template ?? "");
          setFunctionCode(res?.data?.problem.proposer_code ?? "");
        } else {
          setProponentSource(res?.data?.problem.proposer_code ?? "");
        }
        setMemoryLimit(res?.data?.problem.limit_memory ?? "");
        setStackMemoryLimit(res?.data?.problem.limit_stack ?? "");
        setTimeLimit(res?.data?.problem.limit_time ?? "");
        setProblemType(res?.data?.problem.type ?? "");
      });

      // get labels for the problem
      ajax("https://infox.ro/new/lables/problem/" + problemId, "get", jwt).then(
        (res) => {
          setLabels({
            selectedLabels: res?.data?.labels.map((label) => label.id),
            customLabel: labels.customLabel,
          });
        }
      );

      ajax(
        "https://infox.ro/new/new/authors/tests/problem/" + problemId,
        "get",
        jwt,
        {}
      ).then((res) => {
        if (res.data.success) {
          let teste = res.data.tests.map((test, index) => {
            return {
              id: index,
              input: test.input,
              output: test.output,
              score: test.score,
              isExample: test.example === "1" ? true : false,
            };
          });

          setTests(teste);
        }
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
      return ajax(
        "https://infox.ro/new/problems/chapters/" + year,
        "get",
        jwt,
        {}
      );
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
  const [currentlyCompiling, setCurrentlyCompiling] = useState(false);
  const addTestHandler = (test) => {
    setTests([...tests, test]);
  };

  const updateTestHandler = (tests) => {
    setTests([...tests]);
  };

  //called when user loads file from pc
  const inputFromFileHandler = (id, value) => {
    const test = tests.find((test) => test.id === id);
    const newTests = tests.filter((test) => test.id !== id);
    test.input = value;
    newTests.push(test);
    newTests.sort((a, b) => (a.id < b.id ? -1 : 1));
    setTests(newTests);
  };

  const compileSingleTest = (id) => {
    if (
      proponentSource === "" ||
      (problemType === "function" && functionCode === "")
    ) {
      alert("Nu ați introdus codul!");
      return;
    }

    //get test with specified id and create body
    let test = tests.find((test) => test.id === id);
    let allTestsExceptId = tests.filter((test) => test.id !== id);
    test.loading = true;
    setTests(
      [...allTestsExceptId, test].sort((t1, t2) => (t1.id < t2.id ? -1 : 1))
    );

    const body = {
      testsNumber: 1,
      "0-data": test.input,
      code: proponentSource,
      inputType: problemType,
    };

    body["function"] = functionCode;

    ajax("https://infox.ro/new/new/solution/output", "post", jwt, body)
      .then((res) => {
        if (res.data.output.teste["1"].eroare !== "0") {
          alert(
            "Codul conține erori de compilare!\neroare: " +
              res.data.output.teste["1"].eroare.split("error:").pop()
          );
          test.loading = false;
          allTestsExceptId = tests.filter((test) => test.id !== id);
          setTests([...allTestsExceptId, test]);
          return;
        }
        setCurrentlyCompiling(false);

        let teste = [];

        test.output = res.data.output.teste["1"].output;
        test.time = res.data.output.teste["1"].timp;
        test.error = res.data.output.teste["1"].eroare;
        test.loading = false;
        let allTests = tests.filter((test) => {
          return test.id !== id;
        });

        allTests.push(test);
        allTests.sort((t1, t2) => (t1.id < t2.id ? -1 : 1));
        setTests(allTests);
      })
      .catch((err) => {
        setCurrentlyCompiling(false);
      });
  };

  const compileAllTests = () => {
    const body = {
      testsNumber: tests.length,
      inputType: problemType,
      code: proponentSource,
    };

    for (let i = 0; i < tests.length; i++) {
      body[i + "-data"] = tests[i].input;
    }

    body["function"] = functionCode;

    setCurrentlyCompiling(true);

    ajax("https://infox.ro/new/new/solution/output", "post", jwt, body)
      .then((res) => {
        setCurrentlyCompiling(false);

        let teste = [...tests];
        let max = 0;
        for (let i = 1; i <= teste.length; i++) {
          max =
            parseFloat(res.data.output.teste[i].timp) > max
              ? parseFloat(res.data.output.teste[i].timp)
              : max;
          teste[i - 1].output = res.data.output.teste[i].output;
          teste[i - 1].time = res.data.output.teste[i].timp;
          teste[i - 1].error = res.data.output.teste[i].eroare;
        }
        // if time is 0, put it to 10 miliseconds by default
        setTimeLimit(parseInt(max * 1000) <= 0 ? "10" : parseInt(max * 1000));
        setTests(teste);
      })
      .catch((err) => {
        setCurrentlyCompiling(false);
      });
  };

  // ################# END SENT TO COMPILE - TESTS COMPONENT #################

  // ################# SUBMIT PROBLEM #################

  const saveProblemHandler = () => {
    // create body
    saveProblem(
      problemId,
      problemTitle,
      problemSource,
      problemSummary,
      requirements,
      hints,
      selectedChapter,
      functionCode,
      proponentSource,
      problemType,
      timeLimit,
      memoryLimit,
      stackMemoryLimit,
      tests,
      jwt,
      labels,
      (boolean) => setProblemSaved(boolean),
      (boolean) => setLabelsSaved(boolean),
      (boolean) => setTestsSaved(boolean)
    );
  };

  // function called when the problem is being finalized
  const finalizeProblemHandler = () => {
    alert(
      "For security reasons, this feature is not available during development."
    );
    return;
    ajax(
      "https://infox.ro/new/authors/" + problemId + "/finalize",
      "post",
      jwt,
      {}
    )
      .then((res) => {})
      .catch((err) => {});
  };

  const submitProblemHandler = (saveOrFinalize) => {
    if (saveOrFinalize === "save") {
      saveProblemHandler();
    } else {
      finalizeProblemHandler();
    }
  };
  // ################# END SUBMIT PROBLEM #################

  const moveToFalse = () => {
    setProblemSaved(false);
    setLabelsSaved(false);
    setTestsSaved(false);
  };

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
      {problemSaved && labelsSaved && testsSaved ? (
        <SavedWithSuccess moveToFalse={moveToFalse} text="Salvat cu succes!" />
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
          inputFromFile={inputFromFileHandler}
          tests={tests}
          addTestHandler={addTestHandler}
          compileSingleTest={compileSingleTest}
          compileAllTests={compileAllTests}
          currentlyCompiling={currentlyCompiling}
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
