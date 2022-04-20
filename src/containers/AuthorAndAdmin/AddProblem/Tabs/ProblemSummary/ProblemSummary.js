import styles from "./ProblemSummary.module.css";
import SubchapterProblemAbstract from "../../../../SubchapterProblems/SubchaperProblemAbstract/SubchapterProblemAbstract";

const ProblemSummary = (props) => {
  const autoresizeTextarea = (querySelectorString) => {
    const textarea = document.querySelector(querySelectorString);
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  let yearsObject = { 9: "IX", 10: "X", 11: "XI" };

  //iterate through [9, 10, 11]
  let arrayOfOptgroup = Object.keys(props.states.chapters).map((keyy) => {
    //second map iterate through each chapter title
    return (
      //class for optgroup
      <>
        <optgroup key={keyy} label={"Clasa a " + yearsObject[keyy]}></optgroup>
        {Object.keys(props.states.chapters[keyy]).map((chapterTitle) => {
          return (
            <optgroup
              key={chapterTitle + Math.random()}
              label={chapterTitle.replace("##", "")}
            >
              {props.states.chapters[keyy][chapterTitle].map((subchapter) => {
                return (
                  <option
                    key={subchapter.id + Math.random()}
                    value={subchapter.id}
                  >
                    {subchapter.subchapter}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </>
    );
  });

  return (
    <div>
      <form>
        <div
          key="formWrapperDivKey1"
          className={"form-group row " + styles.addSpaces}
        >
          <label
            className={"col-sm-2 col-form-label " + styles.changeLabel}
            htmlFor="title"
          >
            Titlul problemei:
          </label>
          <div className={"col-sm-10 " + styles.inputWidth}>
            <input
              onChange={props.states.setProblemTitle}
              type="text"
              className={"form-control " + styles.changeInput}
              id="title"
              placeholder="ex. Test primalitate"
            />
          </div>
        </div>
        <div
          key="formWrapperDivKey2"
          className={"form-group row " + styles.addSpaces}
        >
          <label
            className={"col-sm-2 col-form-label " + styles.changeLabel}
            htmlFor="source"
          >
            Sursa problemei:
          </label>
          <div className={"col-sm-10 " + styles.inputWidth}>
            <input
              type="text"
              className={"form-control "}
              id="source"
              placeholder="ex. Folclor"
              value={props.states.problemSource}
              onChange={props.states.setProblemSource}
            />
          </div>
        </div>
        <div
          key="formWrapperDivKey3"
          className={"form-group row " + styles.addSpaces}
        >
          <label
            className={"col-sm-2 col-form-label " + styles.changeLabel}
            htmlFor="category"
          >
            Categoria:
          </label>
          <div className={"col-sm-8 " + styles.selectElementDivWrapper}>
            <select
              onChange={props.states.setChapters}
              id="category"
              className={"form-select " + styles.selectCategoryElement}
            >
              {arrayOfOptgroup}
            </select>
          </div>
        </div>
        <div
          key="formWrapperDivKey4"
          className={
            "form-group row " +
            styles.addSpaces +
            " " +
            styles.formatAbstractProblemDiv
          }
        >
          <label className={"col-sm-2 col-form-label " + styles.changeLabel}>
            Rezumat:
          </label>
          <div className={styles.formatAbstractProblem}>
            <textarea
              id="abstractProblemSummary"
              onInput={() => autoresizeTextarea("#abstractProblemSummary")}
              onChange={props.states.setProblemSummary}
              className={styles.abstractProblemTextarea}
            ></textarea>
            <SubchapterProblemAbstract
              fullProblem={{
                correct: 0,
                submitted: 0,
                id: 0,
                abstract: props.states.problemSummary,
                title: props.states.problemTitle,
              }}
              shouldNotRedirect={true}
              custom_style={{
                width: "100%",
                marginBottom: "0px",
                maxWidth: "auto",
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProblemSummary;