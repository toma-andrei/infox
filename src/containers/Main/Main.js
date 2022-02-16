import { useContext } from "react";
import { AuthContext } from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import pawnImage from "../../assets/img/mainPage/pawn.png";
import horseImage from "../../assets/img/mainPage/horse.png";
import towerImage from "../../assets/img/mainPage/tower.png";
import brainImage from "../../assets/img/mainPage/brain.png";
import exercisesImage from "../../assets/img/mainPage/exercises.png";

const Main = (props) => {
  const fromContext = useContext(AuthContext);
  const isShownOnMainPage =
    fromContext.jwt === null ? (
      <div></div>
    ) : (
      <main>
        <div className="features">
          <Link
            className={styles.main_page_chapter_select}
            to="/problems/display_year/9"
          >
            <div className={styles.box}>
              <i className={styles.chapter_icon} aria-hidden="true">
                <img src={pawnImage} alt="pawn" />
              </i>

              <h3 className={styles.name}>Clasa a IX-a</h3>
              <p className="description">
                Bazele limbajelor C şi C++: variabile, structuri de control,
                tablouri, algoritmi elementari.
              </p>
            </div>
          </Link>
          <Link
            className={styles.main_page_chapter_select}
            to="/problems/display_year/10"
          >
            <div className={styles.box}>
              <i className={styles.chapter_icon} aria-hidden="true">
                <img src={horseImage} alt="horse" />
              </i>
              <h3 className={styles.name}>
                Clasa a X-a
                <br />
              </h3>
              <p className="description">
                Şiruri de caractere, subprograme, recursivitate, divide {"&"}{" "}
                impera, alocare dinamica
              </p>
            </div>
          </Link>
          <Link
            className={styles.main_page_chapter_select}
            to="/problems/display_year/11"
          >
            <div className={styles.box}>
              <i className={styles.chapter_icon} aria-hidden="true">
                <img src={towerImage} alt="tower" />
              </i>
              <h3 className={styles.name}>Clasa a XI-a</h3>
              <p className="description">
                Grafuri, arbori, greedy, programarea dinamică, backtracking
              </p>
            </div>
          </Link>
          <Link className={styles.main_page_chapter_select} to="/problems/hard">
            <div className={styles.box}>
              <i className={styles.chapter_icon} aria-hidden="true">
                <img src={brainImage} alt="brain" />
              </i>
              <h3 className={styles.name}>Probleme dificile</h3>
              <p className="description">
                Problemele cu cele mai puține surse corecte trimise.
              </p>
            </div>
          </Link>
          <Link className={styles.main_page_chapter_select} to="/user/about">
            <div className={styles.box}>
              <i className={styles.chapter_icon} aria-hidden="true">
                <img src={exercisesImage} alt="exercises" />
              </i>
              <h3 className={styles.name}>Despre Info-X</h3>
              <p className="description">
                Statistici despre propunătorii de probleme si rezolvatori.
              </p>
            </div>
          </Link>
        </div>
      </main>
    );
  return isShownOnMainPage;
};

export default Main;
