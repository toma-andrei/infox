import styles from "./ProblemSummary.module.css";
import { ProblemsContext } from "../../../../../App";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../../components/Layout/Layout";
import axios from "axios";
import { requestIP } from "../../../../../env";
import formatChapters from "../../../../../assets/js/parseProblemChapters";
import SubchapterProblemAbstract from "../../../../SubchapterProblems/SubchaperProblemAbstract/SubchapterProblemAbstract";

const ProblemSummary = (props) => {
  const classes = props.show ? styles.show : styles.hide;
  const fromProblemContext = useContext(ProblemsContext);
  const { jwt } = useContext(AuthContext);
  const [chapters, setChapters] = useState({ ...fromProblemContext.chapters });

  //fetch problem categories from api
  useEffect(() => {
    const years = ["9", "10", "11"];

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
  }, [chapters]);

  let yearsObject = { 9: "IX", 10: "X", 11: "XI" };

  //iterate through [9, 10, 11]
  let arrayOfOptgroup = Object.keys(chapters).map((key) => {
    //second map iterate through each chapter title
    return (
      //class for optgroup
      <>
        <optgroup key={key} label={"Clasa a " + yearsObject[key]}></optgroup>
        {Object.keys(chapters[key]).map((chapterTitle) => {
          return (
            <optgroup key={chapterTitle} label={chapterTitle.replace("##", "")}>
              {chapters[key][chapterTitle].map((subchapter) => {
                return (
                  <option key={subchapter.id} value={subchapter.id}>
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
        <div className={"form-group row " + styles.addSpaces}>
          <label
            className={"col-sm-2 col-form-label " + styles.changeLabel}
            htmlFor="title"
          >
            Titlul problemei:
          </label>
          <div className={"col-sm-10 " + styles.inputWidth}>
            <input
              type="text"
              className="form-control "
              id="title"
              placeholder="ex. Test primalitate"
            />
          </div>
        </div>
        <div className={"form-group row " + styles.addSpaces}>
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
              value="Folclor"
              onChange={() => {}}
            />
          </div>
        </div>
        <div className={"form-group row " + styles.addSpaces}>
          <label
            className={"col-sm-2 col-form-label " + styles.changeLabel}
            htmlFor="category"
          >
            Categoria:
          </label>
          <div className="col-sm-10">
            <select
              id="category"
              className={"form-select " + styles.selectCategoryElement}
            >
              {arrayOfOptgroup}
            </select>
          </div>
        </div>
        <div
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
            <textarea className={styles.abstractProblemTextarea}>
              e5ye45ye4
            </textarea>
            <SubchapterProblemAbstract
              fullProblem={{
                correct: 0,
                submitted: 0,
                id: 0,
                abstract: "123",
                title: "123",
              }}
              shouldNotRedirect={true}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProblemSummary;
