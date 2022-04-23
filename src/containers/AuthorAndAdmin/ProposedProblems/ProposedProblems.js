import { useEffect, useState, useContext } from "react";
import axios from "axios";
import styles from "./ProposedProblems.module.css";
import { ProblemsContext } from "../../../App";
import ProposedProblem from "./ProposedProblem/ProposedProblem";
import { requestIP } from "../../../env";
import { AuthContext } from "../../../components/Layout/Layout";
import Loading from "../../UI/Loading/Loading";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const ProposedProblems = (props) => {
  const fromProblemsContext = useContext(ProblemsContext);
  const { jwt } = useAuth();

  const [proposedProblems, setProposedProblems] = useState([]);

  const fetchData = async () => {
    const response = await axios.post("http://" + requestIP, {
      url: "https://infox.ro/new/authors/problems",
      jwt: jwt,
      method: "get",
    });

    // sort proposed problems after their id;
    response.data.problems.sort((a, b) => {
      let aa = parseInt(a.id);
      let bb = parseInt(b.id);

      return aa < bb ? 1 : aa > bb ? -1 : 0;
    });

    fromProblemsContext.setProposedProblems(response.data.problems);
  };

  useEffect(() => {
    if (
      !fromProblemsContext.proposedProblems ||
      Object.keys(fromProblemsContext.proposedProblems).length === 0
    ) {
      fetchData();
    } else {
      setProposedProblems(fromProblemsContext.proposedProblems);
    }
  }, []);

  useEffect(() => {
    setProposedProblems(fromProblemsContext.proposedProblems);
  }, [fromProblemsContext.proposedProblems]);

  let problemList;

  if (proposedProblems) {
    problemList = proposedProblems.map((prbl) => {
      return (
        <ProposedProblem
          key={prbl.id}
          id={prbl.id}
          title={prbl.title}
          abstract={prbl.abstract}
          approved={prbl.approved === "1" ? true : false}
        />
      );
    });
  } else problemList = <Loading />;

  return (
    <main>
      <div className={styles.addNewProblemDiv}>
        <div className={styles.proposedProblemsWrapper}>
          <Link to="/addproblem/editor" className={styles.modifyAnchor}>
            <span className={styles.plusCircle}>➕</span>
            <p className={styles.abstract}>Adaugă o problemă nouă.</p>
          </Link>
        </div>
      </div>

      <div className={styles.shapeProblem}>{problemList}</div>
    </main>
  );
};

export default ProposedProblems;
