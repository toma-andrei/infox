import { useContext } from "react";
import { AuthContext } from "../components/Layout/Layout";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
