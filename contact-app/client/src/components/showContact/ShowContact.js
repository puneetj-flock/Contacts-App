import React from "react";

import { BaseContact } from "../baseContact/BaseContact";
import { setMenu } from "../../redux/menu";
import { useDispatch } from "react-redux";

// import "./ShowContact.css";
// import "../baseContact/BaseContact.css";

const ShowContact = (prps) => {
  const dispatch = useDispatch();

  const showContactHandler = contact => {
    dispatch(setMenu("EditContact"));
  };
  return (
    <BaseContact heading_text="Contact Details" button_text="Edit" rootStyle="contact-wrapper-1" ContactHandler={showContactHandler} />
  )
};

// document.getElementById("outlined-required").setAttribute("readonly", "true");

export { ShowContact };
