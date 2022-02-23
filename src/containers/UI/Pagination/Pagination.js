import styles from "./Pagination.module.css";

const Pagination = (props) => {
  return (
    <div className={styles.arrows}>
      <div className={styles.arrowSpans}>
        <button
          className={[styles.arrow, styles.left].join(" ")}
          onClick={() => props.nextPage(-1)}
        >
          {"<"}
        </button>
        <button className={styles.arrow}>{props.pageIndex + 1}</button>
        <button
          className={[styles.arrow, styles.right].join(" ")}
          onClick={() => props.nextPage(1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
