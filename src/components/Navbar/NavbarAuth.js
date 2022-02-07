import { useNavigate } from "react-router";
import whiteInfoXLogo from "../../assets/img/infox_logo_white.svg";
import styles from "./Navbar.module.css";

const NavbarAuth = () => {
  const collapseNavLinks = () => {
    const button = document.getElementById("navbarSupportedContent");
    button.classList.toggle("show");
  };

  const navigate = useNavigate();

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("infoxJWT");
    navigate("/main");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <a className="navbar-brand" href="/main">
        <img
          src="../assets/img/infox_logo_white.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="InfoX logo"
        />
        InfoX
      </a>
      <button
        className="navbar-toggler"
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <form className="form-inline my-lg-0">
              <button
                type="submit"
                disabled
                style={{ display: "none" }}
                ariaHidden="true"
              ></button>
              <input
                className="form-control mr-lg-2"
                id="search_problems"
                name="search"
                onInput="showPossibleAnswer()"
                placeholder="Căutare"
                type="text"
                style={{ backgroundColor: "#fff", border: "1px solid #ced4da" }}
              />
            </form>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ fontSize: "24px", margin: 0, padding: 0 }}
              href="/problems/display_year/9"
            >
              <img src="/img/necesare/small_pawn.png" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ fontSize: "24px", margin: 0, padding: 0 }}
              href="/problems/display_year/10"
            >
              <img src="/img/necesare/small_horse.png" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ fontSize: "24px", margin: 0, padding: 0 }}
              href="/problems/display_year/11"
            >
              <img src="/img/necesare/small_tower.png" />
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a id="user_coins" className="nav-link xnavbar-item">
              <div className="inline-div" id="user_coins_value"></div>
              <img
                src="/img/necesare/coin.png"
                style={{ width: "25px", verticalAlign: "text-top" }}
              />
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/user/user_page"
              style={{
                border: "1px solid white",
                width: "35px",
                padding: "1px",
                margin: "3px 0 2px 0",
                borderRadius: "50%",
              }}
            >
              <img
                className="nav-link xnavbar-item small_navbar_avatar"
                src="../assets/img/favicon.ico"
              />
            </a>
          </li>

          <li className="nav-item">
            <a href="/user/show_profile">
              <img
                className="nav-link xnavbar-item small_navbar_avatar"
                src=""
                style={{
                  border: "1px solid white",
                  width: "35px",
                  padding: "1px",
                  margin: "3px 0 2px 0",
                  borderRadius: "50%",
                }}
              />
            </a>
          </li>

          <li className="nav-item">
            <button
              className={"nav-link xnavbar-item " + styles.ClearButton}
              href="/user/logout"
              onClick={() => logout()}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarAuth;
