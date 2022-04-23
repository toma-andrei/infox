import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Unauthorized from "../Errors/Unauthorized/Unauthorized";

const RequireAdmin = () => {
  const { admin } = useAuth();

  // if jwt is not set, send user to login page
  return admin ? <Outlet /> : <Unauthorized reason={""} />;
};
export default RequireAdmin;
