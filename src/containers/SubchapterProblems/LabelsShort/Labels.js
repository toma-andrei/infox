import styles from "./Labels.module.css";
import Label from "./Label";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import ajax from "../../../assets/js/ajax";
// props be like {labels: "id1,id2,id3"}

const Labels = (props) => {
  const [labels, setLabels] = useState([]);
  const { jwt } = useAuth();

  useEffect(() => {
    let shouldFetch = true;
    ajax("https://infox.ro/new/labels", "get", jwt, {}).then((res) => {
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
