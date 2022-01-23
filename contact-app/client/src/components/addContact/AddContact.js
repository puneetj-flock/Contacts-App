import React from "react";

import { ApiManager } from "../../api/Index";
import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../mainContent/MainContent";
import { useNavigate } from "react-router-dom";

// import "./AddContact.css"

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addContactHandler = contact => {
    const apiManager = new ApiManager();
    apiManager.addContact(contact)
      .then(res => contact.id = res); // TODO: catch
    // reducer in get contact
    dispatch(setSelectedContact(emptyContact));
    dispatch(setMenu(""));
    navigate("/login"); // TODO: Find a better way to do this
  };
  return (
    <BaseContact heading_text="Add New Contact" button_text="Save" rootStyle="contact-wrapper-1" ContactHandler={addContactHandler}/>
  )
};

export { AddContact };