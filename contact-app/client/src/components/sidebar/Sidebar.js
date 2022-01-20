import { Button } from "@mui/material";
import React from "react";
import { Contact } from "../contact/Contact";

import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="navbar">
        <div className="get-contacts">
          <Button variant="contained">All Contacts</Button>
        </div>
        <div className="search-bar">
          <input placeholder="Search Contact" />
        </div>
      </div>
      <div className="contacts-list">
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
      </div>
    </div>
  );
};

export { Sidebar };
