import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";
import EditUser from "./components/EditUser";
import UserDetails from "./components/UserDetails";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<RegisterUser/>} />
        <Route path="/edit/:id" element={<EditUser/>} />
        <Route path="/view/:id" element={<UserDetails/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
