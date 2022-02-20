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
  let problemContext = useContext(ProblemsContext);

  useEffect(() => {
    if (problemContext.chapters[yearParam] === undefined) {
      const fetchProblems = async () => {
        let chapters = null;

        await axios({
          method: "post",
          url: "http://" + requestIP,
          data: JSON.stringify({
            url: "https://infox.ro/new/problems/chapters/" + yearParam,
            method: "get",
            jwt: jwt,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (yearParam === 9) chapters = res.data.chapters;
          else if (yearParam === 10) chapters = res.data.chapters;
          else chapters = res.data.chapters;
        });

        let restructuredChapters = {};

        let currentIndex = 0;
        let position = 0;
        let chaptersFinal = {};

        //Create structure like {class: {chapterId: [{subchapter: subchTitle, id: subchId}, {...}, {...}]}}

        while (position < chapters.length - 1) {
          let filteredChapters = chapters.filter((chapter, index) => {
            if (chapter["chapter"] === chapters[currentIndex]["chapter"]) {
              if (index - position > 1 || index - position < -1) {
                return false;
              }
              position = index;
              return true;
            }
            return false;
          });

          //Concat '##' to a field only if it already exists
          if (
            restructuredChapters[yearParam] !== undefined &&
            restructuredChapters[yearParam].hasOwnProperty(
              filteredChapters[0].chapter
            )
          ) {
            restructuredChapters[yearParam] = {
              ...restructuredChapters[yearParam],
              [filteredChapters[0].chapter + "##"]: filteredChapters.map(
                (subch) => {
                  return { id: subch.id, subchapter: subch.subchapter };
                }
              ),
            };
          }

          restructuredChapters[yearParam] = {
            ...restructuredChapters[yearParam],
            [filteredChapters[0].chapter]: filteredChapters.map((subch) => {
              return { id: subch.id, subchapter: subch.subchapter };
            }),
          };

          currentIndex = position + 1;
        }

        return restructuredChapters;
        /*
        //fetch problems for each subchapter
        for (let year in bigWordsContextStructure) {
          for (let ch in bigWordsContextStructure[year]) {
            for (
              let index = 0;
              index < bigWordsContextStructure[year][ch].length;
              index++
            ) {
              const fetchProblemsForEachSubchapter = async () => {
                let answer = {};
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
                  answer = {
                    problems: res.data.problems,
                  };
                });
                return answer;
              };

              bigWordsContextStructure[year][ch][index] = {
                ...bigWordsContextStructure[year][ch][index],
                ...(await fetchProblemsForEachSubchapter()),
              };
            }
          }
        }


        for (let year in bigWordsContextStructure) {
          for (let ch in bigWordsContextStructure[year]) {
            for (
              let subchIndex = 0;
              subchIndex < bigWordsContextStructure[year][ch].length;
              subchIndex++
            ) {
              // console.log(bigWordsContextStructure[year][ch][0]);
              // for (
              //   const i = 0;
              //   i < bigWordsContextStructure[year][ch][subchIndex].problems.length;
              //   i++
              // ) {}
            }
          }
        }
        */
      };
      fetchProblems().then((response) => {
        problemContext.setChapters(response);
      });
      // problemContext.setChapters(fetchProblems());
    }
  }, [yearParam]);

  /*
  let currentIndex = 0;
  let position = 0;
  let subchapters = [];
  let chaptersFinal = {};

  const problems = problemContext.chapters;

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

  for (let year in bigWordsContextStructure) {
    for (let ch in bigWordsContextStructure[year]) {
      for (
        let subchIndex = 0;
        subchIndex < bigWordsContextStructure[year][ch].length;
        subchIndex++
      ) {
        console.log(bigWordsContextStructure[year][ch]);
        console.log(bigWordsContextStructure[year][ch][0]);
        // for (
        //   const i = 0;
        //   i < bigWordsContextStructure[year][ch][subchIndex].problems.length;
        //   i++
        // ) {}
      }
    }
  }
  */

  let chaptersList = [];
  for (let chapter in problemContext.chapters[yearParam]) {
    chaptersList.push(
      <Chapter
        chapterTitle={chapter}
        key={chapter}
        subchapters={problemContext.chapters[yearParam][chapter]}
      />
    );
  }

  return (
    <main>
      <div className={styles.chapters}>{chaptersList}</div>
    </main>
  );
};

export default Chapters;
