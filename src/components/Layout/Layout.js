import { createContext, Fragment, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Layout.module.css";
import NavbarAuth from "../Navbar/NavbarAuth";
import axios from "axios";
import { requestIP } from "../../env";

export const AuthContext = createContext({});

const Layout = (props) => {
  const [infoxJWT, setInfoxJWT] = useState(localStorage.getItem("infoxJWT"));

  if (infoxJWT != null) {
    axios({
      method: "get",
      url: "http://" + requestIP,
      data: JSON.stringify({
        url: "https://infox.ro/new/users/profile",
        jwt: `${infoxJWT}`,
      }),
      headers: {
        Authorization: `Bearer ${infoxJWT}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data);
    });
  }

  return (
    <AuthContext.Provider value={{ jwt: infoxJWT, updateJWT: setInfoxJWT }}>
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
