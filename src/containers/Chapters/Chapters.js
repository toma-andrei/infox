import { useParams } from "react-router";
import axios from "axios";
import { requestIP } from "../../env";
import { AuthContext } from "../../components/Layout/Layout";
import { useContext, useEffect, useState } from "react";
import Chapter from "./Chapter/Chapter";
import styles from "./Chapters.module.css";
import { ProblemsContext } from "../../App";

const Chapters = (props) => {
  const [chapters, setChapters] = useState([]);
  const { yearParam } = useParams();
  const { jwt } = useContext(AuthContext);
  let problemContextFromApp = useContext(ProblemsContext);

  useEffect(() => {
    if (Object.keys(problemContextFromApp.problems).length === 0) {
      const fetchProblems = async () => {
        let nineGrade = null;
        let tenGrade = null;
        let elevenGrade = null;
        const years = ["9", "10", "11"];

        for (let index = 0; index < years.length; index++) {
          await axios({
            method: "post",
            url: "http://" + requestIP,
            data: JSON.stringify({
              url: "https://infox.ro/new/problems/chapters/" + years[index],
              method: "get",
              jwt: jwt,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (!nineGrade) nineGrade = res.data.chapters;
            else if (!tenGrade) tenGrade = res.data.chapters;
            else elevenGrade = res.data.chapters;
          });
        }

        problemContextFromApp.setProblems({
          9: nineGrade,
          10: tenGrade,
          11: elevenGrade,
        });
      };
      fetchProblems();
    }
  }, []);

  let currentIndex = 0;
  let position = 0;
  let subchapters = [];
  let chaptersFinal = {};

  const problems = problemContextFromApp.problems;

  let bigWordsContextStructure = {};

  //Create structure like {class: {chapterId: [{subchapter: subchTitle, id: subchId}, {...}, {...}]}}
  for (let year in problems) {
    currentIndex = 0;
    position = 0;
    chaptersFinal = {};

    while (position < problems[year].length - 1) {
      let filteredChapters = problems[year].filter((chapter, index) => {
        if (chapter["chapter"] === problems[year][currentIndex]["chapter"]) {
          if (index - position > 1 || index - position < -1) {
            return false;
          }
          position = index;
          return true;
        }
        return false;
      });
      bigWordsContextStructure[year] = {
        ...bigWordsContextStructure[year],
        [filteredChapters[0].chapter]: filteredChapters.map((subch) => {
          return { id: subch.id, subchapter: subch.subchapter };
        }),
      };

      currentIndex = position + 1;
    }
  }

  //fetch problems for each subchapter
  for (let year in bigWordsContextStructure) {
    for (let ch in bigWordsContextStructure[year]) {
      for (
        let index = 0;
        index < bigWordsContextStructure[year][ch].length;
        index++
      ) {
        const fetchProblemsForEachSubchapter = async () => {
          await axios({
            method: "post",
            url: "http://" + requestIP,
            data: JSON.stringify({
              method: "get",
              url:
                "https://infox.ro/new/problems/problems/" +
                bigWordsContextStructure[year][ch][index].id,
              jwt: jwt,
            }),
          }).then((res) => {
            bigWordsContextStructure[year][ch][index] = {
              problems: res.data.problems,
              ...bigWordsContextStructure[year][ch][index],
            };
          });
        };
        fetchProblemsForEachSubchapter();
      }
    }
  }

  for (const year in bigWordsContextStructure) {
    for (const ch in bigWordsContextStructure[year]) {
      for (
        const subchIndex = 0;
        subchIndex < bigWordsContextStructure[year][ch].length;
        subchIndex++
      ) {
        console.log(bigWordsContextStructure);
        for (
          const i = 0;
          i < bigWordsContextStructure[year][ch][subchIndex].problems.length;
          i++
        ) {
          console.log(bigWordsContextStructure);
          const fetchSolutionsForEachSubchapter = async () => {
            await axios({
              method: "post",
              url: "http://" + requestIP,
              data: JSON.stringify({
                method: "get",
                url:
                  "https://infox.ro/new/solutions/problem/" +
                  bigWordsContextStructure[year][ch][subchIndex].problems[i],
                jwt: jwt,
              }),
            }).then((res) => {
              // console.log(res.data);
              // bigWordsContextStructure[year][ch][subchIndex].problems[i] = {
              //   ...bigWordsContextStructure[year][ch][subchIndex].problems[i]],
              //   problems: res.data.problems,
            });
          };
          fetchSolutionsForEachSubchapter();
        }
      }
    }
  }

  // let chapterList = subchapters.map((subch) => (
  //   <Chapter
  //     chapterTitle={subch[0].chapter}
  //     key={subch[0].id}
  //     subchapters={subch.map((el) => ({
  //       id: el.id,
  //       title: el.subchapter,
  //     }))}
  //   />
  // ));

  return (
    <main>
      <div className={styles.chapters}>{}</div>
    </main>
  );
};

export default Chapters;
