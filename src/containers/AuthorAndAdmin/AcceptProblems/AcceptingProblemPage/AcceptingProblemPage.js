import { useEffect, useContext, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router";
import { Fragment } from "react";
import styles from "./AcceptingProblemPage.module.css";
import hintsStyles from "../../../SubchapterProblems/SpecificProblem/Tabs/ProblemHints.module.css";
import ajax from "../../../../assets/js/ajax";
import useKatexParser from "../../../../hooks/useKatexParser";
import Labels from "../../../SubchapterProblems/LabelsShort/Labels";
import parseMermaidText from "../../../../assets/js/parseMermaidText";
import useAuth from "../../../../hooks/useAuth";
import Modal from "../../AddProblem/Buttons/Modal/Modal";
import SavedWithSuccess from "../../AddProblem/SavedWithSuccess/SavedWithSuccess";

const AcceptingProblemPage = (props) => {
  const problem = useLocation()?.state?.problem?.problem ?? {};
  const problemCreator = useLocation()?.state?.problem?.author ?? {};
  const labels = useLocation()?.state?.problem?.labels ?? [];
  const [problemMeta, setProblemMeta] = useState();
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [problemSavedWithSuccess, setproblemSavedWithSuccess] = useState(false);
  let full = problem.full;
  let data = parseMermaidText(full);
  const md = useKatexParser();
  const { jwt } = useAuth();
  useEffect(() => {
    let shouldFetch = true;
    ajax(
      "https://infox.ro/new/problems/subchapter/" + problem.subchapter_id,
      "get",
      jwt,
      {}
    ).then((response) => {
      if (shouldFetch) setProblemMeta(response?.data?.about[0] ?? []);
    });
    return () => (shouldFetch = false);
  }, []);
  //information for each tab in the specific problem page

  //table heads on problem tabs and its corespondent in data fetched from server
  const tHeads = [
    { th: "Autor", corespondent: "nickname" },
    { th: "Sursa problemei", corespondent: "source" },
    { th: "Clasa", corespondent: "class" },
    { th: "Capitol", corespondent: "chapter" },
    { th: "Subcapitol", corespondent: "subchapter" },
    { th: "Limită de timp", corespondent: "time" },
    { th: "Limită de memorie", corespondent: "memory" },
  ];
  const changePage = (pagee) => {
    setPage(pagee);
  };

  const acceptProblem = (event) => {
    ajax(
      "https://infox.ro/new/new/authors/approve/" + problem.id,
      "post",
      jwt,
      {}
    ).then((response) => {
      console.log(response);
      if (response?.data?.includes('"success":true')) {
        problemSavedWithSuccess(true);
      } else {
        alert("Problema nu a putut fi salvată. Încercați mai târziu.");
      }
    });
  };

  // if problem is not approved and author is not current user and user is not admin shou unapproved
  let toBeShown = (
    <Fragment>
      {showModal ? (
        <Modal
          message="Doriți să acceptați problema?"
          onYesClicked={acceptProblem}
          toggleModal={() => setShowModal(false)}
        />
      ) : null}
      {problemSavedWithSuccess ? (
        <SavedWithSuccess
          text="Problema a fost salvată cu succes!"
          moveToFalse={() => setproblemSavedWithSuccess(false)}
        />
      ) : null}
      <div className={styles.problem_page}>
        <button
          className={styles.tablink}
          style={page === 1 ? { background: "#fff" } : null}
          onClick={() => changePage(1)}
        >
          Cerința
        </button>
        <button
          className={styles.tablink}
          style={page === 2 ? { background: "#fff" } : null}
          onClick={() => changePage(2)}
        >
          Indicații
        </button>
        <button
          className={styles.tablink}
          style={page === 3 ? { background: "#fff" } : null}
          onClick={() => changePage(3)}
        >
          Datele <i>raw</i>
        </button>
        <button
          className={[styles.tablink, styles.acceptProblem].join(" ")}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Acceptă problema
        </button>
        <div style={page === 1 ? {} : { display: "none" }}>
          <div className={styles.tabcontent}>
            <div className={styles.problem}>
              <div className={styles.metas}>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: problem.id + ". " + md(problem.title),
                  }}
                />
                <Labels labels={labels} />
                <div style={{ margin: "10px 0 10px 0" }}></div>
                <table className={[styles.metas, styles.metaTable].join(" ")}>
                  <thead>
                    <tr>
                      {tHeads.map((th) => (
                        <th key={th.th} style={{ width: "fit-content" }}>
                          {th.th}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label={tHeads[0].th} key={tHeads[0].th}>
                        {problemCreator?.nickname ?? "autor"}
                      </td>
                      <td data-label={tHeads[1].th} key={tHeads[1].th}>
                        {problem?.source ?? "sursa"}
                      </td>
                      <td data-label={tHeads[2].th} key={tHeads[2].th}>
                        {problemMeta?.class ?? "clasa"}
                      </td>
                      <td data-label={tHeads[3].th} key={tHeads[3].th}>
                        {problemMeta?.subchapter ?? "subcapitol"}
                      </td>
                      <td data-label={tHeads[4].th} key={tHeads[4].th}>
                        {problemMeta?.chapter ?? "capitol"}
                      </td>
                      <td data-label={tHeads[5].th} key={tHeads[5].th}>
                        {problem?.limit_time +
                          (problem?.limit_time >= 1
                            ? " milisecunde"
                            : " secunde") ?? "limita timp"}
                      </td>
                      <td data-label={tHeads[6].th} key={tHeads[6].th}>
                        {problem?.limit_memory + " MB" ?? "memorie"} /{" "}
                        {problem?.limit_stack + " MB" ?? "stiva"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                className="problem_text"
                dangerouslySetInnerHTML={{ __html: md(data) }}
              ></div>
            </div>
          </div>
        </div>
        <div>
          <div
            className={hintsStyles.hintsPage}
            style={!(page === 2) ? { display: "none" } : {}}
          >
            <div className={hintsStyles.title}>Indicații de rezolvare</div>
            <div
              className={hintsStyles.hintText}
              dangerouslySetInnerHTML={{
                __html: md(
                  problem.tips?.length === 0
                    ? "Această problemă nu are indicații de rezolvare."
                    : problem.tips
                ),
              }}
            />
          </div>
        </div>
        <div style={!(page === 3) ? { display: "none" } : {}}>
          <div className={styles.rawData}>
            <div className={styles.title}>Titlul neformatat</div>
            <div
              className={[styles.rawFullProblem, styles.neformatat].join(" ")}
            >
              {problem.title}
            </div>
            <div className={styles.title}>Cerința neformatată a problemei</div>
            <div
              className={[styles.rawFullProblem, styles.neformatat].join(" ")}
            >
              {full}
            </div>
            <div className={styles.title}>
              Indicații de rezolvare neformatate
            </div>
            <div
              className={[styles.rawFullProblem, styles.neformatat].join(" ")}
            >
              {problem.tips}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return <main>{toBeShown}</main>;
};

export default AcceptingProblemPage;
