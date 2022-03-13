import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { requestIP } from "../../../env";
import TriedProblem from "./TriedProblem/TriedProblem";
import styles from "./UserTriedProblems.module.css";
import { AuthContext } from "../../../components/Layout/Layout";

const UserTriedProblems = (props) => {
  const { jwt } = useContext(AuthContext);
  const [solvedProblems, setSolvedProblems] = useState([]);

  let problems = [
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizieSeteaza precizieSeteaza precizieSeteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizieSeteaza precizieSeteaza precizieSeteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizieSeteaza precizieSeteaza precizieSeteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizieSeteaza precizieSeteaza precizieSeteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "10",
      id: "21",
      title: "Seteaza precizie",
    },
    {
      abstract:
        "Se dau trei numere: aa,bb și kk. Să se afișeze \frac ab b,a cu kk zecimale prin rotunjire.",
      score: "100",
      id: "21",
      title: "Seteaza precizie",
    },
  ];

  useEffect(() => {
    axios({
      method: "post",
      url: "http://" + requestIP,
      data: {
        method: "get",
        url: "https://infox.ro/new/users/problems",
        jwt: jwt,
      },
    }).then((res) => {
      setSolvedProblems(res.data.problemHistory);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      solvedProblems.map((entry) =>
        axios.post("http://" + requestIP, {
          method: "get",
          url: "https://infox.ro/full/" + entry.problem_id,
          jwt: jwt,
        })
      );
    };
  }, [solvedProblems]);

  let problemList = problems.map((problem) => (
    <TriedProblem
      abstract={problem.abstract}
      score={problem.score}
      id={problem.id}
      title={problem.title}
    />
  ));

  return (
    <main>
      <div className={styles.shapeProblem}>{problemList}</div>
    </main>
  );
};

export default UserTriedProblems;
