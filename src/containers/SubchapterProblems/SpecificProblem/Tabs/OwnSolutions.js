import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../components/Layout/Layout";
import { requestIP } from "../../../../env";
import styles from "./OwnSolutions.module.css";
import SelectSolutionModal from "../Modals/SelectSolutionModal";
import { useEffect } from "react";

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

      setSolutions([solution.data.solution, ...solutions]);

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

  //create a JSX code (pregress bars) for each solution
  const createSourceProgressBar = (solution) => {
    //details key looks like "maxPoints#myRes". myRes:
    //score
    //"g" (gresit)
    //"c" (compilation error)
    //"t"

    let marks = solution.details.split(",");

    marks = marks.map((mark) => {
      return {
        testScore: parseInt(mark.split("#")[0]),
        myScore: mark.split("#")[1],
      };
    });

    let totalScoreForOneSolution = 0;

    //temporary variable for computing total score for a solution
    let temp = marks.map((mark) => mark.myScore);

    temp.forEach((val) => {
      totalScoreForOneSolution += ["c", "g", "t", "m1", "m2"].includes(val)
        ? 0
        : parseInt(val);
    });

    return (
      <div key={solution.id}>
        <div className={styles.solutionInfoText}>
          <div>
            <strong>{totalScoreForOneSolution}</strong> puncte, obținute pe data{" "}
            {solution.created_at}, distribuite astfel:
          </div>
          <button
            className={styles.solutionIdButton}
            onClick={() => toggleModal(solution.id)}
          >
            id: {solution.id}
          </button>
        </div>
        <div className={["progress", styles.rightVerticalRuler].join(" ")}>
          {marks.map((mark) => {
            //styles for each solution progress bar
            let classes = ["progress-bar", styles.rightVerticalRuler];

            //set styles depending on response (compilation error, wrong answer, etc)
            if (["g", "c"].includes(mark.myScore)) classes.push("bg-danger");
            else if (["t", "m1", "m2"].includes(mark.myScore))
              classes.push("bg-primary");
            else if (mark.myScore == mark.testScore) classes.push("bg-success");

            return (
              <div
                className={classes.join(" ")}
                style={{ width: mark.testScore + "%" }}
                key={solution.id + Math.random()}
              >
                {mark.myScore === "c"
                  ? "Compilare"
                  : mark.myScore === "g"
                  ? "Răspuns greșit"
                  : mark.myScore === "t"
                  ? "Timp"
                  : mark.myScore === "m1" || mark.myScore === "m2"
                  ? "Memorie"
                  : mark.myScore}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  let showSolutions = solutions
    ? solutions.map((solution) => {
        return createSourceProgressBar(solution);
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
        <h2 style={{ marginTop: "20px" }}>
          Punctajele obținute de soluțiile tale:
        </h2>
        <div
          id="userSolutionsDivIdentifier"
          style={{ width: "95%", margin: "auto" }}
        >
          {showSolutions}
        </div>
      </div>
    </>
  );
};

export default OwnSolutions;
