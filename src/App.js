import "./App.css";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./containers/Authentication/Login/Login";
import "./katex/css/katex.min.css";
import Main from "./containers/Main/Main";
import Register from "./containers/Authentication/Register/Register";
import Restore from "./containers/Authentication/Restore/Restore";
import UserPage from "./containers/User/UserPage/UserPage";
import Chapters from "./containers/Chapters/Chapters";
import SubchapterProblemsAbstract from "./containers/SubchapterProblems/SubchapterProblemsAbstract";
import SpecificProblem from "./containers/SubchapterProblems/SpecificProblem/SpecificProblem";
import HardProblems from "./containers/HardProblems/HardProblems";
import UserProfile from "./containers/User/UserProfile/CurrentUserProfile";
import UserTriedProblems from "./containers/User/UserTriedProblems/UserTriedProblems";
import ProposedProblems from "./containers/AuthorAndAdmin/ProposedProblems/ProposedProblems";
import AddProblem from "./containers/AuthorAndAdmin/AddProblem/AddProblem";
//middlewares
import RequireAuth from "./components/Require/RequireAuth";
import RequireAdmin from "./components/Require/RequireAdmin";
import RequireUnauth from "./components/Require/RequireUnauth";
import NotFound from "./components/Errors/NotFound/NotFound";

export const ProblemsContext = createContext({});

function App(props) {
  const [chapters, setChapters] = useState({});
  const [proposedProblems, setProposedProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState({
    solvedProblemsIds: null,
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
        clearContext: () => {
          setChapters({});
          setSolvedProblems({
            solvedProblemsIds: null,
            solvedProblemsArray: null,
            lastFetched: Date.now(),
          });
          setProposedProblems([]);
        },
      }}
    >
      <Routes>
        <Route path="/main" exact element={<Main />} />
        <Route path="/" exact element={<Main />} />
        <Route path="/user/logout" exact element={<Main fromLogout={true} />} />
        {/* Routes only available for unauthenticated users */}
        <Route element={<RequireUnauth />}>
          <Route path="/user/login" exact element={<Login />} />
          <Route path="/user/register" exact element={<Register />} />
          <Route path="/user/restore" exact element={<Restore />} />
        </Route>

        {/* Routes only available for authenticated users */}
        <Route element={<RequireAuth />}>
          <Route path="/user/user_page" exact element={<UserPage />} />
          <Route path="/user/show_profile" exact element={<UserProfile />} />
          <Route path="/user/problems" exact element={<UserTriedProblems />} />
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

          {/* Routes only available for admin and authors */}
          <Route element={<RequireAdmin />}>
            <Route
              path="/user/proposed_problems"
              exact
              element={<ProposedProblems />}
            />
            <Route path="/user/admin" exact element={<Main />} />
            <Route path="/user/accept_problems" exact element={<Main />} />
            <Route path="/addproblem/editor" exact element={<AddProblem />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProblemsContext.Provider>
  );
}

export default App;
