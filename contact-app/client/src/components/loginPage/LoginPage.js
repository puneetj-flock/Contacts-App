import React, { useState } from "react";
import "./LoginPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../api/Index";
import { LOGIN_USER } from "../../api/contants";
import { setSessionToken } from "../../redux/sessionToken";

const LoginPage = function () {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const sessionToken = useSelector((state) => state.sessionToken.token);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (prop) => {
    return (event) => {
      setLoginInfo({ ...loginInfo, [prop]: event.target.value });
    };
  };

  const handleSignIn = () => {
    loginUser(LOGIN_USER, loginInfo)
      .then((res) => {
        dispatch(setSessionToken(res));
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log("Error in Login");
      });
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div className="loginpage-wrapper">
      <div className="loginpage-body">
        <div className="loginpage-header">
          <h2>Login</h2>
        </div>
        <div className="loginpage-form">
          <div className="loginpage-form-body">
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue="Email Id"
              onChange={changeHandler("email")}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              defaultValue="Password"
              onChange={changeHandler("password")}
            />
            <Button type="submit" variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </div>
        <div className="Login-user">Not a user!! Login</div>
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </div>
  );
};

export { LoginPage };
