//create a JSX code (pregress bars) for each solution
const createSourceProgressBar = (solution, styles, toggleModal) => {
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
          <strong>
            {totalScoreForOneSolution.toString() == NaN.toString()
              ? 0
              : totalScoreForOneSolution}
          </strong>{" "}
          puncte, obținute pe data {solution.created_at}, distribuite astfel:
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

export default createSourceProgressBar;
