import Subchapter from "./Subchapter/Subchapter";
import styles from "../Chapters.module.css";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { requestIP } from "../../../env";
/**
 * Chapter component. Create subchapters and render them.
 */
const Chapter = (props) => {
  //problems from this subchapter
  let subchapterList = props.subchapters.map((subch) => {
    return (
      <Subchapter
        title={subch.subchapter}
        id={subch.id}
        key={subch.id}
        solvedProblemsIds={props.solvedProblemsIds}
      />
    );
  });

  return (
    <div className={styles.chapters_show_chapter}>
      <div className={styles.chapter_title}>
        {props.chapterTitle.replace("##", "")}
      </div>
      <div className={styles.cards_collection}>{subchapterList}</div>
    </div>
  );
};

export default Chapter;
