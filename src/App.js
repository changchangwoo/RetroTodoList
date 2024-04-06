import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Main" element={<Main />} />
    </Routes>
  );
}

export default App;
