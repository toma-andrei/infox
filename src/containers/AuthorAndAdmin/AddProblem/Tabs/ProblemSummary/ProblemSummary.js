import styles from "./ProblemSummary.module.css";
import { ProblemsContext } from "../../../../../App";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../../components/Layout/Layout";
import axios from "axios";
import { requestIP } from "../../../../../env";
import formatChapters from "../../../../../assets/js/parseProblemChapters";

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
          console.log(res.data.chapters);
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
            <optgroup label={chapterTitle}>
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

    for (let i in chapters[key]) {
      arrayOfOptgroup.push(<optgroup label={i}></optgroup>);
      //iterate through each subtitle
      for (let j in chapters[key][i]) {
        arrayOfOptgroup.push(
          <option value={chapters[key][i][j].id}>
            {chapters[key][i][j].subchapter}
          </option>
        );
      }
    }
  });

  console.log(arrayOfOptgroup);

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
          <div className="col-sm-10">
            <input
              type="text"
              className={"form-control " + styles.inputWidth}
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
          <div className="col-sm-10">
            <input
              type="text"
              className={"form-control " + styles.inputWidth}
              id="source"
              placeholder="ex. Folclor"
              value="Folclor"
              onChange={() => {}}
            />
          </div>
        </div>
        <div className={"form-group row " + +styles.addSpaces}>
          <label
            className={"col-sm-2 col-form-label " + styles.changeLabel}
            htmlFor="category"
          >
            Categoria:
          </label>
          <select id="category" className="form-select">
            {arrayOfOptgroup}
          </select>
        </div>
      </form>
    </div>
  );
};

export default ProblemSummary;
