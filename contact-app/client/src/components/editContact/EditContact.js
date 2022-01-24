import React from "react";

import { ApiManager } from "../../api/APIManager";
import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateContact } from "../../redux/contacts";
import { ContactService } from "../../service/ContactService";

// import "./EditContact.css";

const EditContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editContactHandler = contact => {
    ContactService.updateContact(contact);
    dispatch(updateContact(contact));
    dispatch(setMenu("showContact"));
    // dispatch(setSelectedContact(emptyContact));
  };
  return (
    <BaseContact heading_text="Edit Contact" button_text="Update" rootStyle="contact-wrapper-edit" ContactHandler={editContactHandler}/>
  )
};

export { EditContact };