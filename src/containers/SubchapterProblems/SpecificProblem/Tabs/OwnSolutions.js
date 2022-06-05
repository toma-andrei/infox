import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../components/Layout/Layout";
import { requestIP } from "../../../../env";
import styles from "./OwnSolutions.module.css";
import SelectSolutionModal from "../Modals/SelectSolutionModal";
import { useEffect } from "react";
import createSourceProgressBar from "../../../../assets/js/createScoreBarForSolutions";
/**
 *Component showing code editor and current user's solutions
 * @param {*} props data received from SpecificProblem Component: jwt, problem id, solution array, show
 * Workflow: User load a code submit it and get result. Then he press on "id:solutionID" to replace his code with solution.
 *              - toggleModal(solutionId) is called to show modal and SolutionId is set to state
 *              - if user press "yes" then he replace his code with solution's code. (modalButtonPressedHandler("yes", solutionId) is called. It calls putSolutionOnTextarea(solutionId)))
 *              - if user press "no" then he close modal.
 */
const OwnSolutions = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullSolutions, setFullSolutions] = useState({});
  const [showModal, setShowModal] = useState({ show: false, solutionId: "" });
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState([]);
  //add to state solutions array
  useEffect(() => {
    setSolutions(props.solutions);
  }, [props.solutions]);

  // Send code to the compiler and fetch result
  const verifySolution = (event) => {
    event.preventDefault();
    let code = document.getElementById("solutionTextarea").value;

    if (code.trim().length === 0) {
      setError("Inserați codul.");
      return;
    }

    setError("");
    setLoading(true);
    /**Send code written by user to compiler and fetch new solution*/
    const sendData = async () => {
      //Send code written by user to compiler
      const response = await axios.post(
        "http://" + requestIP,
        JSON.stringify({
          url: "https://infox.ro/new/solutions",
          jwt: props.jwt,
          problemId: parseInt(props.id),
          code: code,
        })
      );

      //if response from server is not success it means code is not valid;
      if (!response.data.success) {
        setError("Inserați un program valid.");
        setLoading(false);
        return;
      }

      //get score of the problem
      let solution = await axios.post("http://" + requestIP, {
        url: "https://infox.ro/new/solutions/" + response.data.solutionId,
        jwt: props.jwt,
        method: "get",
      });

      // while score is being calculated
      while (true) {
        if (["-1", "-2"].includes(solution.data.solution.points)) {
          solution = await axios.post("http://" + requestIP, {
            url: "https://infox.ro/new/solutions/" + response.data.solutionId,
            jwt: props.jwt,
            method: "get",
          });
        } else {
          setLoading(false);
          break;
        }
      }
      setCurrentSolution([solution.data.solution, ...currentSolution]);
      console.log(solution.data.solution);
      setFullSolutions({
        ...fullSolutions,
        [response.data.solutionId]: solution.data.solution,
      });
    };

    sendData();
  };

  //fetch source for a problem and put it in the textarea
  const putSolutionOnTextarea = (solId) => {
    const fetchSolutionFull = async (solutionId) => {
      const response = await axios.post("http://" + requestIP, {
        method: "get",
        url: "https://infox.ro/new/solutions/" + solutionId,
        jwt: props.jwt,
      });

      setFullSolutions({
        ...fullSolutions,
        [solutionId]: response.data.solution,
      });

      document.getElementById("solutionTextarea").value =
        "//Solutia " +
        solId.toString() +
        " adaugata la " +
        response.data.solution.created_at +
        ".\n" +
        response.data.solution.source;
    };

    //if solution was not fetched before then fetch it
    if (fullSolutions[solId] === undefined) {
      fetchSolutionFull(solId);
      return;
    }

    //if solution was fetched before then put it in the textarea
    document.getElementById("solutionTextarea").value =
      "//Solutia " +
      solId.toString() +
      " adaugata la " +
      fullSolutions[solId].created_at +
      ".\n" +
      fullSolutions[solId].source;
  };

  // when user wants to fetch an old source code
  const modalButtonPressedHandler = (button) => {
    if (button === "yes") {
      putSolutionOnTextarea(showModal.solutionId);
      setShowModal({ show: false, solutionId: "" });
    } else {
      setShowModal({ show: false, solutionId: "" });
    }
  };

  //toggle modal and set solution id for which the modal will be shown
  const toggleModal = (solutionId = null) => {
    showModal.show
      ? setShowModal({ show: false, solutionId: "" })
      : setShowModal({ show: true, solutionId: solutionId });
  };

  let showOlderSolutions = solutions
    ? solutions.map((solution) => {
        return createSourceProgressBar(solution, styles, toggleModal);
      })
    : null;

  let showCurrentSolution =
    currentSolution.length !== 0
      ? currentSolution.map((solution) => {
          // solution contains compilation errors, then show error message
          if (solution.details.split(",").some((e) => e.includes("#c"))) {
            return (
              <div className={styles.compileError}>
                <span>
                  <strong>0</strong> puncte: Soluția conține{" "}
                  <strong>erori de compilare</strong>
                </span>
                <button
                  className={styles.solutionIdButton}
                  onClick={() => toggleModal(solution.id)}
                >
                  id: {solution.id}
                </button>
              </div>
            );
          } else return createSourceProgressBar(solution, styles, toggleModal);
        })
      : null;

  //JSX to show the problem solutions
  return (
    <>
      {showModal.show ? (
        <SelectSolutionModal
          choiceFromModal={modalButtonPressedHandler}
          toggleModal={toggleModal}
        />
      ) : null}
      <div
        className={styles.ownSolutionsWrapper}
        style={{ display: props.show ? "block" : "none" }}
      >
        <h2>Adaugă o soluție: </h2>
        <textarea className={styles.solutionTextarea} id="solutionTextarea" />
        {loading === true ? (
          <div className={styles.loaderContainer}>
            <div className={styles.animationYellow}></div>
            <div className={styles.animationRed}></div>
            <div className={styles.animationBlue}></div>
            <div className={styles.animationViolet}></div>
          </div>
        ) : (
          <>
            <button
              id="verifyButton"
              className={styles.submitSolutionButton}
              onClick={verifySolution}
            >
              Verifică
            </button>
            {error.length !== 0 ? (
              <div className={"bg bg-danger " + styles.errorMessage}>
                {error}
              </div>
            ) : null}
          </>
        )}
        {currentSolution.length !== 0 ? (
          <>
            <h2 style={{ marginTop: "20px" }}>
              Punctajele obținute de soluțiile adăugate acum:
            </h2>
            <div
              id="userSolutionsDivIdentifier"
              style={{ width: "95%", margin: "auto" }}
            >
              {showCurrentSolution}
            </div>
          </>
        ) : null}
        <div
          id="userSolutionsDivIdentifier"
          style={{ width: "95%", margin: "auto" }}
        >
          {null}
        </div>
        <h2 style={{ marginTop: "20px" }}>
          Punctajele obținute de soluțiile tale anterioare:
        </h2>
        <div
          id="userSolutionsDivIdentifier"
          style={{ width: "95%", margin: "auto" }}
        >
          {showOlderSolutions}
        </div>
      </div>
    </>
  );
};

export default OwnSolutions;
