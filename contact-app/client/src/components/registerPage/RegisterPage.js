import React, { useState } from "react";
import "./RegisterPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthService } from "../../service/AuthService";
// setRegisterError({ ...registerError, [prop]: null });

const RegisterPage = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("sessionToken")) {
      AuthService.checkAuth().then((data) => {
        navigate("/", { replace: true });
      });
    }
  }, []);

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
      setRegisterInfo({ ...registerInfo, [prop]: event.target.value });
    };
  };

  const clickHandler = () => {
    if (validateEmail(registerInfo.email) && registerInfo.password !== "" && registerInfo.name !== "") {
      AuthService.registerUser(registerInfo).then(() => {
        navigate("/");
      });
    } else {
      alert("Incorrect Details");
    }
  };
  return (
    <Box className="registerpage-wrapper">
      <Box className="registerpage-body">
        <Box className="registerpage-header">
          <Typography variant="h5">New User! Register Here</Typography>
        </Box>
        <Box className="registerpage-form">
          {/* <form method="POST"> */}
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
          {/* </form> */}
        </Box>
      </Box>
    </Box>
  );
};

export { RegisterPage };
