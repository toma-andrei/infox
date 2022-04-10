import { useNavigate } from "react-router";
import whiteInfoXLogo from "../../assets/img/infox_logo_white.svg";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Layout/Layout";
import { useContext } from "react";
import smallPawn from "../../assets/img/navbarImages/small_pawn.png";
import smallHorse from "../../assets/img/navbarImages/small_horse.png";
import smallTower from "../../assets/img/navbarImages/small_tower.png";
import coinImage from "../../assets/img/coin.png";
import defaultAvatar from "../../assets/img/navbarImages/basic_avatar.jpg";

const NavbarAuth = () => {
  const collapseNavLinks = () => {
    const button = document.getElementById("navbarSupportedContent");
    button.classList.toggle("show");
  };

  const navigate = useNavigate();

  const fromContext = useContext(AuthContext);

  // function to logout. Delete all jwt tokens and redirect to login page
  const logout = () => {
    localStorage.clear();
    fromContext.updateJWT(null);
    fromContext.updateUserInfo(null);
    navigate("/main");
  };

  let classes = "navbar-nav ml-auto " + styles.MoveRight;

  let navbarClasses = [
    "navbar",
    "navbar-expand-lg",
    "navbar-dark",
    "bg-dark",
    "sticky-top",
    styles.addLeftRightSpacing,
  ];

  return (
    <nav className={navbarClasses.join(" ")}>
      <Link className="navbar-brand" to="/main">
        <img
          src={whiteInfoXLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="InfoX logo"
        />
        InfoX
      </Link>
      <button
        className="navbar-toggler "
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={collapseNavLinks}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={"collapse navbar-collapse " + styles.Transition}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <form className="form-inline my-lg-0">
              <button
                type="submit"
                disabled
                style={{ display: "none" }}
                aria-hidden="true"
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
            <Link
              className="nav-link"
              style={{ fontSize: "24px", margin: 0, padding: 0 }}
              to="/problems/display_year/9"
            >
              <img src={smallPawn} />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={{ fontSize: "24px", margin: 0, padding: 0 }}
              to="/problems/display_year/10"
            >
              <img src={smallHorse} />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={{ fontSize: "24px", margin: 0, padding: 0 }}
              to="/problems/display_year/11"
            >
              <img src={smallTower} />
            </Link>
          </li>
        </ul>
        <ul className={classes}>
          <li className="nav-item">
            <a
              id="user_coins"
              className="nav-link xnavbar-item"
              style={{ display: "inline-flex" }}
            >
              <div className="mr-2" id="user_coins_value">
                {fromContext.coins}
              </div>
              <img
                src={coinImage}
                style={{
                  width: "25px",
                  verticalAlign: "text-top",
                  marginLeft: "4px",
                  marginRight: "10px",
                }}
                alt="coin image"
              />
            </a>
          </li>
          <li className="nav-item">
            <Link to="/user/user_page">
              <img
                className="nav-link xnavbar-item small_navbar_avatar"
                src={
                  fromContext.avatar === "/avatars/basic_avatar.jpg"
                    ? defaultAvatar
                    : fromContext.avatar
                }
                style={{
                  border: "1px solid white",
                  width: "35px",
                  padding: "1px",
                  margin: "3px 0 2px 0",
                  borderRadius: "50%",
                }}
              />
            </Link>
          </li>
          <li className="nav-item">
            <button
              className={"nav-link xnavbar-item " + styles.ClearButton}
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
