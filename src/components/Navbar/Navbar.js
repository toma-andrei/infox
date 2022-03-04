import whiteInfoXLogo from "../../assets/img/infox_logo_white.svg";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const collapseNavLinks = () => {
    const button = document.getElementById("navbarSupportedContent");
    button.classList.toggle("show");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
      style={{ zIndex: "1", padding: "8px 16px" }}
    >
      <Link className="navbar-brand" to="/main">
        <img
          src={whiteInfoXLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="InfoX Logo"
        />
        InfoX
      </Link>
      <button
        className="navbar-toggler"
        onClick={() => collapseNavLinks()}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className={"navbar-nav " + styles.MoveRight}>
          <li className="nav-item">
            <Link className="nav-link xnavbar-item" to="/user/login">
              Autentificare
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
