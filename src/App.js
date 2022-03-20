import "./App.css";
import { createContext, useState } from "react";
import Login from "./containers/Authentication/Login/Login";
import Main from "./containers/Main/Main";
import Register from "./containers/Authentication/Register/Register";
import Restore from "./containers/Authentication/Restore/Restore";
import UserPage from "./containers/User/UserPage/UserPage";
import { Routes, Route } from "react-router-dom";
import Chapters from "./containers/Chapters/Chapters";
import SubchapterProblemsAbstract from "./containers/SubchapterProblems/SubchapterProblemsAbstract";
import SpecificProblem from "./containers/SubchapterProblems/SpecificProblem/SpecificProblem";
import HardProblems from "./containers/HardProblems/HardProblems";
import UserProfile from "./containers/User/UserProfile/CurrentUserProfile";
import UserTriedProblems from "./containers/User/UserTriedProblems/UserTriedProblems";
import ProposedProblems from "./containers/AuthorAndAdmin/ProposedProblems/ProposedProblems";

export const ProblemsContext = createContext({});

function App(props) {
  const [chapters, setChapters] = useState({});
  const [proposedProblems, setProposedProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState({
    solvedProblemsArray: null,
    lastFetched: Date.now(),
  });

  //Every time state is modified, rerendering will be triggered and context will be updated
  return (
    <ProblemsContext.Provider
      value={{
        chapters: chapters,
        solvedProblems: solvedProblems,
        proposedProblems: proposedProblems,
        setChapters: (prbl) => {
          setChapters({ ...chapters, ...prbl });
        },
        setSolvedProblems: (solvedPrbl) => {
          setSolvedProblems(solvedPrbl);
        },
        setProposedProblems: (proposedProbl) => {
          setProposedProblems(proposedProbl);
        },
      }}
    >
      <Routes>
        <Route path="/main" exact element={<Main />} />
        <Route path="/" exact element={<Main />} />
        <Route path="/user/login" exact element={<Login />} />
        <Route path="/user/register" exact element={<Register />} />
        <Route path="/user/restore" exact element={<Restore />} />
        <Route path="/user/user_page" exact element={<UserPage />} />
        <Route path="/user/show_profile" exact element={<UserProfile />} />
        <Route path="/user/problems" exact element={<UserTriedProblems />} />
        <Route
          path="/user/proposed_problems"
          exact
          element={<ProposedProblems />}
        />
        <Route path="/user/accept_problems" exact element={<Main />} />
        <Route path="/user/admin" exact element={<Main />} />
        <Route
          path="/problems/display_year/:yearParam"
          element={<Chapters problems={chapters} />}
        />
        <Route
          path="/problems/display_subchapter/:id"
          exact
          element={<SubchapterProblemsAbstract problems={chapters} />}
        />
        <Route
          path="/problems/display_problem/:id"
          exact
          element={<SpecificProblem />}
        />
        <Route path="/problems/hard" exact element={<HardProblems />} />
        <Route path="/user/logout" exact element={<Main />} />
      </Routes>
    </ProblemsContext.Provider>
  );
}

export default App;
