import { Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import "./Layout.module.css";
import NavbarAuth from "../Navbar/NavbarAuth";

const Layout = (props) => {
  const infoxJWT = localStorage.getItem("infoxJWT");
  return infoxJWT === null ? (
    <Fragment>
      <Navbar />
      {props.children}
    </Fragment>
  ) : (
    <>
      <Fragment>
        <NavbarAuth />
        {props.children}
      </Fragment>
    </>
  );
  // };
  // return <Layout>{props.children}</Layout>;
};

export default Layout;
