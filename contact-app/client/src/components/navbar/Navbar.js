import React from "react";
import "./Navbar.css";
import { Avatar } from "@mui/material";
import { ExitToAppRounded } from "@material-ui/icons";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Avatar
            src="https://img.icons8.com/pastel-glyph/64/000000/business-contact.png"
            style={{ height: "45px", width: "45px" }}
            style={{ borderRadius: 0 }}
          />
          <p>Contacts App</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-profile">
          <Avatar src="" style={{ height: "35px", width: "35px" }} />
          <p> Puneet Jangid </p>
        </div>

        <div className="navbar-logout">
          <ExitToAppRounded style={{ height: "35px", width: "35px" }} />
          <p> Logout </p>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
