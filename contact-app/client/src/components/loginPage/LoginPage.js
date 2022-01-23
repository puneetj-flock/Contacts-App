import React, { useState } from "react";
import "./LoginPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
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

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
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

  // const changeHandler = (prop) => {
  //   return (event) => {
  //     setRegisterInfo({ ...loginInfo, [prop]: event.target.value });
  //   };
  // };

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

  const clickHandler = () => {
    if (validateEmail(registerInfo.email) && registerInfo.password !== "") {
      const apiManager = new ApiManager();
      apiManager.registerUser(registerInfo).then((res) => {
        localStorage.setItem("sessionToken", res);
        navigate("/");
      });
    } else {
      alert("Incorrect Email");
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <Box className="authpage-wrapper">
      <Box className="loginpage-wrapper">
        <Box className="loginpage-body">
          <Box className="loginpage-header">
            <h2>Already Registered? Login Here</h2>
          </Box>
          <Box className="loginpage-form">
            <Box className="loginpage-form-body">
              <TextField
                required
                margin="normal"
                id="outlined-required"
                label="Email"
                // defaultValue="Email Id"
                onChange={changeHandler("email")}
              />
              <TextField
                required
                margin="normal"
                id="outlined-required"
                label="Password"
                type="password"
                // defaultValue="Password"
                onChange={changeHandler("password")}
                />
              <Button type="submit" variant="contained" onClick={handleSignIn}>
                Sign In
              </Button>
                {/* <Box className="Login-user">Not a user!! Login</Box>
                <Button variant="contained" onClick={handleRegister}>
                  Register
                </Button> */}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="registerpage-wrapper">
        <Box className="registerpage-body">
          <Box className="registerpage-header">
            <h2>New User? Register Here</h2>
          </Box>
          <Box className="registerpage-form">
            <Box className="registerpage-form-body">
              <TextField
                required
                margin="normal"
                id="outlined-required"
                label="Name"
                // placeholder="Name"
                // defaultValue="Name"
                onChange={changeHandler("name")}
              />

              <TextField
                required
                margin="normal"
                id="outlined-required"
                label="Email"
                // placeholder="Email Id"
                // defaultValue="Email Id"
                onChange={changeHandler("email")}
              />
              <TextField
                required
                margin="normal"
                id="outlined-required"
                label="Password"
                type="password"
                // placeholder="Name"
                // defaultValue="Password"
                onChange={changeHandler("password")}
              />
              <Button id="register-botton" type="submit" variant="contained" onClick={clickHandler}>
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>


    </Box>
  );
};

export { LoginPage };
