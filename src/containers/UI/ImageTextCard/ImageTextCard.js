import { Link } from "react-router-dom";
import styles from "./ImageTextCard.module.css";

const ImageTextCard = (props) => {
  return props.main ? (
    <Link to={props.to} className={styles.main_page_chapter_select}>
      <div className={styles.box}>
        <i className={styles.chapter_icon} aria-hidden="true">
          <img src={props.image}></img>
        </i>

        <h3 className={styles.name}>{props.title}</h3>
        <p className="description">{props.description}</p>
      </div>
    </Link>
  ) : (
    <Link to={props.to} className={styles.main_page_chapter_select}>
      <div className={styles.box}>
        <i className={styles.chapter_icon} aria-hidden="true">
          {props.image}
        </i>

        <h3 className={styles.name}>{props.title}</h3>
        <p className="description">{props.description}</p>
      </div>
    </Link>
  );
};

export default ImageTextCard;
