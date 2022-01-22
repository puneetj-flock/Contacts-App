import { Button } from "@mui/material";
import React from "react";
import { ContactList } from "../contactList/ContactList";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";
import { setSearchText } from "../../redux/searchText";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import "./Sidebar.css";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../mainContent/MainContent";
const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <div className="navbar">
        <div className="add-contact">

          <Fab color="primary" aria-label="add" onClick={() => {
            dispatch(setSelectedContact(emptyContact))
            dispatch(setMenu("AddContact"));
          }}>
            <AddIcon />
          </Fab>
        </div>
        <div className="search-bar">
          <input placeholder="Search Contact" onChange={e => {
            dispatch(setSearchText(e.target.value));
          }} />
        </div>
      </div>
      <ContactList />
    </div>
  );
};

export { Sidebar };
