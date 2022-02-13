import react from "react";
import styles from "./UserPage.module.css";

const UserPage = (props) => {
  return (
    <main>
      <div className="features">
        <div
          className={styles.main_page_chapter_select}
          onClick="window.location.assign('/user/show_profile');"
        >
          <div className={styles.box}>
            <i className={styles.chapter_icon} aria-hidden="true">
              &#128515;
            </i>

            <h3 className={styles.name}>Profil</h3>
            <p className="description">
              Editare date personale (parolă, oraș, etc.)
            </p>
          </div>
        </div>

        <div
          className={styles.main_page_chapter_select}
          onClick="window.location.assign('/user/problems');"
        >
          <div className={styles.box}>
            <i className={styles.chapter_icon} aria-hidden="true">
              &#127937;
            </i>
            <h3 className={styles.name}>Probleme</h3>
            <p className="description">
              Lista problemelor încercate și/sau rezolvate de tine
            </p>
          </div>
        </div>
        <div
          className={styles.main_page_chapter_select}
          onClick="window.location.assign('/user/proposed_problems');"
        >
          <div className={styles.box}>
            <i className={styles.chapter_icon} aria-hidden="true">
              &#129505;
            </i>
            <h3 className={styles.name}>Probleme propuse</h3>
            <p className="description">
              Propune o problemă nouă sau editează una propusă anterior.
            </p>
          </div>
        </div>

        <div
          className={styles.main_page_chapter_select}
          onClick="window.location.assign('/user/accept_problems');"
        >
          <div className={styles.box}>
            <i className={styles.chapter_icon} aria-hidden="true">
              &#128064;
            </i>
            <h3 className={styles.name}>Probleme de acceptat</h3>
            <p className="description">
              Acceptă probleme propuse de alți utilizatori
            </p>
          </div>
        </div>
        <div
          className={styles.main_page_chapter_select}
          onClick="window.location.assign('/user/admin');"
        >
          <div className={styles.box}>
            <i className={styles.chapter_icon} aria-hidden="true">
              &#128064;
            </i>
            <h3 className={styles.name}>Pagina de administrare</h3>
            <p className="description">Administreaza alti useri</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
