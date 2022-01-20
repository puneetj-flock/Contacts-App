import React from "react";
import "./LoginPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = function () {
  let navigate = useNavigate();

  const handleClick = () => {
    // navigate("/register", {replace : true});
    navigate("/register");
  };

  return (
    <div className="loginpage-wrapper">
      <div className="loginpage-body">
        <div className="loginpage-header">
          <h2>Login</h2>
        </div>
        <div className="loginpage-form">
          <form method="POST">
            <div className="loginpage-form-body">
              <TextField
                required
                id="outlined-required"
                label="Email"
                defaultValue="Email Id"
              />
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                defaultValue="Password"
              />
              <Button type="submit" variant="contained">
                Sign In
              </Button>
            </div>
          </form>
        </div>
        <div className="register-user">Not a user!! Register</div>
        <Button variant="contained" onClick={handleClick}>
          Register
        </Button>
      </div>
    </div>
  );
};

export { LoginPage };
