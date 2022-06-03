import { useParams } from "react-router";
import axios from "axios";
import { requestIP } from "../../env";
import { AuthContext } from "../../components/Layout/Layout";
import { useContext, useEffect, useState } from "react";
import Chapter from "./Chapter/Chapter";
import styles from "./Chapters.module.css";
import { ProblemsContext } from "../../App";
import Loading from "../UI/Loading/Loading";
import formatChapters from "../../assets/js/parseProblemChapters";

/**
 * Chapter component. Fetchs the chapters from the server and renders them.
 * On route /problems/display_year/year
 */
const Chapters = (props) => {
  const [chapters, setChapters] = useState([]);
  let problemContext = useContext(ProblemsContext);
  const [solvedProblemsIds, setSolvedProblemsIds] = useState(
    problemContext?.solvedProblems?.solvedProblemsIds ?? null
  );
  const { yearParam } = useParams();
  const { jwt } = useContext(AuthContext);

  //fetch ids of solved problems
  useEffect(() => {
    let shouldFetch = true;
    if (!solvedProblemsIds) {
      axios
        .post("http://" + requestIP, {
          method: "get",
          url: "https://infox.ro/new/users/problems",
          jwt: jwt,
        })
        .then((response) => {
          //set solved problems ids
          if (response.data.success) {
            if (shouldFetch) {
              setSolvedProblemsIds(response.data.problemHistory);
              problemContext.setSolvedProblems({
                ...problemContext.solvedProblems,
                solvedProblemsIds: response.data.problemHistory,
              });
            }
          }
        });
    }
    return () => (shouldFetch = false);
  }, [solvedProblemsIds]);

  /**{
   * data looks like this:
    "success": true,
    "statusCode": 200,
    "chapters": [
        {
            "id": "20",
            "class": "9",
            "chapter": "Elemente de bază ale limbajului C/C++; structuri de control",
            "subchapter": "Citirea și scrierea datelor",
            "created_at": "2020-05-01",
            "updated_at": "2020-05-01"
        },
        {
            "id": "30",
            "class": "9",
            "chapter": "Elemente de bază ale limbajului C/C++; structuri de control",
            "subchapter": "Structura liniară",
            "created_at": "2020-05-01",
            "updated_at": "2020-05-01"
        }, 
          .
          .
          .
        */
  //fetch chapters with subchapters if those are not present in problemContext
  useEffect(() => {
    let shouldFetch = true;

    if (!problemContext.chapters[yearParam]) {
      const fetchProblems = () => {
        let chapters = null;

        //fetch chapters from server
        axios({
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
          chapters = res.data.chapters;
          let formated = formatChapters(chapters);
          console.log(formated);
          if (shouldFetch) problemContext.setChapters(formated);
        });
      };

      if (shouldFetch) fetchProblems();
    }

    return () => (shouldFetch = false);
  }, [yearParam]);

  let chaptersList = [];

  //create list of chapters
  for (let chapter in problemContext.chapters[yearParam]) {
    chaptersList.push(
      <Chapter
        chapterTitle={chapter}
        key={chapter}
        subchapters={problemContext.chapters[yearParam][chapter]}
        solvedProblemsIds={solvedProblemsIds}
      />
    );
  }

  let toBeShown = chaptersList.length === 0 ? <Loading /> : chaptersList;

  return (
    <main>
      <div className={styles.chapters}>{toBeShown}</div>
    </main>
  );
};

export default Chapters;
