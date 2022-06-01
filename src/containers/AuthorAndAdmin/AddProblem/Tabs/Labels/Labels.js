import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../../../../hooks/useAuth";
import styles from "./Labels.module.css";
import { requestIP } from "../../../../../env";

const Labels = (props) => {
  const [labels, setLabels] = useState([]);
  const { jwt } = useAuth();

  useEffect(() => {
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: {
        url: "https://infox.ro/new/labels",
        method: "get",
        jwt: jwt,
      },
    }).then((res) => {
      setLabels(res.data.labels);
    });
  }, []);

  return <div>labels</div>;
};

export default Labels;
