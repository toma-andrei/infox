import "./App.css";
import Login from "./containers/Authentication/Login/Login";
import Main from "./containers/Main/Main";
import Register from "./containers/Authentication/Register/Register";
import Restore from "./containers/Authentication/Restore/Restore";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/main" exact element={<Main />} />
      <Route path="/user/login" exact element={<Login />} />
      <Route path="/user/register" exact element={<Register />} />
      <Route path="/user/restore" exact element={<Restore />} />
      <Route path="/user/logout" exact element={<Main />} />
      <Route path="/" exact element={<Main />} />
    </Routes>
  );
}

export default App;
