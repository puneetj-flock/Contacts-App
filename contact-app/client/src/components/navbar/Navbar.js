import React from "react";
import "./Navbar.css";
import { Avatar } from "@mui/material";
import { ExitToAppRounded } from "@material-ui/icons";

import { AuthService } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    let confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      AuthService.logoutUser();
      localStorage.removeItem("sessionToken");
      navigate("/login", { replace: true });
    }
  };

  let user_name = window.sessionStorage.getItem("name");
  if (user_name === "") {
    user_name = "User";
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Avatar
            src="https://img.icons8.com/pastel-glyph/64/000000/business-contact.png"
            style={{ height: "45px", width: "45px" }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            style={{ borderRadius: 0 }}
          />
          <p>Contacts App</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-profile">
          <Avatar src="" style={{ height: "35px", width: "35px" }} />
          <p> Hi, { user_name }</p>
        </div>

        <div className="navbar-logout" onClick={logoutHandler}>
          <ExitToAppRounded style={{ height: "35px", width: "35px" }} />
          <p> Logout </p>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
