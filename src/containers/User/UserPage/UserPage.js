import styles from "./UserPage.module.css";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const UserPage = (props) => {
  const { admin, author } = useAuth();

  return (
    <main>
      <div className="features">
        {/*user/show_profile*/}
        <Link
          to="/user/show_profile"
          className={styles.main_page_chapter_select}
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
        </Link>
        {/*user/problems - user tried problems*/}
        <Link className={styles.main_page_chapter_select} to="/user/problems">
          <div className={styles.box}>
            <i className={styles.chapter_icon} aria-hidden="true">
              &#127937;
            </i>
            <h3 className={styles.name}>Probleme</h3>
            <p className="description">
              Lista problemelor încercate și/sau rezolvate de tine
            </p>
          </div>
        </Link>
        {/*user/proposed_problems - user proposed problems*/}
        {author ? (
          <Link
            className={styles.main_page_chapter_select}
            to="/user/proposed_problems"
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
          </Link>
        ) : null}
        {/*user/accept_problems - problems that admin should accept*/}
        {admin ? (
          <Link
            className={styles.main_page_chapter_select}
            to="/user/accept_problems"
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
          </Link>
        ) : null}

        {/*user/admin - manage other users*/}
        {admin ? (
          <Link className={styles.main_page_chapter_select} to="/user/admin">
            <div className={styles.box}>
              <i className={styles.chapter_icon} aria-hidden="true">
                &#128064;
              </i>
              <h3 className={styles.name}>Pagina de administrare</h3>
              <p className="description">Administreaza alti useri</p>
            </div>
          </Link>
        ) : null}
      </div>
    </main>
  );
};

export default UserPage;
