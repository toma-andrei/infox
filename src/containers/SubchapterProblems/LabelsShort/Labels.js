import styles from "./Labels.module.css";
import Label from "./Label";
import { useState, useEffect } from "react";
import axios from "axios";
import { requestIP } from "../../../env";
import useAuth from "../../../hooks/useAuth";
// props be like {labels: "id1,id2,id3"}

const Labels = (props) => {
  const [labels, setLabels] = useState([]);
  const { jwt } = useAuth();

  useEffect(() => {
    let shouldFetch = true;
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: JSON.stringify({
        jwt: jwt,
        method: "get",
        url: "https://infox.ro/new/labels",
      }),
    }).then((res) => {
      if (shouldFetch) setLabels([...res.data.labels]);
    });

    return () => (shouldFetch = false);
  }, []);

  let toShow =
    props.labels && props.labels != "" && labels.length > 0
      ? props.labels.split(",").map((label) => {
          return (
            <Label
              key={label}
              id={label}
              name={labels.find((l) => l.id == label).name}
            />
          );
        })
      : null;

  return <>{toShow}</>;
};

export default Labels;
