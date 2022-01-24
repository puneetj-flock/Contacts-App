import React from "react";

import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../mainContent/MainContent";
import { useNavigate } from "react-router-dom";
import { addContact } from "../../redux/contacts";
import { ContactService } from "../../service/ContactService";

// import "./AddContact.css"

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addContactHandler = contact => {
    console.log("addContactHandler");
    ContactService.addContact(contact).then(res => {
      const id = "id";
      // contact = ;
      // console.log(contact);
      // dispatch(setSelectedContact(emptyContact));
      dispatch(addContact({ ...contact, [id]: res }));
      // dispatch(setMenu(""));
    }); 
    // reducer in get contact
  };
  return (
    <BaseContact heading_text="Add New Contact" button_text="Save" rootStyle="contact-wrapper-add" ContactHandler={addContactHandler} />
  )
};

export { AddContact };