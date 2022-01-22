import React from "react";

import { ApiManager } from "../../api/Index";
import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";

// import "./EditContact.css";

const EditContact = () => {
  const dispatch = useDispatch();

  const editContactHandler = contact => {
    const apiManager = new ApiManager();
    apiManager.updateContact(contact); //TODO: update contact in redux
    dispatch(setMenu("showContact"));
    // dispatch(setSelectedContact(emptyContact));
  };
  return (
    <BaseContact heading_text="Edit Contact" button_text="Save" rootStyle="contact-wrapper-2" ContactHandler={editContactHandler}/>
  )
};

export { EditContact };