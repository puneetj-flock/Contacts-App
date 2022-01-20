import React from "react";
import "./RegisterPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const RegisterPage = function () {
  return (
    <div className="registerpage-wrapper">
      <div className="registerpage-body">
        <div className="registerpage-header">
          <h2>Register</h2>
        </div>
        <div className="registerpage-form">
          <form method="POST">
            <div className="registerpage-form-body">
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
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { RegisterPage };
