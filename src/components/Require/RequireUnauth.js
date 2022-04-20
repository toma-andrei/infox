import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import NotFound from "../Errors/NotFound/NotFound";

const RequireUnauth = () => {
  const { jwt } = useAuth();

  // if jwt is not set, send user to login page
  return !jwt ? <Outlet /> : <NotFound reason={""} />;
};
export default RequireUnauth;
