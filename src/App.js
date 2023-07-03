import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Candi from "./components/Candi";
import Interviewer from "./components/Interviewer";

function App() {
  console.log("app mounted");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/interviewer" element={<Interviewer />} />
          <Route path="/temp" element={<Candi />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
