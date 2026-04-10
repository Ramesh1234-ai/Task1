import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;