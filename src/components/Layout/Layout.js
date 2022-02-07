import { createContext, Fragment, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Layout.module.css";
import NavbarAuth from "../Navbar/NavbarAuth";

const Layout = (props) => {
  const [infoxJWT, setInfoxJWT] = useState(localStorage.getItem("infoxJWT"));
  const AuthContext = createContext({
    infoxJWT: infoxJWT,
    setInfoxJWT: setInfoxJWT,
  });
  return (
    <AuthContext value={[infoxJWT, (jwt) => setInfoxJWT(jwt)]}>
      (infoxJWT === null ? (
      <AuthContext value>
        <Fragment>
          <Navbar />
          {props.children}
        </Fragment>
      </AuthContext>
      ) : (
      <>
        <Fragment>
          <NavbarAuth />
          {props.children}
        </Fragment>
      </>
      ))
    </AuthContext>
  );
};

export default Layout;
