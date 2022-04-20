import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Unauthorized from "../Errors/Unauthorized/Unauthorized";

const RequireAdmin = () => {
  const { id } = useAuth();

  // if jwt is not set, send user to login page
  return parseInt(id) === 1 ? <Outlet /> : <Unauthorized reason={""} />;
};
export default RequireAdmin;
