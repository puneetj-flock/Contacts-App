import React from "react";

import { BaseContact } from "../baseContact/BaseContact";

// import "./ShowContact.css";
// import "../baseContact/BaseContact.css";

const ShowContact = (props) => {
  return (
    <BaseContact {...props} heading_text="Contact Details" button_text="Edit" rootStyle="contact-wrapper-1"/>
  )
};

// document.getElementById("outlined-required").setAttribute("readonly", "true");

export { ShowContact };
