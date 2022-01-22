import React, { useState } from "react";
import "./LoginPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ApiManager } from "../../api/Index";
import { useEffect } from "react";

const LoginPage = function () {
  let navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) { // TODO: check if sessionToken is valid
      console.log("Session Token Found at login sending to home");
      navigate("/", { replace: true });
    } else {
      console.log("Session Token not found at login");
    }
  }, [navigate]);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const changeHandler = (prop) => {
    return (event) => {
      setLoginInfo({ ...loginInfo, [prop]: event.target.value });
    };
  };

  const handleSignIn = () => {
    if (validateEmail(loginInfo.email)) {
      const apiManager = new ApiManager();
      apiManager
        .loginUser(loginInfo)
        .then((res) => {
          localStorage.setItem("sessionToken", res);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log("Error in Login");
        });
    } else {
      alert("Please Enter Correct Email");
    }
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
              // defaultValue="Email Id"
              onChange={changeHandler("email")}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              // defaultValue="Password"
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
