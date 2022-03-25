import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../components/Layout/Layout";
import { requestIP } from "../../../../env";
import styles from "./OwnSolutions.module.css";
import SelectSolutionModal from "../Modals/SelectSolutionModal";

/**
 *Component showing code editor and current user's solutions
 * @param {*} props data received from SpecificProblem Component: jwt, problem id, solution array, show
 *
 */
const OwnSolutions = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullSolutions, setFullSolutions] = useState({});
  const [showModal, setShowModal] = useState(false);

  /**
   * Send code to the compiler and fetch result
   */
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

      setFullSolutions({
        ...fullSolutions,
        [response.data.solutionId]: solution.data.solution,
      });
    };

    sendData();
  };

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
    };
    if (fullSolutions[solId] === undefined) fetchSolutionFull(solId);
    else {
      document.getElementById("solutionTextarea").value =
        fullSolutions[solId].source;
    }
  };

  const modalButtonPressedHandler = (button) => {
    console.log(button);
    if (button === "yes") {
      setShowModal(false);
      putSolutionOnTextarea(props.id);
    } else {
      setShowModal(true);
    }
  };

  //create a JSX code for each solution
  let showSolutions = props.solutions
    ? props.solutions.map((solution) => {
        //details key looks like "maxPoints#myRes". myRes:
        //score
        //"g" (gresit)
        //"c" (compilation error)
        let marks = solution.details.split(",");
        marks = marks.map((mark) => {
          return {
            testScore: parseInt(mark.split("#")[0]),
            myScore: mark.split("#")[1],
          };
        });
        let totalScoreForOneSolution = 0;
        let temp = marks.map((mark) => mark.myScore);

        temp.forEach((val) => {
          totalScoreForOneSolution += ["c", "g"].includes(val)
            ? 0
            : parseInt(val);
        });

        return (
          <div key={solution.id}>
            <div className={styles.solutionInfoText}>
              <div>
                <strong>{totalScoreForOneSolution}</strong> puncte, obținute pe
                data {solution.created_at}, distribuite astfel:
              </div>
              <button className={styles.solutionIdButton}>
                id: {solution.id}
              </button>
            </div>
            <div className={["progress", styles.rightVerticalRuler].join(" ")}>
              {marks.map((mark) => {
                let classes = ["progress-bar", styles.rightVerticalRuler];

                if (["g", "c"].includes(mark.myScore))
                  classes.push("bg-danger");
                else if (mark.myScore == mark.testScore)
                  classes.push("bg-success");

                return (
                  <div
                    className={classes.join(" ")}
                    style={{ width: mark.testScore + "%" }}
                    key={solution.id + Math.random()}
                  >
                    {mark.myScore === "c"
                      ? "[Compilare]"
                      : mark.myScore === "g"
                      ? "[Răspuns greșit]"
                      : mark.myScore}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })
    : null;

  return (
    <>
      {showModal ? (
        <SelectSolutionModal openModal={modalButtonPressedHandler} />
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
        <div style={{ width: "95%", margin: "auto" }}>{showSolutions}</div>
      </div>
    </>
  );
};

export default OwnSolutions;
