import "./App.css";
import { AddContact } from "./components/addContact/AddContact";
import { LoginPage } from "./components/loginPage/LoginPage";
import { MainContent } from "./components/mainContent/MainContent";
import Navbar from "./components/navbar/Navbar";
import { RegisterPage } from "./components/registerPage/RegisterPage";
import {
  BrowserRouter,
  Link,
  Switch,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSessionToken } from "./redux/sessionToken";
import { useEffect } from "react";
import { ApiManager } from "./api/Index";
// save token in local storage
// use state take token

function App() {
  useEffect(() => {
    localStorage.getItem("sessionToken");
    console.log("Calling GetContacts");
    console.log(localStorage.getItem("sessionToken"));
    const a = new ApiManager();
    a.getContacts().then((res) => console.log(res));
  }, []);

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
