import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../../components/Layout/Layout";
import { requestIP } from "../../../../env";
import styles from "./OwnSolutions.module.css";

/**
 *
 * @param {*} props data received from SpecificProblem Component
 * @returns
 */
const OwnSolutions = (props) => {
  const verifySolution = (event) => {
    event.preventDefault();
    let code = document.getElementById("solutionTextarea").value;

    /**
     * Send code written by user to compiler
     */
    const sendData = async () => {
      const response = await axios.post(
        "http://" + requestIP,
        JSON.stringify({
          url: "https://infox.ro/new/solutions",
          jwt: props.jwt,
          problemId: parseInt(props.id),
          code: code,
        })
      );
    };

    sendData();
  };

  //create a structure for each solution
  let showSolutions = props.solutions
    ? props.solutions.map((solution) => {
        return (
          <div key={solution.id}>
            id: {solution.id}
            <br />
            points: {solution.points}
            <br />
            details: {solution.details}
            <br />{" "}
          </div>
        );
      })
    : null;

  return (
    <div
      className={styles.ownSolutionsWrapper}
      style={{ display: props.show ? "block" : "none" }}
    >
      <h2>Adaugă o soluție: </h2>
      <textarea className={styles.solutionTextarea} id="solutionTextarea" />
      <button className={styles.submitSolutionButton} onClick={verifySolution}>
        Verifică
      </button>
      {showSolutions}
    </div>
  );
};

export default OwnSolutions;
