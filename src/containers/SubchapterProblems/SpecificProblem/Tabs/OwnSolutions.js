import axios from "axios";
import { Fragment, useContext, useState } from "react";
import styles from "./OwnSolutions.module.css";
import SelectSolutionModal from "../Modals/SelectSolutionModal";
import { useEffect } from "react";
import createSourceProgressBar from "../../../../assets/js/createScoreBarForSolutions";
import useAuth from "../../../../hooks/useAuth";
import ajax from "../../../../assets/js/ajax";
/**
 *Component showing code editor and current user's solutions
 * @param {*} props data received from SpecificProblem Component: jwt, problem id, solution array, show
 * Workflow: User load a code submit it and get result. Then he press on "id:solutionID" to replace his code with solution.
 *              - toggleModal(solutionId) is called to show modal and SolutionId is set to state
 *              - if user press "yes" then he replace his code with solution's code. (modalButtonPressedHandler("yes", solutionId) is called. It calls putSolutionOnTextarea(solutionId)))
 *              - if user press "no" then he close modal.
 */
const OwnSolutions = (props) => {
  const { updateUserInfo } = useAuth();
  const userData = useAuth();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [fullSolutions, setFullSolutions] = useState({});
  const [showModal, setShowModal] = useState({ show: false, solutionId: "" });
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState([]);
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);
  //add to state solutions array
  useEffect(() => {
    setSolutions(props.solutions);
  }, [props.solutions]);

  // Send code to the compiler and fetch result
  const verifySolution = (event) => {
    event.preventDefault();

    if (code.trim().length === 0) {
      setError("Inserați codul.");
      return;
    }

    setError("");
    setLoading(true);
    /**Send code written by user to compiler and fetch new solution*/
    const sendData = async () => {
      //Send code written by user to compiler
      const response = await ajax(
        "https://infox.ro/new/new/solutions",
        "post",
        props.jwt,
        { problemId: parseInt(props.id), code: code }
      );

      let guid = "";
      let idSolution = 0;

      if (response.data.success) {
        guid = response.data.guid;
        idSolution = response.data.id;
      } else {
        setError("Ceva nu a mers bine. Încercați mai târziu.");
        setLoading(false);
        return;
      }

      const intervalId = setInterval(() => {
        ajax("https://infox.ro/new/new/solution/compile", "post", props.jwt, {
          GUID: response.data.GUID,
          idSolution: parseInt(response.data.idSolution),
        }).then((res) => {
          if (res.data.results) {
            setLoading(false);
            clearInterval(intervalId);
            setCurrentSolution([
              {
                tests: Object.values(res.data.results.teste),
                points: res.data.results.punctaj_final,
                id: response.data.idSolution,
                time: new Date().toLocaleTimeString(),
              },
              ...currentSolution,
            ]);

            //if i obtained 100 and don't have any solution with scrore 100;
            if (
              res.data.results.punctaj_final === 100 &&
              !solutions.some((solution) => solution.points === "100")
            ) {
              ajax(
                "https://infox.ro/new/solution/coins/" + props.id,
                "post",
                props.jwt,
                {}
              ).then((res) => {
                if (res.data.success) {
                  userData.updateUserInfo({
                    ...userData,
                    coins: parseInt(userData.coins) + 100,
                  });
                }
              });
            }
          }
        });
      }, 1000);
    };

    sendData();
  };

  //fetch source for a problem and put it in the textarea
  const putSolutionOnTextarea = (solId) => {
    const fetchSolutionFull = async (solutionId) => {
      const response = await ajax(
        "https://infox.ro/new/solutions/" + solutionId,
        "get",
        props.jwt,
        {}
      );

      setFullSolutions({
        ...fullSolutions,
        [solutionId]: response.data.solution,
      });

      setCode(
        "//Solutia " +
          solId.toString() +
          " adaugata la " +
          response.data.solution.created_at +
          ".\n" +
          response.data.solution.source
      );
    };

    //if solution was not fetched before then fetch it
    if (fullSolutions[solId] === undefined) {
      fetchSolutionFull(solId);
      return;
    }

    //if solution was fetched before then put it in the textarea
    setCode(
      "//Solutia " +
        solId.toString() +
        " adaugata la " +
        fullSolutions[solId].created_at +
        ".\n" +
        fullSolutions[solId].source
    );
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

  const codeModifiedHandler = (event) => {
    setCode(event.target.value);
  };

  let showOlderSolutions = solutions
    ? solutions.map((solution) => {
        return createSourceProgressBar(solution, styles, toggleModal);
      })
    : null;

  let showCurrentSolution =
    currentSolution.length !== 0
      ? currentSolution.map((full, index) => {
          return !full.tests.every((elem) => elem.eroare !== "0") ? (
            <div className={styles.scoresWrapper} key={Math.random()}>
              <div
                className={styles.textAndButtonDiv}
                key={full.id + Math.random()}
              >
                <div className={styles.textDiv}>
                  <strong>{full.points}</strong> puncte obținute la {full.time}
                </div>
                <button
                  className={styles.solutionIdButton}
                  onClick={() => toggleModal(full.id)}
                >
                  id: {full.id}
                </button>
              </div>
              {full.tests.map((solution, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      className={styles.currentScore}
                      style={{
                        width: `${solution.punctaj}%`,
                        backgroundColor:
                          solution.punctaj > 0 ? "#198754" : "red",
                      }}
                    >
                      {solution.punctaj}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          ) : (
            <div
              className={[styles.errors, styles.solutionInfoText].join(" ")}
              key={full.id + Math.random()}
            >
              <span>
                0 puncte obținute la {full.time}:{" "}
                <strong>erori de compilare</strong>
              </span>
              <button
                className={styles.solutionIdButton}
                onClick={() => toggleModal(full.id)}
              >
                id: {full.id}
              </button>
            </div>
          );
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
        <textarea
          className={styles.solutionTextarea}
          id="solutionTextarea"
          value={code}
          onChange={codeModifiedHandler}
        />
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
