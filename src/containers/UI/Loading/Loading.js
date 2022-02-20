import styles from "./Loading.module.css";

const Loading = (porps) => {
  return (
    <div className={styles.formatLoading}>
      <span className={styles.centerText}>Loading...</span>
    </div>
  );
};

export default Loading;
