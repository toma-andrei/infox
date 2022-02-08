import { createContext, Fragment, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Layout.module.css";
import NavbarAuth from "../Navbar/NavbarAuth";

export const AuthContext = createContext({});

const Layout = (props) => {
  const [infoxJWT, setInfoxJWT] = useState(localStorage.getItem("infoxJWT"));
  return (
    <AuthContext.Provider value={{ updateJWT: setInfoxJWT }}>
      {infoxJWT === null ? (
        <Fragment>
          <Navbar />
          {props.children}
        </Fragment>
      ) : (
        <Fragment>
          <NavbarAuth />
          {props.children}
        </Fragment>
      )}
    </AuthContext.Provider>
  );
};

export default Layout;
