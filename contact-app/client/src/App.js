import "./App.css";
import { LoginPage } from "./components/loginPage/LoginPage";
import { MainContent } from "./components/mainContent/MainContent";
import { RegisterPage } from "./components/registerPage/RegisterPage";
import { ContactService } from "./service/ContactService";
import {
  BrowserRouter,
  // Link,
  // Switch,
  Route,
  Routes,
  // useNavigate,
} from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setSessionToken } from "./redux/sessionToken";
import { useEffect } from "react";
// save token in local storage
// use state take token

function App() {
  // useEffect(() => {
  //   localStorage.getItem("sessionToken");
  //   console.log(localStorage.getItem("sessionToken"));
  //   ContactService.getContacts().then((res) => console.log(res));
  // }, []); // TODO: Found Bug: useEffect is called twice

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
