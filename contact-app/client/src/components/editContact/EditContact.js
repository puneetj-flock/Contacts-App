import React from "react";

import { ApiManager } from "../../api/Index";
import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import "./EditContact.css";

const EditContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editContactHandler = contact => {
    const apiManager = new ApiManager();
    apiManager.updateContact(contact); //TODO: update contact in redux
    dispatch(setMenu("showContact"));
    navigate("/login"); // TODO: Find a better way to do this
    // dispatch(setSelectedContact(emptyContact));
  };
  return (
    <BaseContact heading_text="Edit Contact" button_text="Save" rootStyle="contact-wrapper-2" ContactHandler={editContactHandler}/>
  )
};

export { EditContact };