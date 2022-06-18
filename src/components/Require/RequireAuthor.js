import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Unauthorized from "../Errors/Unauthorized/Unauthorized";

const RequireAuthor = () => {
  const { author } = useAuth();

  return author ? <Outlet /> : <Unauthorized reason={""} />;
};
export default RequireAuthor;
