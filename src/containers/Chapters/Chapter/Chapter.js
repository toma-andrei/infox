import Subchapter from "./Subchapter/Subchapter";
import styles from "../Chapters.module.css";
const Chapter = (props) => {
  let subchapterList = props.subchapters.map((subch) => {
    return <Subchapter title={subch.title} id={subch.id} key={subch.id} />;
  });

  return (
    <div className={styles.chapters_show_chapter}>
      <div className={styles.chapter_title}>{props.chapterTitle}</div>
      <div className={styles.cards_collection}>{subchapterList}</div>
    </div>
  );

  //   console.log(props);
  //   let subchapters = props.chapterInfo.map((el) => {
  //     return <Subchapter chapterSubtitle={el["subchapter"]} />;
  //   });
  //   return (
  //     <div className="chapters_show_chapter">
  //       <div className="chapter_title">{props.chapterInfo[0]["chapter"]}</div>
  //       <div className="cards_collection">{subchapters}</div>
  //     </div>
  //   );
};

export default Chapter;
