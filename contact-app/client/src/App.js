import "./App.css";
import { AddContact } from "./components/addContact/AddContact";
import { LoginPage } from "./components/loginPage/LoginPage";
import { MainContent } from "./components/mainContent/MainContent";
import Navbar from "./components/navbar/Navbar";
import { RegisterPage } from "./components/registerPage/RegisterPage";
import { BrowserRouter, Link, Switch, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
