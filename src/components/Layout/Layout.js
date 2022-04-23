import { createContext, Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Layout.module.css";
import NavbarAuth from "../Navbar/NavbarAuth";
import axios from "axios";
import { requestIP } from "../../env";
import defaultAvatar from "../../assets/img/navbarImages/basic_avatar.jpg";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

const Layout = (props) => {
  const [infoxJWT, setInfoxJWT] = useState(localStorage.getItem("infoxJWT"));
  let [userInfo, setUserInfo] = useState({});
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem("background")
      ? localStorage.getItem("background")
      : "#208f8f"
  );

  const backgroundColorModifiedHandler = (color) => {
    setBackgroundColor(color);
    localStorage.setItem("background", color);
    document.getElementsByTagName("body")[0].style.backgroundColor =
      backgroundColor;
  };

  //called when the component renders
  useEffect(() => {
    document.getElementsByTagName("body")[0].style.backgroundColor =
      backgroundColor;
  }, [backgroundColor]);

  //verify jwt and fetch user data if jwt is valid
  useEffect(() => {
    if (infoxJWT) {
      const { exp, author } = jwt_decode(infoxJWT);
      // if jwt expired remove it from localstorage
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem("infoxJWT");
        setInfoxJWT(null);
        return;
      }

      //fetch user data from api
      axios({
        method: "post",
        url: "http://" + requestIP,
        data: JSON.stringify({
          url: "https://infox.ro/new/users/profile",
          method: "get",
          jwt: infoxJWT,
        }),
        headers: {
          Authorization: `Bearer ${infoxJWT}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        userInfo = {
          admin: parseInt(res.data.id) === 1,
          avatar: res.data.avatar,
          author: author,
          coins: res.data.coins,
          county: res.data.county,
          firstname: res.data.firstname,
          id: res.data.id,
          lastname: res.data.lastname,
          locality: res.data.locality,
          nickname: res.data.nickname,
          public:
            res.data.public == "0"
              ? false
              : res.data.public == "1"
              ? true
              : res.data.public,
          school: res.data.school,
          teacher: res.data.teacher,
        };

        setUserInfo(userInfo);
      });
    }
  }, [infoxJWT]);

  //depending on infoxJWT we render different navbar
  return (
    <AuthContext.Provider
      value={{
        jwt: infoxJWT,
        updateJWT: setInfoxJWT,
        updateUserInfo: setUserInfo,
        backgroundColor: backgroundColor,
        setBackgroundColor: backgroundColorModifiedHandler,
        ...userInfo,
      }}
    >
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
