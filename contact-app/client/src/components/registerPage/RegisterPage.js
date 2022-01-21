import React, { useState } from "react";
import "./RegisterPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { registerUser } from "../../api/Index";
import { REGISTER_USER } from "../../api/contants";
import { useDispatch, useSelector } from "react-redux";
import { setSessionToken } from "../../redux/sessionToken";
import { useNavigate } from "react-router-dom";

// setRegisterError({ ...registerError, [prop]: null });

const RegisterPage = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (prop) => {
    return (event) => {
      setRegisterInfo({ ...registerInfo, [prop]: event.target.value });
    };
  };

  const clickHandler = () => {
    registerUser(REGISTER_USER, registerInfo).then((res) => {
      dispatch(setSessionToken(res));
      navigate("/");
    });
  };
  return (
    <div className="registerpage-wrapper">
      <div className="registerpage-body">
        <div className="registerpage-header">
          <h2>Register</h2>
        </div>
        <div className="registerpage-form">
          {/* <form method="POST"> */}
          <div className="registerpage-form-body">
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue="Name"
              onChange={changeHandler("name")}
            />

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
            <Button type="submit" variant="contained" onClick={clickHandler}>
              Register
            </Button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export { RegisterPage };
