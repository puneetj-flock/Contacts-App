import React, { useState } from "react";
import "./LoginPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthService } from "../../service/AuthService";

const LoginPage = function () {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("sessionToken")) {
      AuthService.checkAuth().then((data) => {
        navigate("/", { replace: true });
      });
    }
  }, []);

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
      AuthService
        .loginUser(loginInfo)
        .then((res) => {
          navigate("/", { replace: true });
        })
        .catch((err) => {
        });
    } else {
      alert("Please Enter Correct Email");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Box className="loginpage-wrapper">
      <Box className="loginpage-body">
        <Box className="loginpage-header">
          <h2>Login</h2>
        </Box>
        <Box className="loginpage-form">
          <Box className="loginpage-form-body">
            <TextField
              required
              margin="normal"
              id="outlined-required"
              label="Email"
              onChange={changeHandler("email")}
            />
            <TextField
              required
              margin="normal"
              id="outlined-required"
              label="Password"
              type="password"
              onChange={changeHandler("password")}
            />
            <Button type="submit" variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>
          </Box>
        </Box>
        <Box className="loginpage-footer">
          <Typography
            className="register-heading"
            variant="h6"
            style={{ marginBottom: "30px" }}
          >
            Don't have an account?
          </Typography>
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { LoginPage };
