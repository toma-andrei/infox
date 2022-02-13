import { useParams } from "react-router";
import axios from "axios";
import { requestIP } from "../../env";
import { AuthContext } from "../../components/Layout/Layout";
import { useContext, useEffect, useState } from "react";

const Chapters = (props) => {
  const [chapters, setChapters] = useState([]);

  const { year } = useParams();
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    axios({
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
    }).then((res) => {
      setChapters(res.data.chapters);
    });
  }, []);

  let currentIndex = 0;
  let position = 0;
  let subchapters = [];

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

  console.log(subchapters);

  return (
    <main>
      <div className="chapters"></div>
    </main>
  );
};

export default Chapters;
