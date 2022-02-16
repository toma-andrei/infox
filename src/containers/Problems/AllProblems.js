import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { requestIP } from "../../env";
import { AuthContext } from "../../components/Layout/Layout";

const AllProblems = (props) => {
  const { id } = useParams();
  const { jwt } = useContext(AuthContext);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: JSON.stringify({
        method: "get",
        url: "https://infox.ro/new/problems/problems/" + id,
        jwt: jwt,
      }),
    }).then((res) => {
      setProblems(res.data.problems);
    });
  }, []);

  return (
    <div>
      {problems.map((pr) => {
        return (
          <div key={pr.title}>
            {pr.id}
            {": "}
            {pr.title}
          </div>
        );
      })}
    </div>
  );
};

export default AllProblems;
