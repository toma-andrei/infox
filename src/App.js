import "./App.css";
import Login from "./containers/Authentication/Login/Login";
import Main from "./containers/Main/Main";
import Register from "./containers/Authentication/Register/Register";
import Restore from "./containers/Authentication/Restore/Restore";
import UserPage from "./containers/UserPage/UserPage";
import { Routes, Route } from "react-router-dom";
import Chapters from "./containers/Chapters/Chapters";
import AllProblems from "./containers/Problems/AllProblems";
import { createContext, useState } from "react";

export const ProblemsContext = createContext({});

function App() {
  const [problems, setProblems] = useState({});
  return (
    <ProblemsContext.Provider
      value={{
        problems: problems,
        setProblems: (prbl) => {
          console.log(prbl);
          setProblems(prbl);
        },
      }}
    >
      <Routes>
        <Route path="/main" exact element={<Main />} />
        <Route path="/user/login" exact element={<Login />} />
        <Route path="/user/register" exact element={<Register />} />
        <Route path="/user/restore" exact element={<Restore />} />
        <Route path="/user/user_page" exact element={<UserPage />} />
        <Route
          path="/problems/display_year/:yearParam"
          element={<Chapters problems={problems} />}
        />
        <Route path="/user/logout" exact element={<Main />} />
        <Route
          path="/problems/display_subchapter/:id"
          exact
          element={<AllProblems problems={problems} />}
        />
        <Route path="/problems/hard" exact element={<AllProblems />} />
        <Route path="/" exact element={<Main />} />
      </Routes>
    </ProblemsContext.Provider>
  );
}

export default App;
