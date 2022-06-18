import styles from "./About.module.css";
import logo from "../../assets/img/favicon.ico";
const About = () => {
  return (
    <div className={styles.background}>
      <div className={styles.title}>
        <img src={logo} alt="logo" className={styles.logo} />
        InfoX
      </div>
      <div className={styles.text}>
        InfoX este o aplicație web ce permite celor care doresc, să-și
        aprofundeze cunoșințele în limbajul de programare C/C++ prin rezolvarea
        de probleme.
      </div>
      <div className={styles.text}>
        <strong>Dezvoltatori:</strong> <strong>Cosmin</strong> Vârlan,{" "}
        <strong>Gabriela</strong> Ursachi, <strong>George</strong> Stoica,{" "}
        <strong>Andrei</strong> Toma{" "}
      </div>
      <div className={styles.text}>
        Contact: <strong>cosmin.varlan@gmail.com</strong>
      </div>
    </div>
  );
};

export default About;
