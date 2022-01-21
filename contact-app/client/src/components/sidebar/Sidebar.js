import { Button } from "@mui/material";
import React from "react";
import { Contact } from "../contact/Contact";
import { ContactList } from "../contactList/ContactList";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";

import "./Sidebar.css";
const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <div className="navbar">
        <div className="add-contact">
          <Button
            variant="contained"
            onClick={() => dispatch(setMenu("AddContact"))}
          >
            Add Contact
          </Button>
        </div>
        <div className="search-bar">
          <input placeholder="Search Contact" />
        </div>
      </div>
      <ContactList />
    </div>
  );
};

export { Sidebar };
