import styles from "./AddProblem.module.css";
import { useState } from "react";
import ProblemSummary from "./Tabs/ProblemSummary/ProblemSummary";

const AddProblem = (props) => {
  return (
    <main className={styles.addProblemBackground}>
      <h1 className={styles.title}>Adaugă o problemă</h1>
      <hr className={styles.horizontalRule}></hr>
      <ProblemSummary />
    </main>
  );
};

export default AddProblem;
