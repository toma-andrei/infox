import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useLocation, useParams } from "react-router";
import { AuthContext } from "../../../components/Layout/Layout";
import { requestIP } from "../../../env";
import Loading from "../../UI/Loading/Loading";
import Unapproved from "./Unapproved/Unapproved";

const SpecificProblem = (props) => {
  const [problem, setProblem] = useState(useLocation().state);
  const { id } = useParams();
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    if (problem === null) {
      const getProblem = async () => {
        let problemPromise = null;
        await axios
          .post(
            "http://" + requestIP,
            JSON.stringify({
              method: "get",
              url: "https://infox.ro/new/problems/full/" + id,
              jwt: jwt,
            })
          )
          .then((response) => {
            problemPromise = response.data.problem;
          });

        return problemPromise;
      };
      getProblem().then((response) => {
        setProblem(response);
      });
    }
  }, []);

  let toBeShown = problem ? (
    problem.approved === "0" ? (
      <Unapproved />
    ) : (
      <div>{problem.id}</div>
    )
  ) : (
    <Loading />
  );

  return <div>{toBeShown}</div>;
};

export default SpecificProblem;
