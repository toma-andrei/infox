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
  const { year } = useParams();
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

  console.log(problemContextFromApp.problems);

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
    subchapters.push(filteredChapters);
    currentIndex = position + 1;
  }

  // axios({
  //   method: "post",
  //   url: "http://" + requestIP,
  //   data: JSON.stringify({
  //     method: "get",
  //     url: "https://infox.ro/new/problems/problems/" + id,
  //     jwt: jwt,
  //   }),
  // }).then((res) => {
  //   setProblems(res.data.problems);
  // });

  let chapterList = subchapters.map((subch) => (
    <Chapter
      chapterTitle={subch[0].chapter}
      key={subch[0].id}
      subchapters={subch.map((el) => ({
        id: el.id,
        title: el.subchapter,
      }))}
    />
  ));

  return (
    <main>
      <div className={styles.chapters}>{chapterList}</div>
    </main>
  );
};

export default Chapters;
