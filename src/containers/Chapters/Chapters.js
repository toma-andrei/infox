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
  const { yearParam } = useParams();
  const { jwt } = useContext(AuthContext);
  let problemContext = useContext(ProblemsContext);

  useEffect(() => {
    if (problemContext.chapters[yearParam] === undefined) {
      const fetchProblems = async () => {
        let chapters = null;

        //fetch chapters from server
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
          chapters = res.data.chapters;
        });

        return formatChapters(chapters, yearParam);
      };
      fetchProblems().then((response) => {
        problemContext.setChapters(response);
      });
    }
  }, [yearParam]);

  let chaptersList = [];

  //create list of chapters
  for (let chapter in problemContext.chapters[yearParam]) {
    chaptersList.push(
      <Chapter
        chapterTitle={chapter}
        key={chapter}
        subchapters={problemContext.chapters[yearParam][chapter]}
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
