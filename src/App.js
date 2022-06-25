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
import About from "./containers/Main/About";
import RequireAuthor from "./components/Require/RequireAuthor";
import AcceptProblems from "./containers/AuthorAndAdmin/AcceptProblems/AcceptProblems";
import AcceptingProblemPage from "./containers/AuthorAndAdmin/AcceptProblems/AcceptingProblemPage/AcceptingProblemPage";

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
        <Route path="/logout" exact element={<Main fromLogout={true} />} />
        {/* Routes only available for unauthenticated users */}
        <Route element={<RequireUnauth />}>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/restore" exact element={<Restore />} />
        </Route>
        <Route path="/about" exact element={<About />} />

        {/* Routes only available for authenticated users */}
        <Route element={<RequireAuth />}>
          <Route path="/user_page" exact element={<UserPage />} />
          <Route path="/show_profile" exact element={<UserProfile />} />
          <Route path="/triedProblems" exact element={<UserTriedProblems />} />
          <Route path="/problems/hard" exact element={<HardProblems />} />
          <Route
            path="/problems/year/:yearParam"
            element={<Chapters problems={chapters} />}
          />
          <Route
            path="/problems/subchapter/:id"
            exact
            element={<SubchapterProblemsAbstract problems={chapters} />}
          />
          <Route
            path="/problems/problem/:id"
            exact
            element={<SpecificProblem />}
          />
          <Route
            path="/problems/search/:searchString"
            exact
            element={
              <SubchapterProblemsAbstract url="https://infox.ro/new/problems/search" />
            }
          />
          <Route
            path="/problems/label/:labelId"
            exact
            element={
              <SubchapterProblemsAbstract
                url="https://infox.ro/new/lables/problems/"
                search={false}
              />
            }
          />
          <Route
            path="/problems/author/:authorId"
            exact
            element={
              <SubchapterProblemsAbstract
                url="https://infox.ro/new/authors/problems_by/"
                search={false}
              />
            }
          />
          <Route element={<RequireAuthor />}>
            <Route
              path="/proposed_problems"
              exact
              element={<ProposedProblems />}
            />
            <Route path="/addproblem/:id" exact element={<AddProblem />} />
            <Route path="/addproblem" exact element={<AddProblem />} />
          </Route>

          {/* Routes only available for admin and authors */}
          <Route element={<RequireAdmin />}>
            <Route path="/admin" exact element={<Main />} />
            <Route path="/accept_problems" exact element={<AcceptProblems />} />
            <Route
              path="/accept_problem/:id"
              exact
              element={<AcceptingProblemPage />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProblemsContext.Provider>
  );
}

export default App;
